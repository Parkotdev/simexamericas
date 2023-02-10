import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";

import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

import BootstrapTooltip from "./Tooltip";

export default function Language() {
  const { t, i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);

  const handleChangeLanguage = async (locale: string) => {
    i18n.changeLanguage(locale);
  };

  return (
    <>
      <BootstrapTooltip title={t("common.language")}>
        <IconButton
          size="large"
          color="inherit"
          sx={{ textTransform: "uppercase" }}
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <LanguageRoundedIcon />
          <Typography sx={{ ml: 1 }}>{i18n.language}</Typography>
          <ArrowDropDownRoundedIcon />
        </IconButton>
      </BootstrapTooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
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
            },
            "& li:hover": {
              backgroundColor: "#1976d299"
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
        <MenuItem
          onClick={() => handleChangeLanguage("es")}
          sx={{
            color: i18n.language === "es" ? "#FFFFFF" : "#000000",
            backgroundColor: i18n.language === "es" ? "#1976d2" : "transparent"
          }}
        >
          Español
        </MenuItem>

        <MenuItem
          onClick={() => handleChangeLanguage("en")}
          sx={{
            color: i18n.language === "en" ? "#FFFFFF" : "#000000",
            backgroundColor: i18n.language === "en" ? "#1976d2" : "transparent"
          }}
        >
          English
        </MenuItem>

        <MenuItem
          onClick={() => handleChangeLanguage("fr")}
          sx={{
            color: i18n.language === "fr" ? "#FFFFFF" : "#000000",
            backgroundColor: i18n.language === "fr" ? "#1976d2" : "transparent"
          }}
        >
          Français
        </MenuItem>

        <MenuItem
          onClick={() => handleChangeLanguage("pt")}
          sx={{
            color: i18n.language === "pt" ? "#FFFFFF" : "#000000",
            backgroundColor: i18n.language === "pt" ? "#1976d2" : "transparent"
          }}
        >
          Português
        </MenuItem>
      </Menu>
    </>
  );
}
