import React from "react";
import { useTranslation } from "react-i18next";
import { Autocomplete, Box, Button, DialogActions, DialogContent, TextField } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { setLoading, setUser, useAppDispatch, useAppSelector } from "@/context";

import type { FormProfileProps } from "@/common/props";
import type { CountryType, UserEditType } from "@/common/types";

export default function FormProfile({ onClose, countries }: FormProfileProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const [country, setCountry] = React.useState<null | CountryType>(user.country);

  const [form, setForm] = React.useState<UserEditType>({
    id: user.id,
    name: user.name,
    last_name: user.last_name,
    phone: user.phone || "",
    country_id: user.country.id,
    organization: user.organization || ""
  });

  const [errorName, setErrorName] = React.useState(false);
  const [errorLastName, setErrorLastName] = React.useState(false);
  const [errorCountry, setErrorCountry] = React.useState(false);

  const [helpName, setHelpName] = React.useState("");
  const [helpLastName, setHelpLastName] = React.useState("");
  const [helpCountry, setHelpCountry] = React.useState("");

  const handleChange = (name: string, value: string) => {
    switch (name) {
      case "name":
        setForm({ ...form, name: value });
        setErrorName(value.trim() === "");
        setHelpName(value.trim() === "" ? t("valid.required") || "" : "");
        break;
      case "last_name":
        setForm({ ...form, last_name: value });
        setErrorLastName(value.trim() === "");
        setHelpLastName(value.trim() === "" ? t("valid.required") || "" : "");
        break;
      case "phone":
        setForm({ ...form, phone: value });
        break;
      default:
        setForm({ ...form, organization: value });
    }
  };

  const handleChangeCountry = (newValue: CountryType | null) => {
    setCountry(newValue);
    setForm({ ...form, country_id: newValue ? newValue.id : "" });
    setErrorCountry(newValue ? false : true);
    setHelpCountry(newValue ? "" : t("valid.required") || "");
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (form.name.trim() === "") {
      isValid = false;
      setErrorName(true);
      setHelpName(t("valid.required") || "");
    }

    if (form.last_name.trim() === "") {
      isValid = false;
      setErrorLastName(true);
      setHelpLastName(t("valid.required") || "");
    }

    if (!country) {
      isValid = false;
      setErrorCountry(true);
      setHelpCountry(t("valid.required") || "");
    }

    if (isValid) {
      dispatch(setLoading(true));

      try {
        await axios
          .put(`/users/${user.id}`, form)
          .then((res) => {
            if (res.status === 200) {
              dispatch(setUser(res.data.users));
              Swal.fire({
                position: "top-end",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
                title: t("common.edit-success") || ""
              });
              onClose();
            } else {
              Swal.fire({
                position: "top-end",
                icon: "error",
                showConfirmButton: false,
                timer: 2000,
                title: "Oops",
                text: t("common.error") || ""
              });
            }
          })
          .catch(() => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
              title: "Oops",
              text: t("common.error") || ""
            });
          });
      } catch (error) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
          title: "Oops",
          text: t("common.error") || ""
        });
      }

      dispatch(setLoading(false));
    } else {
      Swal.fire({
        position: "top-end",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        title: t("valid.fields-errors") || ""
      });
    }
  };

  return (
    <>
      <DialogContent dividers>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={form.name}
            error={errorName}
            helperText={helpName}
            label={
              <>
                {`${t("user.name")}:`} {<span style={{ color: "red" }}>*</span>}
              </>
            }
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={form.last_name}
            error={errorLastName}
            helperText={helpLastName}
            label={
              <>
                {`${t("user.last_name")}:`} {<span style={{ color: "red" }}>*</span>}
              </>
            }
            onChange={(e) => handleChange("last_name", e.target.value)}
          />

          <TextField
            disabled
            fullWidth
            size="small"
            variant="outlined"
            value={user.email}
            label={
              <>
                {`${t("user.email")}:`} {<span style={{ color: "red" }}>*</span>}
              </>
            }
          />

          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={form.phone}
            label={`${t("user.phone")}:`}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />

          <Autocomplete
            value={country}
            options={countries}
            onChange={(event, newValue) => handleChangeCountry(newValue)}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => `${option.name}, ${option.timezone}, ${option.gmt}`}
            renderOption={(props, option) => (
              <Box
                {...props}
                component="li"
                sx={{
                  "& > img": {
                    mr: 2,
                    flexShrink: 0
                  }
                }}
              >
                <img alt="" width="20" loading="lazy" src={`../../images/flags/${option.iso_code.toLowerCase()}.png`} />
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
                      {`${t("user.country")}: `}
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

          <TextField
            fullWidth
            size="small"
            variant="outlined"
            value={form.organization}
            label={`${t("user.organization")}:`}
            onChange={(event) => setForm({ ...form, organization: event.target.value })}
          />
        </div>
      </DialogContent>

      <DialogActions sx={{ mb: 1 }}>
        <Button variant="contained" onClick={handleSubmit}>
          {t("common.save")}
        </Button>

        <Button color="inherit" variant="contained" onClick={onClose}>
          {t("common.close")}
        </Button>
      </DialogActions>
    </>
  );
}
