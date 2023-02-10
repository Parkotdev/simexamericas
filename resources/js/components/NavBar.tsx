import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AppBar, Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar } from "@mui/material";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

import { BootstrapTooltip } from "@/components";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

export default function NavBar() {
  const { t } = useTranslation();
  const { broken, collapseSidebar, toggleSidebar } = useProSidebar();

  const [anchorElUser, setAnchorElUser] = React.useState<HTMLButtonElement | null>(null);

  const handleMenu = () => {
    broken ? toggleSidebar() : collapseSidebar();
  };

  const handleLogout = async () => {
    try {
      await axios
        .post("/logout")
        .then(() => router.get("/login"))
        .catch(() => Swal.fire({ title: "Oops", text: t("common.error") || "", icon: "error" }));
    } catch (error) {
      Swal.fire({ title: "Oops", text: t("common.error") || "", icon: "error" });
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar disableGutters>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          className="btn-p"
          sx={{ ml: 2 }}
          onClick={handleMenu}
        >
          <MenuRoundedIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>Reloj</Box>

        <BootstrapTooltip title="Configuración">
          <IconButton sx={{ mr: 1 }} onClick={(event) => setAnchorElUser(event.currentTarget)}>
            <Avatar src={""}>RC</Avatar>
          </IconButton>
        </BootstrapTooltip>

        <Menu
          anchorEl={anchorElUser}
          open={Boolean(anchorElUser)}
          onClose={() => setAnchorElUser(null)}
          onClick={() => setAnchorElUser(null)}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0
              }
            }
          }}
          transformOrigin={{
            horizontal: "right",
            vertical: "top"
          }}
          anchorOrigin={{
            horizontal: "right",
            vertical: "bottom"
          }}
        >
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppRoundedIcon color="error" />
            </ListItemIcon>

            {t("navbar.sign-out")}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
