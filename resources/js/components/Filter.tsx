import React from "react";
import { useTranslation } from "react-i18next";
import { IconButton, InputBase, Paper } from "@mui/material";

import type { FilterProps } from "@/common/props";

import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

export default function Filter({ onClear, filterText, onFilter }: FilterProps) {
  const { t } = useTranslation();

  return (
    <Paper component="form" sx={{ mb: 2 }}>
      <InputBase
        value={filterText}
        onChange={onFilter}
        placeholder={t("common.search") || ""}
        sx={{ ml: 1, flex: 1 }}
        inputProps={{ "aria-label": t("common.search") || "" }}
      />
      <IconButton onClick={onClear}>
        <ClearRoundedIcon />
      </IconButton>
    </Paper>
  );
}
