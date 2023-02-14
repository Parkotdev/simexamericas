import React from "react";
import { AppBar, Dialog, IconButton, Toolbar, Typography } from "@mui/material";

import type { ModalAreaGroupSubgroup } from "@/common/props";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { FormAreaGroupSubgroup } from "@/containers";

export default function ModalAreaGroupSubgroup({ open, onClose, form, setForm }: ModalAreaGroupSubgroup) {
  return (
    <Dialog open={open} onClose={onClose}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar variant="dense" sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "1.3rem" }}>{form.title}</Typography>
          <IconButton edge="end" color="inherit" onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <FormAreaGroupSubgroup onClose={onClose} form={form} setForm={setForm} />
    </Dialog>
  );
}
