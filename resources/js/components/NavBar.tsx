import React from "react";
import { useProSidebar } from "react-pro-sidebar";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";
import { AppBar, Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Toolbar } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

import type { LayoutProps } from "@/common/props";

import bgOPSes from "@/assets/images/bg-ops-es.png";
import bgOPSen from "@/assets/images/bg-ops-en.png";
import bgOPSfr from "@/assets/images/bg-ops-fr.png";
import bgOPSpt from "@/assets/images/bg-ops-pt.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

import { BootstrapTooltip, Language, ModalChangePassword, ModalProfile } from "@/components";

const getBG = (locale: string) => {
  switch (locale) {
    case "en":
      return <img alt="image" src={bgOPSen} width={467} className="w-auto h-[80px]" />;
    case "fr":
      return <img alt="image" src={bgOPSfr} width={467} className="w-auto h-[80px]" />;
    case "pt":
      return <img alt="image" src={bgOPSpt} width={467} className="w-auto h-[80px]" />;
    default:
      return <img alt="image" src={bgOPSes} width={467} className="w-auto h-[80px]" />;
  }
};

export default function NavBar({ countries }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const { broken, collapseSidebar, toggleSidebar } = useProSidebar();

  const [openProfile, setOpenProfile] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLButtonElement | null>(null);

  const handleMenu = () => {
    broken ? toggleSidebar() : collapseSidebar();
  };

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

  return (
    <>
      <ModalProfile open={openProfile} onClose={() => setOpenProfile(false)} countries={countries} />
      <ModalChangePassword open={openPassword} onClose={() => setOpenPassword(false)} />

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

          {getBG(i18n.language)}

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
            <MenuItem>
              <Avatar className="bg-[green!important]">
                <CachedRoundedIcon />
              </Avatar>{" "}
              {t("navbar.reload")}
            </MenuItem>

            <MenuItem onClick={() => setOpenProfile(true)}>
              <Avatar className="bg-[blue!important]">
                <AccountCircleRoundedIcon />
              </Avatar>{" "}
              {t("navbar.account")}
            </MenuItem>

            <MenuItem onClick={() => setOpenPassword(true)}>
              <Avatar className="bg-[orange!important]">
                <LockRoundedIcon />
              </Avatar>{" "}
              {t("navbar.password")}
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppRoundedIcon color="error" />
              </ListItemIcon>

              {t("navbar.sign-out")}
            </MenuItem>
          </Menu>

          <Language />
        </Toolbar>
      </AppBar>
    </>
  );
}
