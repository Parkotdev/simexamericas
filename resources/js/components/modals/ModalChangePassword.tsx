import React from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";
import {
  AppBar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

import type { ModalGeneralProps } from "@/common/props";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

export default function ModalChangePassword({ open, onClose }: ModalGeneralProps) {
  const { t, i18n } = useTranslation();

  const [password1, setPassword1] = React.useState("");
  const [showPassword1, setShowPassword1] = React.useState(false);
  const [errorPassword1, setErrorPassword1] = React.useState(false);
  const [helpPassword1, setHelpPassword1] = React.useState("");

  const [password2, setPassword2] = React.useState("");
  const [showPassword2, setShowPassword2] = React.useState(false);
  const [errorPassword2, setErrorPassword2] = React.useState(false);
  const [helpPassword2, setHelpPassword2] = React.useState("");

  const [password3, setPassword3] = React.useState("");
  const [showPassword3, setShowPassword3] = React.useState(false);
  const [errorPassword3, setErrorPassword3] = React.useState(false);
  const [helpPassword3, setHelpPassword3] = React.useState("");

  const handleLogout = async () => {
    try {
      await axios
        .post("/logout")
        .then(() => router.get("/login"))
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
  };

  const handleSubmit = async () => {
    let isValid = true;

    if (password1 === "") {
      isValid = false;
      setErrorPassword1(true);
      setHelpPassword1(t("valid.required") || "");
    }

    if (password2 === "") {
      isValid = false;
      setErrorPassword2(true);
      setHelpPassword2(t("valid.required") || "");
    }

    if (password3 === "") {
      isValid = false;
      setErrorPassword3(true);
      setHelpPassword3(t("valid.required") || "");
    } else if (password3 != password2) {
      isValid = false;
      setErrorPassword3(true);
      setHelpPassword3(t("valid.required") || "");
    }

    if (isValid) {
      try {
        await axios
          .post("/confirm-password", { password: password2, locale: i18n.language })
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
                title: t("user.password-success") || ""
              });
              setTimeout(() => {
                handleLogout();
              }, 1000);
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
          .catch((error) => {
            if (error.response.status === 422) {
              Swal.fire({
                position: "top-end",
                icon: "warning",
                showConfirmButton: false,
                timer: 2000,
                title: error.response.data.message
              });
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
    }
  };

  const handleClose = () => {
    setPassword1("");
    setErrorPassword1(false);
    setHelpPassword1("");

    setPassword2("");
    setErrorPassword2(false);
    setHelpPassword2("");

    setPassword3("");
    setErrorPassword3(false);
    setHelpPassword3("");

    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xs">
      <AppBar sx={{ position: "relative" }}>
        <Toolbar variant="dense" className="justify-between">
          <Typography sx={{ fontSize: "1.3rem" }}>{t("navbar.password")}</Typography>

          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <DialogContent dividers>
        <div className="flex flex-col gap-2">
          <div className={`flex gap-2 ${errorPassword1 ? "items-center" : "items-end"}`}>
            <LockRoundedIcon color="action" />

            <TextField
              fullWidth
              name="password"
              variant="standard"
              value={password1}
              error={errorPassword1}
              helperText={helpPassword1}
              label={`${t("user.password-current")}:`}
              type={showPassword1 ? "text" : "password"}
              onChange={(event) => {
                setPassword1(event.target.value);
                setErrorPassword1(event.target.value === "");
                setHelpPassword1(event.target.value === "" ? t("valid.required") || "" : "");
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword1(!showPassword1)}>
                      {showPassword1 ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>

          <div className={`flex gap-2 ${errorPassword1 ? "items-center" : "items-end"}`}>
            <LockRoundedIcon color="action" />

            <TextField
              fullWidth
              name="password"
              variant="standard"
              value={password2}
              error={errorPassword2}
              helperText={helpPassword2}
              label={`${t("user.password-new")}:`}
              type={showPassword2 ? "text" : "password"}
              onChange={(event) => {
                setPassword2(event.target.value);
                setErrorPassword2(event.target.value === "");
                setHelpPassword2(event.target.value === "" ? t("valid.required") || "" : "");

                if (event.target.value != password3) {
                  setErrorPassword3(true);
                  setHelpPassword3(t("valid.password") || "");
                } else {
                  setErrorPassword3(false);
                  setHelpPassword3("");
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword2(!showPassword2)}>
                      {showPassword2 ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>

          <div className={`flex gap-2 ${errorPassword1 ? "items-center" : "items-end"}`}>
            <LockRoundedIcon color="action" />

            <TextField
              fullWidth
              name="password"
              variant="standard"
              value={password3}
              error={errorPassword3}
              helperText={helpPassword3}
              label={`${t("user.password-confirm")}:`}
              type={showPassword3 ? "text" : "password"}
              onChange={(event) => {
                setPassword3(event.target.value);
                if (event.target.value === "") {
                  setErrorPassword3(true);
                  setHelpPassword3(t("valid.required") || "");
                } else {
                  if (event.target.value != password2) {
                    setErrorPassword3(true);
                    setHelpPassword3(t("valid.password") || "");
                  } else {
                    setErrorPassword3(false);
                    setHelpPassword3("");
                  }
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword3(!showPassword3)}>
                      {showPassword3 ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          {t("user.change")}
        </Button>

        <Button color="inherit" variant="contained" onClick={onClose}>
          {t("common.close")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
