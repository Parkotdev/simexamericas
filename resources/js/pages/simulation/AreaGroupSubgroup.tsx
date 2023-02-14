import React from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";
import { Alert, Breadcrumbs, Button, Link } from "@mui/material";
import { useAppSelector } from "@/context";

import type { AreaGroupSubgroupFormI } from "@/common/interfaces";
import type { AreaType } from "@/common/types";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import { BootstrapTooltip, ModalAreaGroupSubgroup } from "@/components";
import Swal from "sweetalert2";
import axios from "axios";

export default function AreaGroupSubgroup() {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.data);
  const simulation = useAppSelector((state) => state.simulation.data);
  const admin =
    user.role.name_en === "super-administrator" || user.role.name_en === "administrator" || user.role.name_en === "excon-general";

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<AreaType[]>([]);
  const [form, setForm] = React.useState<AreaGroupSubgroupFormI>({
    id: "",
    idParent: "",
    edit: false,
    type: 1,
    title: "",
    text: <></>,
    name: "",
    namePlaceholder: "",
    nameError: false,
    description: "",
    color: "#000000"
  });

  const handleAdd = (event: React.MouseEvent, name_element: string, type_element: number, id_parent: string) => {
    event.stopPropagation();
    switch (type_element) {
      case 1:
        setForm({
          ...form,
          id: "",
          idParent: id_parent,
          edit: false,
          type: type_element,
          title: t("simulation.new-area") || "",
          text: (
            <>
              <strong>{t("simulation.title")}:</strong> {name_element}
            </>
          ),
          namePlaceholder: t("user.area") || ""
        });
        break;
      case 2:
        setForm({
          ...form,
          id: "",
          idParent: id_parent,
          edit: false,
          type: type_element,
          title: t("simulation.new-group") || "",
          text: (
            <>
              <strong>{t("user.area")}:</strong> {name_element}
            </>
          ),
          namePlaceholder: t("user.group") || ""
        });
        break;
      default:
        setForm({
          ...form,
          id: "",
          idParent: id_parent,
          edit: false,
          type: type_element,
          title: t("simulation.new-subgroup") || "",
          text: (
            <>
              <strong>{t("user.group")}:</strong> {name_element}
            </>
          ),
          namePlaceholder: t("user.subgroup") || ""
        });
    }
    setOpen(true);
  };

  const getData = async () => {
    try {
      await axios
        .get("/areas")
        .then((res) => {
          if (res.status === 200) {
            setData(res.data.areas);
          } else {
            Swal.fire({
              timer: 2000,
              icon: "error",
              title: "Oops",
              position: "top-end",
              showConfirmButton: false,
              text: t("common.error") || ""
            });
          }
        })
        .catch(() => {
          Swal.fire({
            timer: 2000,
            icon: "error",
            title: "Oops",
            position: "top-end",
            showConfirmButton: false,
            text: t("common.error") || ""
          });
        });
    } catch (error) {
      Swal.fire({
        timer: 2000,
        icon: "error",
        title: "Oops",
        position: "top-end",
        showConfirmButton: false,
        text: t("common.error") || ""
      });
    }
  };

  React.useEffect(() => {
    simulation.id ? getData() : router.get("/");
  }, []);

  return (
    <>
      {simulation.id && (
        <>
          <ModalAreaGroupSubgroup open={open} onClose={() => setOpen(false)} form={form} setForm={setForm} />

          <div className="flex justify-between mb-4">
            <span className="text-2xl">{t("simulation.area-group-subgroup")}</span>

            <Breadcrumbs>
              <Link color="inherit" onClick={() => router.get("/")} className="cursor-pointer flex items-center">
                <BootstrapTooltip title={t("common.home")}>
                  <HomeRoundedIcon fontSize="medium" />
                </BootstrapTooltip>
              </Link>

              <Link onClick={() => router.get("/")} className="cursor-pointer">
                {t("user.simulation")}
              </Link>

              <span>{t("simulation.area-group-subgroup")}</span>
            </Breadcrumbs>
          </div>

          <Alert icon={false} sx={{ mb: 2 }} severity="info" variant="outlined">
            <span className="text-xl">
              <strong>{t("simulation.title")}:</strong> {simulation.name}
            </span>
          </Alert>

          {admin && (
            <Button
              sx={{ mb: 2 }}
              color="inherit"
              variant="contained"
              startIcon={<AddRoundedIcon />}
              onClick={(event) => handleAdd(event, simulation.name, 1, "")}
            >
              {t("simulation.new-area")}
            </Button>
          )}
        </>
      )}
    </>
  );
}
