import React from "react";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Link,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import Swal from "sweetalert2";

import type { ModalAreaGroupSubgroup } from "@/common/props";
import type { LogoI } from "@/common/interfaces";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FileUploadRounded from "@mui/icons-material/FileUploadRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { BootstrapTooltip } from "@/components";

export default function ModalAreaGroupSubgroup({ open, onClose, form, setForm }: ModalAreaGroupSubgroup) {
  const { t } = useTranslation();

  const handleChangeIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      if (file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png") {
        if (file.size <= 5000000) {
          const URL = window.URL || window.webkitURL;
          setIcon({
            element: file,
            color: "primary",
            text: file.name,
            link: URL.createObjectURL(file),
            delete: true
          });
        } else {
          event.preventDefault();
          Swal.fire({
            position: "top-end",
            icon: "warning",
            showConfirmButton: false,
            timer: 2000,
            title: t("valid.image-size-5") || ""
          });
        }
      } else {
        event.preventDefault();
        Swal.fire({
          position: "top-end",
          icon: "warning",
          showConfirmButton: false,
          timer: 2000,
          title: t("valid.image-format") || ""
        });
      }
    }
  };

  const handleChangeIconEdit = (event: React.MouseEvent<HTMLInputElement>) => {
    if (form.id && !icon.element && icon.color !== "black") {
      event.preventDefault();
      Swal.fire({
        position: "top-end",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
        title: t("simulation.icon-delete") || ""
      });
    }
  };

  const handleClearIcon = () => {
    setIcon({
      element: null,
      color: "black",
      text: t("simulation.icon-not-select"),
      link: undefined,
      delete: false
    });
  };

  const handleDeleteIcon = () => {
    if (form.id && !icon.element) {
      console.log(icon);
    } else {
      handleClearIcon();
    }
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  const [icon, setIcon] = React.useState<LogoI>({
    element: null,
    color: "black",
    text: t("simulation.icon-not-select"),
    link: undefined,
    delete: false
  });

  return (
    <Dialog open={open}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "1.3rem" }}>{form.title}</Typography>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <Typography sx={{ mb: 2 }}>{form.text}</Typography>

        <TextField
          autoFocus
          fullWidth
          size="small"
          value={form.name}
          variant="outlined"
          error={form.nameError}
          sx={{ mt: 1, mb: 3 }}
          helperText={form.nameError ? t("valid.required") : ""}
          label={
            <>
              {`${form.namePlaceholder}:`} {<span style={{ color: "red" }}>*</span>}
            </>
          }
          onChange={(e) => {
            setForm({ ...form, name: e.target.value, nameError: e.target.value.trim() === "" });
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }
          }}
        />

        <TextField
          fullWidth
          multiline
          minRows={3}
          maxRows={4}
          size="small"
          sx={{ mb: 2 }}
          label={`${t("common.description")}:`}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex gap-2 items-center">
          <TextField
            size="small"
            type="color"
            value={form.color}
            label="Color:"
            variant="outlined"
            className="cursor-pointer w-20"
            onChange={(e) => setForm({ ...form, color: e.target.value })}
          />

          <label htmlFor="icon-file">
            <input type="file" id="icon-file" accept="image/png, image/jpeg" onChange={handleChangeIcon} className="hidden" />

            <Button
              color="success"
              component="span"
              variant="contained"
              endIcon={<FileUploadRounded />}
              onClick={handleChangeIconEdit}
            >
              {t("simulation.icon-upload")}
            </Button>
          </label>

          <div>
            <Link target="_blank" underline="none" color={icon.color} href={icon.link} download={icon.text}>
              {icon.text}
            </Link>

            {icon.delete && (
              <BootstrapTooltip title={t("common.delete")}>
                <IconButton color="error" onClick={handleDeleteIcon}>
                  <DeleteRoundedIcon />
                </IconButton>
              </BootstrapTooltip>
            )}
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ mb: 1 }}>
        <Button variant="contained" onClick={handleSubmit}>
          {t("common.save")}
        </Button>

        <Button variant="contained" color="inherit" onClick={onClose}>
          {t("common.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
