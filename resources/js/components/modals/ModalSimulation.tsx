import React from "react";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import moment from "moment-timezone";
import "moment/locale/es";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { getEventName, getIncidentName, getStatusName } from "@/common/utils";
import { useAppSelector } from "@/context";

import type { ModalSimulation } from "@/common/props";
import type { CountryI, LogoI } from "@/common/interfaces";
import type { SelectChangeEvent } from "@mui/material";
import type { CountryType, IncidentType } from "@/common/types";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EventRoundedIcon from "@mui/icons-material/EventRounded";
import FileUploadRounded from "@mui/icons-material/FileUploadRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { BootstrapTooltip, Editor } from "@/components";
import Swal from "sweetalert2";
import axios from "axios";

export default function ModalSimulation({ open, onClose, title, data, form, setForm }: ModalSimulation) {
  const { t, i18n } = useTranslation();
  const user = useAppSelector((state) => state.user.data);

  const [incidents, setIncidents] = React.useState<IncidentType[]>([]);

  const [event, setEvent] = React.useState("");
  const [country, setCountry] = React.useState<null | CountryI>(null);
  const [incidentsA, setIncidentsA] = React.useState<IncidentType[]>([]);

  const [openDateStartReal, setOpenDateStartReal] = React.useState(false);
  const [openDateEndReal, setOpenDateEndReal] = React.useState(false);
  const [openDateStartSim, setOpenDateStartSim] = React.useState(false);
  const [openDateEndSim, setOpenDateEndSim] = React.useState(false);

  const [errorName, setErrorName] = React.useState(false);
  const [errorEvent, setErrorEvent] = React.useState(false);
  const [errorIncident, setErrorIncident] = React.useState(false);
  const [errorCountry, setErrorCountry] = React.useState(false);

  const [helpName, setHelpName] = React.useState("");
  const [helpEvent, setHelpEvent] = React.useState("");
  const [helpIncident, setHelpIncident] = React.useState("");
  const [helpCountry, setHelpCountry] = React.useState("");

  const [logo, setLogo] = React.useState<LogoI>({
    element: null,
    color: "black",
    text: t("simulation.logo-not-select"),
    link: undefined,
    delete: false
  });

  const [icon, setIcon] = React.useState<LogoI>({
    element: null,
    color: "black",
    text: t("simulation.icon-not-select"),
    link: undefined,
    delete: false
  });

  const handleChangeName = (value: string) => {
    setForm({ ...form, name: value });
    setErrorName(value.trim() === "");
    setHelpName(value.trim() === "" ? t("valid.required") || "" : "");
  };

  const handleChangeForm = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleChangeEvent = (event: SelectChangeEvent) => {
    setEvent(event.target.value);
    setErrorEvent(false);
    setHelpEvent("");
    setForm({ ...form, incident_id: "" });
    const eventSelect = data.events.find((item) => item.id === event.target.value);
    setIncidents(eventSelect ? eventSelect.incidents : []);
  };

  const handleChangeIncident = (event: SelectChangeEvent) => {
    setForm({ ...form, incident_id: event.target.value });
  };

  const handleChangeCountry = (newValue: null | CountryType) => {
    setCountry(newValue);
    setForm({ ...form, country_id: newValue ? newValue.id : "" });
    setErrorCountry(newValue ? false : true);
    setHelpCountry(newValue ? "" : t("valid.required") || "");
  };

  const handleChangeLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      if (file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png") {
        if (file.size <= 5000000) {
          const URL = window.URL || window.webkitURL;
          setLogo({
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

  const handleChangeLogoEdit = (event: React.MouseEvent<HTMLInputElement>) => {
    if (form.id && !logo.element && logo.color !== "black") {
      event.preventDefault();
      Swal.fire({
        position: "top-end",
        icon: "warning",
        showConfirmButton: false,
        timer: 2000,
        title: t("simulation.logo-delete") || ""
      });
    }
  };

  const handleClearLogo = () => {
    setLogo({
      element: null,
      color: "black",
      text: t("simulation.logo-not-select"),
      link: undefined,
      delete: false
    });
  };

  const handleDeleteLogo = () => {
    if (form.id && !logo.element) {
      console.log(logo);
    } else {
      handleClearLogo();
    }
  };

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
      text: t("simulation.logo-not-select"),
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

  const handleSubmit = async () => {
    let isValid = true;

    if (form.name.trim() === "") {
      isValid = false;
      setErrorName(true);
      setHelpName(t("valid.required") || "");
    }

    if (!event) {
      isValid = false;
      setErrorEvent(true);
      setHelpEvent(t("valid.required") || "");
    }

    if (!form.incident_id) {
      isValid = false;
      setErrorIncident(true);
      setHelpIncident(t("valid.required") || "");
    }

    if (!form.country_id) {
      isValid = false;
      setErrorCountry(true);
      setHelpCountry(t("valid.required") || "");
    }

    if (isValid) {
      const formData = new FormData();

      formData.append(
        "data",
        JSON.stringify({
          id: form.id,
          name: form.name,
          incident_id: form.incident_id,
          incidents,
          country_id: form.country_id,
          description: form.description,
          date_start_real: form.date_start_real,
          date_end_real: form.date_end_real,
          date_start_sim: form.date_start_sim,
          date_end_sim: form.date_end_real,
          status_id: form.status_id,
          logo: logo ? true : false,
          icon: icon ? true : false
        })
      );

      if (logo.element) formData.append("file-logo", logo.element);
      if (icon.element) formData.append("file-icon", icon.element);

      try {
        await axios
          .post("/simulation", formData)
          .then((res) => {
            if (res.status === 201) {
              handleClose();
              Swal.fire({
                position: "top-end",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
                title: t("simulation.new-success") || ""
              });
            }
          })
          .catch(() => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
              title: t("common.error") || ""
            });
          });
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
          title: t("common.error") || ""
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: t("valid.fields-errors") || ""
      });
    }
  };

  const handleClose = () => {
    setEvent("");
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="lg" disableEnforceFocus open={open} onClose={handleClose}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "1.3rem" }}>{title}</Typography>

          <IconButton edge="end" color="inherit" onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent sx={{ px: 5, fontSize: 13 }} dividers>
        <div className="flex flex-col gap-6">
          <TextField
            fullWidth
            variant="standard"
            value={form.name}
            onChange={(e) => handleChangeName(e.target.value)}
            error={errorName}
            helperText={helpName}
            label={
              <>
                {`${t("simulation.name")}:`}
                {
                  <span
                    style={{
                      color: "red"
                    }}
                  >
                    *
                  </span>
                }
              </>
            }
          />

          <div className="grid grid-cols-4 gap-4">
            <FormControl fullWidth size="small" error={errorEvent}>
              <InputLabel htmlFor="event">
                {`${t("simulation.event")}:`}
                {
                  <span
                    style={{
                      color: "red"
                    }}
                  >
                    *
                  </span>
                }
              </InputLabel>

              <Select
                labelId="event"
                value={event}
                onChange={handleChangeEvent}
                input={<OutlinedInput label={`${t("simulation.event")}: *`} />}
              >
                <MenuItem value={0} disabled>
                  <em>{t("common.select")}</em>
                </MenuItem>

                {data.events.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {getEventName(i18n.language, item)}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>{helpEvent}</FormHelperText>
            </FormControl>

            <FormControl fullWidth size="small" error={errorIncident}>
              <InputLabel htmlFor="incident">
                {t("simulation.incident")}:{" "}
                {
                  <span
                    style={{
                      color: "red"
                    }}
                  >
                    *
                  </span>
                }
              </InputLabel>

              <Select
                labelId="incident"
                value={form.incident_id}
                onChange={handleChangeIncident}
                input={<OutlinedInput label={`${t("simulation.incident")}: *`} />}
              >
                <MenuItem value={0} disabled>
                  <em>{t("common.select")}</em>
                </MenuItem>

                {incidents.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {getIncidentName(i18n.language, item)}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>{helpIncident}</FormHelperText>
            </FormControl>

            <div className="col-span-2">
              <Autocomplete
                options={data.countries}
                value={country}
                onChange={(event, newValue) => handleChangeCountry(newValue)}
                getOptionLabel={(option) => `${option.name}, ${option.timezone}, ${option.gmt}`}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{
                      "& > img": {
                        mr: 2,
                        flexShrink: 0
                      }
                    }}
                    {...props}
                  >
                    <img alt="" loading="lazy" width="20" src={`../../images/flags/${option.iso_code.toLowerCase()}.png`} />
                    {`${option.name}, ${option.timezone}, ${option.gmt}`}
                  </Box>
                )}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      size="small"
                      error={errorCountry}
                      helperText={helpCountry}
                      label={
                        <>
                          {`${t("simulation.country")}:`}
                          {
                            <span
                              style={{
                                color: "red"
                              }}
                            >
                              *
                            </span>
                          }
                        </>
                      }
                    />
                  </>
                )}
              />
            </div>
          </div>

          <Autocomplete
            multiple
            filterSelectedOptions
            value={incidentsA}
            options={data.incidents}
            groupBy={(option) => getEventName(i18n.language, option.event)}
            getOptionLabel={(option) => getIncidentName(i18n.language, option)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(event, newValue) => setIncidentsA(newValue)}
            renderInput={(params) => <TextField {...params} size="small" label={`${t("simulation.incidents")}:`} />}
          />

          <Editor
            role={user.role.name_en}
            description={form.description}
            setDescription={(value) => setForm({ ...form, description: value })}
          />

          <div className="grid grid-cols-4 gap-4">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <MobileDateTimePicker
                value={moment(form.date_start_real)}
                open={openDateStartReal}
                onClose={() => setOpenDateStartReal(false)}
                onChange={(newValue) => handleChangeForm("date_start_real", newValue ? newValue.format("YYYY-MM-DD HH:mm") : "")}
                onAccept={(newValue) => {
                  if (moment(newValue) > moment(form.date_end_real)) {
                    handleChangeForm("date_end_real", newValue ? newValue.format("YYYY-MM-DD HH:mm") : "");
                  }
                }}
                label={
                  <>
                    {`${t("simulation.date_start_real")}:`}
                    {
                      <span
                        style={{
                          color: "red"
                        }}
                      >
                        *
                      </span>
                    }
                  </>
                }
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    size="small"
                    onClick={() => setOpenDateStartReal(true)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        cursor: "pointer"
                      },
                      "& .MuiOutlinedInput-root input": {
                        cursor: "pointer"
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={() => setOpenDateStartReal(true)}>
                            <EventRoundedIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />

              <MobileDateTimePicker
                value={moment(form.date_end_real)}
                minDateTime={moment(form.date_start_real)}
                open={openDateEndReal}
                onClose={() => setOpenDateEndReal(false)}
                onChange={(newValue) => handleChangeForm("date_end_real", newValue ? newValue.format("YYYY-MM-DD HH:mm") : "")}
                label={
                  <>
                    {`${t("simulation.date_end_real")}:`}
                    {
                      <span
                        style={{
                          color: "red"
                        }}
                      >
                        *
                      </span>
                    }
                  </>
                }
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    size="small"
                    onClick={() => setOpenDateEndReal(true)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        cursor: "pointer"
                      },
                      "& .MuiOutlinedInput-root input": {
                        cursor: "pointer"
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={() => setOpenDateEndReal(true)}>
                            <EventRoundedIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />

              <MobileDateTimePicker
                value={form.date_start_sim}
                open={openDateStartSim}
                onClose={() => setOpenDateStartSim(false)}
                onChange={(newValue) =>
                  handleChangeForm("date_start_sim", newValue ? moment(newValue).format("YYYY-DD-MM HH:mm") : "")
                }
                onAccept={(newValue) => {
                  if (moment(newValue) > moment(form.date_end_sim)) {
                    handleChangeForm("date_end_sim", newValue ? moment(newValue).format("YYYY-DD-MM HH:mm") : "");
                  }
                }}
                label={
                  <>
                    {`${t("simulation.date_start_sim")}:`}
                    {
                      <span
                        style={{
                          color: "red"
                        }}
                      >
                        *
                      </span>
                    }
                  </>
                }
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    size="small"
                    onClick={() => setOpenDateStartSim(true)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        cursor: "pointer"
                      },
                      "& .MuiOutlinedInput-root input": {
                        cursor: "pointer"
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={() => setOpenDateStartSim(true)}>
                            <EventRoundedIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />

              <MobileDateTimePicker
                value={moment(form.date_end_sim)}
                minDateTime={moment(form.date_start_sim)}
                open={openDateEndSim}
                onClose={() => setOpenDateEndSim(false)}
                onChange={(newValue) =>
                  handleChangeForm("date_end_sim", newValue ? moment(newValue).format("YYYY-DD-MM HH:mm") : "")
                }
                label={
                  <>
                    {`${t("simulation.date_end_sim")}:`}
                    {
                      <span
                        style={{
                          color: "red"
                        }}
                      >
                        *
                      </span>
                    }
                  </>
                }
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    {...params}
                    size="small"
                    onClick={() => setOpenDateEndSim(true)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        cursor: "pointer"
                      },
                      "& .MuiOutlinedInput-root input": {
                        cursor: "pointer"
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={() => setOpenDateEndSim(true)}>
                            <EventRoundedIcon />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </div>

          <div className="flex flex-wrap gap-4">
            {form.id && (
              <FormControl>
                <FormLabel id="status">
                  {`${t("simulation.status")}:`}
                  <span className="text-red-500">*</span>
                </FormLabel>

                <RadioGroup
                  row
                  name="status_r"
                  value={form.status_id}
                  onChange={(event) => handleChangeForm("status_id", event.target.value)}
                >
                  {data.statuses.map((item) => (
                    <FormControlLabel
                      key={item.id}
                      value={item.id}
                      label={getStatusName(i18n.language, item)}
                      control={<Radio size="small" />}
                    />
                  ))}
                </RadioGroup>

                <FormHelperText sx={{ mx: 0 }}>
                  <span>
                    <strong>{t("simulation.creation")}: </strong>
                    {t("simulation.creation-text")}
                  </span>
                  <br />
                  <span>
                    <strong>{t("simulation.configuration")}: </strong>
                    {t("simulation.configuration-text")}
                  </span>
                  <br />
                  <span>
                    <strong>{t("simulation.registration")}: </strong>
                    {t("simulation.registration-text")}
                  </span>
                  <br />
                  <span>
                    <strong>{t("simulation.active")}: </strong>
                    {t("simulation.active-text")}
                  </span>
                  <br />
                  <span>
                    <strong>{t("simulation.finished")}: </strong>
                    {t("simulation.finished-text")}
                  </span>
                </FormHelperText>
              </FormControl>
            )}

            <FormControl>
              <FormLabel sx={{ pb: 1 }}>{`${t("simulation.logo")}:`}</FormLabel>

              <label htmlFor="logo-file" className="contents">
                <input type="file" id="logo-file" accept="image/png, image/jpeg" onChange={handleChangeLogo} className="hidden" />
                <Button
                  color="success"
                  component="span"
                  variant="contained"
                  endIcon={<FileUploadRounded />}
                  onClick={handleChangeLogoEdit}
                >
                  {t("simulation.logo-upload")}
                </Button>
              </label>

              <Box>
                <Typography sx={{ mt: 1 }}>
                  <Link target="_blank" underline="none" color={logo.color} href={logo.link} download={logo.text}>
                    {logo.text}
                  </Link>

                  {logo.delete && (
                    <BootstrapTooltip title={t("common.delete")}>
                      <IconButton color="error" onClick={handleDeleteLogo}>
                        <DeleteRoundedIcon />
                      </IconButton>
                    </BootstrapTooltip>
                  )}
                </Typography>
              </Box>

              <FormHelperText sx={{ mx: 0 }}>
                <span>
                  <strong>{t("simulation.size")}: </strong>
                  600px x 80px.
                </span>
                <br />
                <span>
                  <strong>{t("simulation.format")}: </strong>
                  .png o .jpg.
                </span>
                <br />
                <span>
                  <strong>{t("simulation.max-size")}: </strong>
                  5MB.
                </span>
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel sx={{ pb: 1 }}>{`${t("simulation.icon")}:`}</FormLabel>

              <label htmlFor="icon-file" className="contents">
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

              <Box>
                <Typography sx={{ mt: 1 }}>
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
                </Typography>
              </Box>

              <FormHelperText sx={{ mx: 0 }}>
                <span>
                  <strong>{t("simulation.size")}: </strong>
                  173px x 168px.
                </span>
                <br />
                <span>
                  <strong>{t("simulation.format")}: </strong>
                  .png o .jpg.
                </span>
                <br />
                <span>
                  <strong>{t("simulation.max-size")}: </strong>
                  5MB.
                </span>
              </FormHelperText>
            </FormControl>
          </div>
        </div>
      </DialogContent>

      <DialogActions sx={{ mb: 1 }}>
        <Button variant="contained" onClick={handleSubmit}>
          {t("common.save")}
        </Button>

        <Button variant="contained" color="inherit" onClick={handleClose}>
          {t("common.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
