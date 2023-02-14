import React from "react";
import { useTranslation } from "react-i18next";
import { AppBar, Box, Button, Dialog, DialogActions, DialogContent, IconButton, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import config from "@/common/config";
import { getIncidentName, getIncidentsName } from "@/common/utils";
import { setLoading, useAppDispatch } from "@/context";

import type { ModalSimulationShow } from "@/common/props";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import iconWord from "@/assets/icons/word.png";
import iconPdf from "@/assets/icons/pdf.png";

import BootstrapTooltip from "@/components/Tooltip";

export default function ModalSimulationShow({ open, onClose, simulation }: ModalSimulationShow) {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const printRef = React.useRef<HTMLInputElement>(null);

  const exportWORD = () => {
    let html = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>${printRef.current?.innerHTML}</body></html>`;

    html = html.replace('img width="600"', 'img width="600" height="80"');

    const downloadLink = document.createElement("a");

    downloadLink.setAttribute("download", "nota_conceptual.doc");
    downloadLink.setAttribute("href", "data:" + "text/doc" + ";charset=utf-8," + encodeURIComponent(html));
    downloadLink.click();

    document.body.removeChild(downloadLink);
  };

  const exportPDF = async () => {
    dispatch(setLoading(true));

    try {
      await axios.post("/generatePdf", { html: printRef.current?.innerHTML }, { responseType: "arraybuffer" }).then((res) => {
        if (res.status === 200) {
          const blob = new Blob([res.data], { type: "application/octetstream" });

          //Check the Browser type and download the File.
          const isIE = false || !!document.documentMode;
          if (isIE && navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, "nota_conceptual.pdf");
          } else {
            const url = window.URL || window.webkitURL;
            const link = url.createObjectURL(blob);
            const a = document.createElement("a");
            a.setAttribute("download", "nota_conceptual.pdf");
            a.setAttribute("href", link);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        } else {
          Swal.fire({ title: "Oops", text: t("common.error") || "", icon: "error" });
        }
      });
    } catch (error) {
      Swal.fire({ title: "Oops", text: t("common.error") || "", icon: "error" });
    }

    dispatch(setLoading(false));
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "1.3rem" }}>{t("simulation.title")}</Typography>

          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <div className="flex gap-2">
          <BootstrapTooltip title="Word">
            <IconButton onClick={exportWORD}>
              <img src={iconWord} />
            </IconButton>
          </BootstrapTooltip>

          <BootstrapTooltip title="PDF">
            <IconButton onClick={exportPDF}>
              <img src={iconPdf} />
            </IconButton>
          </BootstrapTooltip>
        </div>

        <Box ref={printRef} id="PDF_WORD">
          <div style={{ textAlign: "center" }}>
            {simulation.logo && <img width="600" src={`${config.host}/storage/${simulation.logo}`} />}

            <br />

            <h3>
              <strong>NOTA CONCEPTUAL DE LA SIMULACIÓN</strong>
            </h3>

            <h3>
              <strong>{simulation.name}</strong>
            </h3>

            <p>Evento principal: {getIncidentName(i18n.language, simulation.incident)}</p>

            <p>Evento(s) Asociado(s): {getIncidentsName(i18n.language, simulation.incidents)}</p>

            <p>País del ejercicio: {`${simulation.country.name}, ${simulation.country.timezone}, ${simulation.country.gmt}`}</p>

            <p>Fecha y hora de inicio: {simulation.date_start_real}</p>

            <p>Fecha y hora de finalización: {simulation.date_end_real}</p>
          </div>

          <hr />

          <div
            dangerouslySetInnerHTML={{
              __html: simulation.description
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ mb: 1 }}>
        <Button color="inherit" variant="contained" onClick={onClose}>
          {t("common.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
