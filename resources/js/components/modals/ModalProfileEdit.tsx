import React from "react";
import { useTranslation } from "react-i18next";
import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@mui/material";

import type { ModalProfileProps } from "@/common/props";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { FormProfile } from "@/containers";

export default function ModalProfileEdit({ open, onClose, countries }: ModalProfileProps) {
  const { t } = useTranslation();

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "1.3rem" }}>{t("user.edit")}</Typography>

          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <FormProfile onClose={onClose} countries={countries} />
    </Dialog>
  );
}
