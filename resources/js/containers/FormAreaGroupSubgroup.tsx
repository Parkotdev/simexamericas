import React from "react";
import { useTranslation } from "react-i18next";
import { Button, DialogActions, DialogContent, IconButton, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { setLoading, useAppDispatch, useAppSelector } from "@/context";

import type { FormAreaGroupSubgroupProps } from "@/common/props";

import FileUploadRounded from "@mui/icons-material/FileUploadRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { BootstrapTooltip } from "@/components";

export default function FormAreaGroupSubgroup({ onClose, form, setForm }: FormAreaGroupSubgroupProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state) => state.general.socket);

  const handleChangeIcon = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      if (file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png") {
        if (file.size <= 5000000) {
          const URL = window.URL || window.webkitURL;
          setForm({
            ...form,
            icon: {
              element: file,
              color: "primary",
              text: file.name,
              link: URL.createObjectURL(file),
              delete: true
            }
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
    if (form.id && !form.icon.element && form.icon.color !== "black") {
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
    setForm({
      ...form,
      icon: {
        element: null,
        color: "black",
        text: t("simulation.icon-not-select"),
        link: undefined,
        delete: false
      }
    });
  };

  const handleDeleteIcon = () => {
    if (form.id && !form.icon.element) {
      Swal.fire({
        icon: "warning",
        title: t("common.delete-icon") || "",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: t("common.accept") || ""
      });
    } else {
      handleClearIcon();
    }
  };

  const handleSubmit = async () => {
    if (form.name.trim() === "") {
      setForm({ ...form, name_error: true });
    } else {
      dispatch(setLoading(true));

      try {
        const formData = new FormData();

        formData.append(
          "data",
          JSON.stringify({
            id: form.id,
            id_parent: form.id_parent,
            name: form.name,
            description: form.description,
            color: form.color,
            icon: form.icon.element ? true : false
          })
        );

        if (form.icon.element) formData.append("file", form.icon.element);

        let url = "/subgroups",
          title_success = t("simulation.new-subgroup-success");

        switch (form.type) {
          case 1:
            url = "/areas";
            title_success = t("simulation.new-area-success");
            break;
          case 2:
            url = "/groups";
            title_success = t("simulation.new-group-success");
            break;
          default:
            url = "/subgroups";
            title_success = t("simulation.new-subgroup-success");
        }

        await axios
          .post(url, formData)
          .then(async (res) => {
            if (res.status === 201) {
              switch (form.type) {
                case 1:
                  await socket.emit("area_add", res.data.areas);
                  break;
                case 2:
                  await socket.emit("group_add", res.data.groups);
                  break;
                default:
                  await socket.emit("subgroup_add", res.data.subgroups);
              }
              onClose();
              Swal.fire({
                timer: 2000,
                icon: "success",
                title: title_success,
                position: "top-end",
                showConfirmButton: false
              });
            } else {
              Swal.fire({
                timer: 2000,
                icon: "error",
                title: "Oops",
                position: "top-end",
                showConfirmButton: false,
                text: t("common.error") || ""
              });
            }
          })
          .catch(() => {
            Swal.fire({
              timer: 2000,
              icon: "error",
              title: "Oops",
              position: "top-end",
              showConfirmButton: false,
              text: t("common.error") || ""
            });
          });
      } catch (error) {
        Swal.fire({
          timer: 2000,
          icon: "error",
          title: "Oops",
          position: "top-end",
          showConfirmButton: false,
          text: t("common.error") || ""
        });
      }

      dispatch(setLoading(false));
    }
  };

  return (
    <form>
      <DialogContent dividers>
        <Typography sx={{ mb: 2 }}>{form.text}</Typography>

        <TextField
          autoFocus
          fullWidth
          size="small"
          value={form.name}
          variant="outlined"
          error={form.name_error}
          sx={{ mt: 1, mb: 3 }}
          helperText={form.name_error ? t("valid.required") : ""}
          label={
            <>
              {`${form.name_placeholder}:`} {<span style={{ color: "red" }}>*</span>}
            </>
          }
          onChange={(e) => {
            setForm({ ...form, name: e.target.value, name_error: e.target.value.trim() === "" });
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
            <Link target="_blank" underline="none" color={form.icon.color} href={form.icon.link} download={form.icon.text}>
              {form.icon.text}
            </Link>

            {form.icon.delete && (
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
    </form>
  );
}
