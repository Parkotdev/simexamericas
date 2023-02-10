import React from "react";
import { useTranslation } from "react-i18next";
import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@mui/material";

import type { ModalSignUpProps } from "@/common/props";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { FormSignUp } from "@/containers";

export default function ModalSignUp({ open, onClose, countries, simulations }: ModalSignUpProps) {
  const { t } = useTranslation();

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} disableEnforceFocus>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar variant="dense" className="justify-between">
          <Typography sx={{ fontSize: "1.3rem" }}>{t("auth.registration")}</Typography>

          <IconButton edge="end" color="inherit" onClick={onClose} aria-label={t("common.close") || ""}>
            <CloseRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <FormSignUp onClose={onClose} countries={countries} simulations={simulations} />
    </Dialog>
  );
}
