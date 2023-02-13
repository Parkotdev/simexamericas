import React from "react";
import { useTranslation } from "react-i18next";
import DataTable from "react-data-table-component";
import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup
} from "@mui/material";
import axios from "axios";
import moment from "moment-timezone";
import Swal from "sweetalert2";
import { getDescription, getStatusName, paginationComponentOptions, tableCustomStyles } from "@/common/utils";
import { useAppSelector } from "@/context";

import type { PageProps } from "@/common/props";
import type { SimulationEditType, SimulationType, StatusType } from "@/common/types";

import { BootstrapTooltip, Filter, Layout, ModalSimulation } from "@/components";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoveDownRoundedIcon from "@mui/icons-material/MoveDownRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

export default function Index({ auth }: PageProps) {
  if (!auth.user) return null;

  const { t, i18n } = useTranslation();
  const user = useAppSelector((state) => state.user.data);
  const admin = user.role.name_en === "super-administrator" || user.role.name_en === "administrator";

  const [filterText, setFilterText] = React.useState("");
  const [dialogText, setDialogText] = React.useState("");

  const [statuses, setStatuses] = React.useState<StatusType[]>([]);
  const [simulations, setSimulations] = React.useState<SimulationType[]>([]);
  const [simulation, setSimulation] = React.useState<SimulationType>({
    id: "",
    country: {
      id: "",
      iso_code: "",
      iso_code_3: "",
      phone_code: "",
      name: "",
      timezone: "",
      gmt: "",
      created_at: "",
      updated_at: ""
    },
    incident: {
      id: "",
      event_id: "",
      incident_es: "",
      incident_en: "",
      incident_fr: "",
      incident_pt: ""
    },
    incidents: [],
    status: {
      id: "",
      status_es: "",
      status_en: "",
      status_fr: "",
      status_pt: ""
    },
    name: "",
    description: "",
    logo: null,
    icon: null,
    date_start_real: "",
    date_end_real: "",
    date_start_sim: "",
    date_end_sim: "",
    pause: false,
    created_at: null,
    updated_at: null
  });

  const [openSimulation, setOpenSimulation] = React.useState(false);

  const [form, setForm] = React.useState<SimulationEditType>({
    id: "",
    country_id: "",
    incident_id: "",
    status_id: "a1bomei7SDgMw6JK",
    name: "",
    description: getDescription,
    logo: null,
    icon: null,
    date_start_real: "",
    date_end_real: "",
    date_ini_sim: "",
    date_end_sim: "",
    pause: false
  });

  const handleDuplicate = (id: string) => {
    console.log(id);
  };

  const handleProgram = (row: SimulationType) => {
    console.log(row);
  };

  const handlePause = (id: string, group: boolean) => {
    console.log(id);
    console.log(group);
  };

  const handleEdit = (row: SimulationType) => {
    console.log(row);
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

  const columns = React.useMemo(
    () => [
      {
        name: t("table.actions"),
        button: true,
        minWidth: "200px",
        cell: (row: SimulationType) => (
          <div className="flex gap-2">
            <BootstrapTooltip title={t("simulation.show")}>
              <IconButton color="primary" onClick={() => setOpenSimulation(true)}>
                <VisibilityRoundedIcon />
              </IconButton>
            </BootstrapTooltip>

            {admin && (
              <BootstrapTooltip title={t("simulation.duplicate")}>
                <IconButton color="warning" onClick={() => handleDuplicate(row.id)}>
                  <MoveDownRoundedIcon />
                </IconButton>
              </BootstrapTooltip>
            )}

            {(form.status_id === "cXvKdqPrlA7jeFQ9" || form.status_id === "d2WXCVN3zCOTBb0x") &&
              moment(new Date(moment.tz(new Date(), row.country.timezone).format("YYYY-MM-DD HH:mm"))) <
                moment(new Date(row.date_start_real)) && (
                <BootstrapTooltip title={t("simulation.program")}>
                  <IconButton color="inherit" onClick={() => handleProgram(row)}>
                    <PlayCircleRoundedIcon />
                  </IconButton>
                </BootstrapTooltip>
              )}

            {form.status_id == "d2WXCVN3zCOTBb0x" &&
            moment(new Date(moment.tz(new Date(), row.country.timezone).format("YYYY-MM-DD HH:mm:ss"))) >
              moment(new Date(row.date_start_real)) &&
            moment(new Date(moment.tz(new Date(), row.country.timezone).format("YYYY-MM-DD HH:mm:ss"))) <
              moment(new Date(row.date_end_real)) ? (
              row.pause ? (
                <BootstrapTooltip title={t("simulation.program")}>
                  <IconButton color="inherit" onClick={() => handleProgram(row)}>
                    <PlayCircleRoundedIcon />
                  </IconButton>
                </BootstrapTooltip>
              ) : (
                <BootstrapTooltip title={t("simulation.pause")}>
                  <IconButton color="inherit" onClick={() => handlePause(row.id, false)}>
                    <PauseCircleRoundedIcon />
                  </IconButton>
                </BootstrapTooltip>
              )
            ) : null}

            <BootstrapTooltip title={t("simulacion.editar")}>
              <IconButton color="success" onClick={() => handleEdit(row)}>
                <EditRoundedIcon />
              </IconButton>
            </BootstrapTooltip>

            {admin && (
              <BootstrapTooltip title={t("simulacion.eliminar")}>
                <IconButton color="error" onClick={() => handleDelete(row.id)}>
                  <DeleteRoundedIcon />
                </IconButton>
              </BootstrapTooltip>
            )}
          </div>
        )
      },
      { name: t("table.control") }
    ],
    [t, admin, form.status_id]
  );

  const subHeaderComponent = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) setFilterText("");
    };

    const newSimulation = () => {
      setForm({ ...form, id: "" });
      setDialogText(t("common.new") || "");
      setOpenSimulation(true);
    };

    return (
      <div className={`flex w-full ${admin ? "justify-between" : "justify-end"}`}>
        {admin && (
          <Button variant="outlined" startIcon={<AddRoundedIcon />} sx={{ mb: 2 }} onClick={newSimulation}>
            {t("common.new-a")}
          </Button>
        )}

        <Filter onClear={handleClear} filterText={filterText} onFilter={(e) => setFilterText(e.target.value)} />
      </div>
    );
  }, [filterText, t, admin]);

  const filteredItems = simulations.filter(
    (item) =>
      (item.id && item.id.toString().toLowerCase().includes(filterText.toLowerCase())) ||
      (item.created_at && item.created_at.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.incident && item.incident.incident_es.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.date_start_real && item.date_start_real.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.date_end_real && item.date_end_real.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.date_start_sim && item.date_start_sim.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.date_end_sim && item.date_end_sim.toLowerCase().includes(filterText.toLowerCase()))
  );

  const handleChangeForm = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  React.useEffect(() => {
    const getStatuses = async () => {
      try {
        await axios
          .get("/statuses")
          .then((res) => {
            if (res.status === 200) {
              setStatuses(res.data);
            } else {
              Swal.fire({ title: "Oops", text: t("common.error") || "", icon: "error" });
            }
          })
          .catch(() => {
            Swal.fire({ title: "Oops", text: t("common.error") || "", icon: "error" });
          });
      } catch (error) {
        Swal.fire({ title: "Oops", text: t("common.error") || "", icon: "error" });
      }
    };

    getStatuses();
  }, []);

  return (
    <>
      <ModalSimulation open={openSimulation} onClose={() => setOpenSimulation(false)} simulation={simulation} />

      <Layout>
        <div className="flex justify-between mb-4">
          <span className="text-2xl">{t("user.simulation")}</span>

          <Breadcrumbs>
            <HomeRoundedIcon fontSize="medium" className="mt-1" />

            <div>{t("user.simulation")}</div>
          </Breadcrumbs>
        </div>

        <Card>
          <CardContent
            sx={{
              "& header": {
                padding: "4px 0"
              }
            }}
          >
            {admin && (
              <FormControl className="mb-[1rem!important]">
                <FormLabel className="flex items-center gap-1">
                  <span className="font-bold">{t("user.status")}</span>
                  <span className="flex items-center">
                    ({t("simulation.filter")} <FilterAltRoundedIcon />)
                  </span>
                </FormLabel>

                <RadioGroup row defaultValue="a1bomei7SDgMw6JK" name="simulation_statuses">
                  {statuses.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.id}
                      label={getStatusName(i18n.language, item)}
                      control={<Radio size="small" />}
                      onChange={() => handleChangeForm("status", item.id)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            )}

            <DataTable
              striped
              columns={columns}
              data={filteredItems}
              pagination
              paginationComponentOptions={paginationComponentOptions(t)}
              subHeader
              subHeaderComponent={subHeaderComponent}
              persistTableHead
              fixedHeader
              customStyles={tableCustomStyles}
              highlightOnHover
              noDataComponent={<span className="my-2">{t("common.not-data")}</span>}
            />
          </CardContent>
        </Card>
      </Layout>
    </>
  );
}
