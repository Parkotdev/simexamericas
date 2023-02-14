import React from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";
import { Breadcrumbs, Link } from "@mui/material";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import { BootstrapTooltip } from "@/components";

export default function Excon() {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex justify-between mb-4">
        <span className="text-2xl">{t("board.excon")}</span>

        <Breadcrumbs>
          <Link color="inherit" onClick={() => router.get("/")} className="cursor-pointer flex items-center">
            <BootstrapTooltip title={t("common.home")}>
              <HomeRoundedIcon fontSize="medium" />
            </BootstrapTooltip>
          </Link>

          <div>{t("board.excon")}</div>
        </Breadcrumbs>
      </div>
    </>
  );
}
