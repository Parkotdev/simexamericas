import React from "react";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Breadcrumbs,
  Button,
  IconButton,
  Link,
  Paper
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppSelector } from "@/context";

import type { AreaGroupSubgroupFormI } from "@/common/interfaces";
import type { AreaType, GroupType, SubgroupType } from "@/common/types";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import MoveDownRoundedIcon from "@mui/icons-material/MoveDownRounded";

import { BootstrapTooltip, ModalAreaGroupSubgroup } from "@/components";

export default function AreaGroupSubgroup() {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.data);
  const socket = useAppSelector((state) => state.general.socket);
  const simulation = useAppSelector((state) => state.simulation.data);
  const admin =
    user.role.name_en === "super-administrator" || user.role.name_en === "administrator" || user.role.name_en === "excon-general";

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<AreaType[]>([]);
  const [form, setForm] = React.useState<AreaGroupSubgroupFormI>({
    id: "",
    id_parent: "",
    edit: false,
    type: 1,
    title: "",
    text: <></>,
    name: "",
    name_placeholder: "",
    name_error: false,
    description: "",
    color: "#000000",
    icon: {
      element: null,
      color: "black",
      text: t("simulation.icon-not-select"),
      link: undefined,
      delete: false
    }
  });

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

  const handleShowError = () => {
    Swal.fire({
      timer: 2000,
      icon: "error",
      title: "Oops",
      position: "top-end",
      showConfirmButton: false,
      text: t("common.error") || ""
    });
  };

  const handleAdd = (event: React.MouseEvent, type_element: number, name_element: string, id_parent: string) => {
    event.stopPropagation();
    switch (type_element) {
      case 1:
        setForm({
          ...form,
          id: "",
          id_parent,
          edit: false,
          type: type_element,
          title: t("simulation.new-area") || "",
          text: (
            <>
              <strong>{t("simulation.title")}:</strong> {name_element}
            </>
          ),
          name_placeholder: t("user.area") || ""
        });
        break;
      case 2:
        setForm({
          ...form,
          id: "",
          id_parent,
          edit: false,
          type: type_element,
          title: t("simulation.new-group") || "",
          text: (
            <>
              <strong>{t("user.area")}:</strong> {name_element}
            </>
          ),
          name_placeholder: t("user.group") || ""
        });
        break;
      default:
        setForm({
          ...form,
          id: "",
          id_parent,
          edit: false,
          type: type_element,
          title: t("simulation.new-subgroup") || "",
          text: (
            <>
              <strong>{t("user.group")}:</strong> {name_element}
            </>
          ),
          name_placeholder: t("user.subgroup") || ""
        });
    }
    setOpen(true);
  };

  const handleEdit = (event: React.MouseEvent, type_element: number, element: AreaType | GroupType | SubgroupType) => {
    event.stopPropagation();
    switch (type_element) {
      case 1:
        setForm({
          ...form,
          id: element.id,
          edit: true,
          type: type_element,
          title: t("simulation.edit-area") || "",
          text: (
            <>
              <strong>{t("simulation.title")}:</strong> {(element as AreaType).simulation.name}
            </>
          ),
          name_placeholder: t("user.area") || "",
          name: element.name,
          description: element.description,
          color: element.color
        });
        break;
      case 2:
        setForm({
          ...form,
          id: element.id,
          edit: true,
          type: type_element,
          title: t("simulation.edit-group") || "",
          text: (
            <>
              <strong>{t("user.area")}:</strong> {(element as GroupType).area.name}
            </>
          ),
          name_placeholder: t("user.group") || "",
          name: element.name,
          description: element.description,
          color: element.color
        });
        break;
      default:
        setForm({
          ...form,
          id: element.id,
          edit: true,
          type: type_element,
          title: t("simulation.edit-subgroup") || "",
          text: (
            <>
              <strong>{t("user.group")}:</strong> {(element as SubgroupType).group.name}
            </>
          ),
          name_placeholder: t("user.subgroup") || "",
          name: element.name,
          description: element.description,
          color: element.color
        });
    }
    setOpen(true);
  };

  const handleDelete = (event: React.MouseEvent, type_element: number, element: AreaType | GroupType | SubgroupType) => {
    event.stopPropagation();
    switch (type_element) {
      case 1:
        if ((element as AreaType).groups.length === 0) {
          Swal.fire({
            icon: "warning",
            title: t("simulation.area-delete") || "",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: t("common.accept") || ""
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await axios
                  .delete(`/areas/${element.id}`)
                  .then(async (res) => {
                    if (res.status === 200) {
                      await socket.emit("area_delete", { type: "delete", area: element, data });
                    } else {
                      handleShowError();
                    }
                  })
                  .catch(() => handleShowError);
              } catch (error) {
                handleShowError();
              }
            }
          });
        } else {
          Swal.fire({
            timer: 3000,
            icon: "warning",
            title: t("simulation.area-empty") || "",
            position: "top-end",
            showConfirmButton: false
          });
        }
        break;
      case 2:
        if ((element as GroupType).subgroups.length === 0) {
          Swal.fire({
            icon: "warning",
            title: t("simulation.group-delete") || "",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: t("common.accept") || ""
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await axios
                  .delete(`/groups/${element.id}`)
                  .then(async (res) => {
                    if (res.status === 200) {
                      await socket.emit("group_delete", { type: "delete", group: element, data });
                    } else {
                      handleShowError();
                    }
                  })
                  .catch(() => handleShowError);
              } catch (error) {
                handleShowError();
              }
            }
          });
        } else {
          Swal.fire({
            timer: 3000,
            icon: "warning",
            title: t("simulation.group-empty") || "",
            position: "top-end",
            showConfirmButton: false
          });
        }
        break;
      default:
        if ((element as SubgroupType).users.length === 0) {
          Swal.fire({
            icon: "warning",
            title: t("simulation.subgroup-delete") || "",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: t("common.accept") || ""
          }).then(async (result) => {
            if (result.isConfirmed) {
              try {
                await axios
                  .delete(`/subgroups/${element.id}`)
                  .then(async (res) => {
                    if (res.status === 200) {
                      await socket.emit("subgroup_delete", { type: "delete", subgroup: element, data });
                    } else {
                      handleShowError();
                    }
                  })
                  .catch(() => handleShowError);
              } catch (error) {
                handleShowError();
              }
            }
          });
        } else {
          Swal.fire({
            timer: 3000,
            icon: "warning",
            title: t("simulation.subgroup-empty") || "",
            position: "top-end",
            showConfirmButton: false
          });
        }
        break;
    }
  };

  const handleDuplicate = (event: React.MouseEvent, type_element: number, id_element: string) => {
    event.stopPropagation();
    console.log(type_element);
    console.log(id_element);
  };

  const handleClose = () => {
    setForm({
      id: "",
      id_parent: "",
      edit: false,
      type: 1,
      title: "",
      text: <></>,
      name: "",
      name_placeholder: "",
      name_error: false,
      description: "",
      color: "#000000",
      icon: {
        element: null,
        color: "black",
        text: t("simulation.icon-not-select"),
        link: undefined,
        delete: false
      }
    });
    setOpen(false);
  };

  React.useEffect(() => {
    simulation.id ? getData() : router.get("/");
  }, []);

  React.useEffect(() => {
    socket.on("get_areas", ({ type, area }: { type: string; area: AreaType }) => {
      switch (type) {
        case "add":
          setData((list) => [...list, area]);
          break;
        case "edit":
          setData((list) =>
            list.map((item) => {
              if (item.id === area.id) return area;
              return item;
            })
          );
          break;
        default:
          setData((list) => list.filter((item) => item.id !== area.id));
      }
    });

    socket.on("get_groups", ({ type, group, data }: { type: string; group: GroupType; data: AreaType[] }) => {
      const temp = data.find((item) => item.id === group.area.id);

      switch (type) {
        case "add":
          if (temp) {
            const area = { ...temp };
            area.groups.push(group);
            setData((list) =>
              list.map((item) => {
                if (item.id === area.id) return area;
                return item;
              })
            );
          }
          break;
        case "edit":
          if (temp) {
            const groups = temp.groups.map((item) => {
              if (item.id === group.id) return group;
              return item;
            });
            const area = { ...temp, groups };
            setData((list) =>
              list.map((item) => {
                if (item.id === area.id) return area;
                return item;
              })
            );
          }
          break;
        default:
          if (temp) {
            const groups = temp.groups.filter((item) => item.id !== group.id);
            const area = { ...temp, groups };
            setData((list) =>
              list.map((item) => {
                if (item.id === area.id) return area;
                return item;
              })
            );
          }
      }
    });

    socket.on("get_subgroups", ({ type, subgroup, data }: { type: string; subgroup: SubgroupType; data: AreaType[] }) => {
      const temp = data.find((item) => item.id === subgroup.group.area_id);
      const tempGroup = temp?.groups.find((item) => item.id === subgroup.group.id);

      if (temp && tempGroup) {
        const area = { ...temp };
        const group = { ...tempGroup };

        switch (type) {
          case "add":
            group.subgroups.push(subgroup);
            break;
          case "edit":
            group.subgroups = group.subgroups.map((item) => {
              if (item.id === subgroup.id) return subgroup;
              return item;
            });
            break;
          default:
            group.subgroups = group.subgroups.filter((item) => item.id !== subgroup.id);
        }

        const groups = area.groups.map((item) => {
          if (item.id === group.id) return group;
          return item;
        });
        area.groups = groups;
        setData((list) =>
          list.map((item) => {
            if (item.id === area.id) return area;
            return item;
          })
        );
      }
    });
  }, [socket]);

  return (
    <>
      {simulation.id && (
        <>
          <ModalAreaGroupSubgroup open={open} onClose={handleClose} form={form} setForm={setForm} data={data} />

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
              onClick={(event) => handleAdd(event, 1, simulation.name, simulation.id)}
            >
              {t("simulation.new-area")}
            </Button>
          )}

          <div className="overflow-y-auto">
            {data.map((area) => (
              <Accordion disableGutters defaultExpanded sx={{ boxShadow: 0 }} key={area.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreRoundedIcon />}
                  sx={{
                    py: "5px",
                    boxShadow: 1,
                    borderRadius: "4px",
                    backgroundColor: "#e0e0e0",
                    "& > :first-of-type": {
                      m: 0,
                      alignItems: "center",
                      justifyContent: "space-between"
                    }
                  }}
                >
                  <div className="flex items-center">
                    <span>{area.name}</span>
                    {area.icon ? (
                      <Avatar alt="A" variant="rounded" src={`../storage/${area.icon}`} sx={{ width: 30, height: 30, ml: 1 }} />
                    ) : (
                      <Avatar alt="A" variant="rounded" sx={{ width: 30, height: 30, ml: 1 }}>
                        A
                      </Avatar>
                    )}
                  </div>

                  {admin && (
                    <div className="flex gap-1">
                      <BootstrapTooltip title={t("simulation.new-group")}>
                        <IconButton color="primary" onClick={(event) => handleAdd(event, 2, area.name, area.id)}>
                          <AddRoundedIcon />
                        </IconButton>
                      </BootstrapTooltip>

                      <BootstrapTooltip title={t("common.edit")}>
                        <IconButton color="success" onClick={(event) => handleEdit(event, 1, area)}>
                          <EditRoundedIcon />
                        </IconButton>
                      </BootstrapTooltip>

                      <BootstrapTooltip title={t("common.delete")}>
                        <IconButton color="error" onClick={(event) => handleDelete(event, 1, area)}>
                          <DeleteRoundedIcon />
                        </IconButton>
                      </BootstrapTooltip>

                      <BootstrapTooltip title={t("common.duplicate")}>
                        <IconButton color="warning" onClick={(event) => handleDuplicate(event, 1, area.id)}>
                          <MoveDownRoundedIcon />
                        </IconButton>
                      </BootstrapTooltip>
                    </div>
                  )}
                </AccordionSummary>

                <AccordionDetails sx={{ backgroundColor: "#e3f2fd" }}>
                  {area.groups.map((group) => (
                    <Accordion disableGutters defaultExpanded={true} sx={{ boxShadow: 0 }} key={group.id}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreRoundedIcon />}
                        sx={{
                          py: "5px",
                          boxShadow: 1,
                          borderRadius: "4px",
                          "& > :first-of-type": {
                            m: 0,
                            alignItems: "center",
                            justifyContent: "space-between"
                          }
                        }}
                      >
                        <div className="flex items-center">
                          <span>{group.name}</span>

                          {group.icon ? (
                            <Avatar
                              alt="G"
                              variant="rounded"
                              src={`../storage/${group.icon}`}
                              sx={{
                                width: 30,
                                height: 30,
                                ml: 1
                              }}
                            />
                          ) : (
                            <Avatar
                              variant="rounded"
                              sx={{
                                width: 30,
                                height: 30,
                                ml: 1
                              }}
                            >
                              G
                            </Avatar>
                          )}
                        </div>

                        {user.role.name_en !== "observer-general" && (
                          <div className="flex gap-1">
                            <BootstrapTooltip title={t("simulation.new-subgroup")}>
                              <IconButton color="primary" onClick={(event) => handleAdd(event, 3, group.name, group.id)}>
                                <AddRoundedIcon />
                              </IconButton>
                            </BootstrapTooltip>

                            {admin && (
                              <>
                                <BootstrapTooltip title={t("common.edit")}>
                                  <IconButton color="success" onClick={(event) => handleEdit(event, 2, group)}>
                                    <EditRoundedIcon />
                                  </IconButton>
                                </BootstrapTooltip>

                                <BootstrapTooltip title={t("common.delete")}>
                                  <IconButton color="error" onClick={(event) => handleDelete(event, 2, group)}>
                                    <DeleteRoundedIcon />
                                  </IconButton>
                                </BootstrapTooltip>

                                <BootstrapTooltip title={t("common.duplicate")}>
                                  <IconButton color="warning" onClick={(event) => handleDuplicate(event, 2, group.id)}>
                                    <MoveDownRoundedIcon />
                                  </IconButton>
                                </BootstrapTooltip>
                              </>
                            )}
                          </div>
                        )}
                      </AccordionSummary>

                      <AccordionDetails sx={{ backgroundColor: "#e3f2fd" }}>
                        {group.subgroups.map((subgroup) => (
                          <Paper
                            elevation={1}
                            key={subgroup.id}
                            sx={{
                              mb: 1,
                              padding: "5px 16px",
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                          >
                            <div className="flex items-center">
                              <span>{subgroup.name}</span>

                              {subgroup.icon ? (
                                <Avatar
                                  alt="S"
                                  variant="rounded"
                                  src={`../storage/${subgroup.icon}`}
                                  sx={{
                                    width: 30,
                                    height: 30,
                                    ml: 1
                                  }}
                                />
                              ) : (
                                <Avatar
                                  variant="rounded"
                                  sx={{
                                    width: 30,
                                    height: 30,
                                    ml: 1
                                  }}
                                >
                                  S
                                </Avatar>
                              )}
                            </div>

                            {user.role.name_en !== "observer-general" && (
                              <div className="flex gap-1">
                                <BootstrapTooltip title={t("common.edit")}>
                                  <IconButton
                                    aria-label="edit"
                                    color="success"
                                    onClick={(event) => handleEdit(event, 3, subgroup)}
                                  >
                                    <EditRoundedIcon />
                                  </IconButton>
                                </BootstrapTooltip>

                                <BootstrapTooltip title={t("common.delete")}>
                                  <IconButton
                                    aria-label="delete"
                                    color="error"
                                    onClick={(event) => handleDelete(event, 3, subgroup)}
                                  >
                                    <DeleteRoundedIcon />
                                  </IconButton>
                                </BootstrapTooltip>

                                <BootstrapTooltip title={t("common.duplicate")}>
                                  <IconButton color="warning" onClick={(event) => handleDuplicate(event, 3, subgroup.id)}>
                                    <MoveDownRoundedIcon />
                                  </IconButton>
                                </BootstrapTooltip>
                              </div>
                            )}
                          </Paper>
                        ))}
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </>
      )}
    </>
  );
}
