import React from "react";
import { useTranslation } from "react-i18next";
import DataTable from "react-data-table-component";
import { router } from "@inertiajs/react";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup
} from "@mui/material";
import axios from "axios";
import moment from "moment-timezone";
import Swal from "sweetalert2";
import {
  getDescription,
  getIncidentName,
  getIncidentsName,
  getStatusName,
  paginationComponentOptions,
  tableCustomStyles
} from "@/common/utils";
import { setLoading, setSimulation, useAppDispatch, useAppSelector } from "@/context";

import type { PageProps } from "@/common/props";
import type { TableColumn } from "react-data-table-component";
import type { IncidentType, SimulationDataType, SimulationEditType, SimulationType } from "@/common/types";

import { BootstrapTooltip, Filter, ModalSimulation, ModalSimulationShow } from "@/components";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoveDownRoundedIcon from "@mui/icons-material/MoveDownRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleRoundedIcon from "@mui/icons-material/PauseCircleRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import BallotRoundedIcon from "@mui/icons-material/BallotRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";

export default function Index({ auth }: PageProps) {
  if (!auth.user) return null;

  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);
  const simulation = useAppSelector((state) => state.simulation.data);
  const admin = user.role.name_en === "super-administrator" || user.role.name_en === "administrator";

  const [openSimulation, setOpenSimulation] = React.useState(false);
  const [openSimulationShow, setOpenSimulationShow] = React.useState(false);

  const [filterText, setFilterText] = React.useState("");
  const [modalTitle, setModalTitle] = React.useState("");

  const [data, setData] = React.useState<SimulationDataType>({
    statuses: [],
    events: [],
    incidents: [],
    countries: []
  });
  const [incidents, setIncidents] = React.useState<IncidentType[]>([]);
  const [simulations, setSimulations] = React.useState<SimulationType[]>([]);

  const [form, setForm] = React.useState<SimulationEditType>({
    id: "",
    country_id: "",
    incident_id: "",
    status_id: "a1bomei7SDgMw6JK",
    name: "",
    description: getDescription,
    logo: null,
    icon: null,
    date_start_real: moment().format("YYYY-MM-DD HH:mm"),
    date_end_real: moment().format("YYYY-MM-DD HH:mm"),
    date_start_sim: moment().format("YYYY-MM-DD HH:mm"),
    date_end_sim: moment().format("YYYY-MM-DD HH:mm"),
    pause: false
  });

  const [groupPauseText, setGroupPauseText] = React.useState("");
  const [groupPause, setPauseGrupo] = React.useState(false);

  const getSimulations = async () => {
    try {
      await axios
        .get(`/simulationByStatus/${form.status_id}`)
        .then((res) => {
          if (res.status === 200) {
            setSimulations(res.data.simulations);
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

  const handleShow = (row: SimulationType) => {
    dispatch(setSimulation(row));
    setOpenSimulationShow(true);
  };

  const handleDuplicate = (id: string) => {
    console.log(id);
  };

  const handleProgram = (row: SimulationType) => {
    dispatch(setSimulation(row));
  };

  const handlePause = (id: string, group: boolean) => {
    console.log(id);
    console.log(group);
  };

  const handleEdit = (row: SimulationType) => {
    console.log(row);
  };

  const handleDelete = (id: string) => {
    console.log(id);
  };

  const handleShowAGS = (row: SimulationType) => {
    dispatch(setSimulation(row));
    router.get("/simulation/areaGroupSubgroup");
  };

  const handleShowTM = (row: SimulationType) => {
    dispatch(setSimulation(row));
    router.get("/simulation/taskMessage");
  };

  const handleShowLMG = (row: SimulationType) => {
    dispatch(setSimulation(row));
  };

  const handleShowLME = (row: SimulationType) => {
    dispatch(setSimulation(row));
  };

  const columns: TableColumn<SimulationType>[] = React.useMemo(
    () => [
      {
        name: t("table.actions"),
        button: true,
        minWidth: "200px",
        cell: (row: SimulationType) => (
          <div className="flex gap-1">
            <BootstrapTooltip title={t("simulation.show")}>
              <IconButton color="primary" onClick={() => handleShow(row)}>
                <VisibilityRoundedIcon />
              </IconButton>
            </BootstrapTooltip>

            {admin && (
              <BootstrapTooltip title={t("simulation.duplicate")}>
                <IconButton color="warning" onClick={() => handleDuplicate(row.id)}>
                  <MoveDownRoundedIcon />
                </IconButton>
              </BootstrapTooltip>
            )}

            {(form.status_id === "cXvKdqPrlA7jeFQ9" || form.status_id === "d2WXCVN3zCOTBb0x") &&
              moment(new Date(moment.tz(new Date(), row.country.timezone).format("YYYY-MM-DD HH:mm"))) <
                moment(new Date(row.date_start_real)) && (
                <BootstrapTooltip title={t("simulation.program")}>
                  <IconButton color="inherit" onClick={() => handleProgram(row)}>
                    <PlayCircleRoundedIcon />
                  </IconButton>
                </BootstrapTooltip>
              )}

            {form.status_id == "d2WXCVN3zCOTBb0x" &&
            moment(new Date(moment.tz(new Date(), row.country.timezone).format("YYYY-MM-DD HH:mm:ss"))) >
              moment(new Date(row.date_start_real)) &&
            moment(new Date(moment.tz(new Date(), row.country.timezone).format("YYYY-MM-DD HH:mm:ss"))) <
              moment(new Date(row.date_end_real)) ? (
              row.pause ? (
                <BootstrapTooltip title={t("simulation.program")}>
                  <IconButton color="inherit" onClick={() => handleProgram(row)}>
                    <PlayCircleRoundedIcon />
                  </IconButton>
                </BootstrapTooltip>
              ) : (
                <BootstrapTooltip title={t("simulation.pause")}>
                  <IconButton color="inherit" onClick={() => handlePause(row.id, false)}>
                    <PauseCircleRoundedIcon />
                  </IconButton>
                </BootstrapTooltip>
              )
            ) : null}

            <BootstrapTooltip title={t("simulacion.editar")}>
              <IconButton color="success" onClick={() => handleEdit(row)}>
                <EditRoundedIcon />
              </IconButton>
            </BootstrapTooltip>

            {admin && (
              <BootstrapTooltip title={t("simulacion.eliminar")}>
                <IconButton color="error" onClick={() => handleDelete(row.id)}>
                  <DeleteRoundedIcon />
                </IconButton>
              </BootstrapTooltip>
            )}
          </div>
        )
      },
      {
        name: t("table.control"),
        button: true,
        minWidth: "200px",
        cell: (row: SimulationType) => (
          <div className="flex gap-1">
            {user.role.name_en === "excon-group" && (
              <BootstrapTooltip title={t("simulation.show")}>
                <IconButton color="primary" onClick={() => handleShow(row)}>
                  <VisibilityRoundedIcon />
                </IconButton>
              </BootstrapTooltip>
            )}

            {user.role.name_en === "excon-group" &&
            !row.pause &&
            moment(new Date(moment.tz(new Date(), row.country.timezone).format("YYYY-MM-DD HH:mm:ss"))) >
              moment(new Date(row.date_start_real)) &&
            moment(new Date(moment.tz(new Date(), row.country.timezone).format("YYYY-MM-DD HH:mm:ss"))) <
              moment(new Date(row.date_end_real)) ? (
              groupPause ? (
                <BootstrapTooltip title={t("simulation.program")}>
                  <IconButton color="inherit" onClick={() => handleProgram(row)}>
                    <PlayCircleRoundedIcon />
                  </IconButton>
                </BootstrapTooltip>
              ) : (
                <BootstrapTooltip title={t("simulation.pause")}>
                  <IconButton color="inherit" onClick={() => handlePause(row.id, true)}>
                    <PauseCircleRoundedIcon />
                  </IconButton>
                </BootstrapTooltip>
              )
            ) : null}

            <BootstrapTooltip title={t("simulation.areas-groups-subgroups")}>
              <IconButton color="inherit" onClick={() => handleShowAGS(row)}>
                <StorageRoundedIcon />
              </IconButton>
            </BootstrapTooltip>

            <BootstrapTooltip title={t("simulation.tasks-message")}>
              <IconButton color="inherit" onClick={() => handleShowTM(row)}>
                <BallotRoundedIcon />
              </IconButton>
            </BootstrapTooltip>

            <BootstrapTooltip title={t("simulation.message-general")}>
              <IconButton color="inherit" onClick={() => handleShowLMG(row)}>
                <MailRoundedIcon />
              </IconButton>
            </BootstrapTooltip>

            {(admin || user.role.name_en === "excon-general") && (
              <BootstrapTooltip title={t("simulation.message-excon")}>
                <IconButton color="inherit" onClick={() => handleShowLME(row)}>
                  <ContactMailRoundedIcon />
                </IconButton>
              </BootstrapTooltip>
            )}
          </div>
        )
      },
      {
        name: t("simulation.icon"),
        center: true,
        minWidth: "70px",
        maxWidth: "70px",
        cell: (row) =>
          row.icon ? (
            <Avatar variant="rounded" alt={row.name} sx={{ width: 30, height: 30 }} src={`storage/${row.icon}`} />
          ) : (
            <Avatar variant="rounded" sx={{ width: 30, height: 30 }}>
              {row.name[0]}
            </Avatar>
          )
      },
      {
        name: t("simulation.date-created"),
        sortable: true,
        minWidth: "160px",
        selector: (row) => row.created_at || ""
      },
      {
        name: t("simulation.name"),
        wrap: true,
        sortable: true,
        minWidth: "225px",
        selector: (row) => row.name
      },
      {
        name: t("simulation.incident"),
        wrap: true,
        sortable: true,
        minWidth: "150px",
        selector: (row) => getIncidentName(i18n.language, row.incident)
      },
      {
        name: t("simulation.incidents"),
        wrap: true,
        sortable: true,
        minWidth: "210px",
        cell: (row) => getIncidentsName(i18n.language, row.incidents)
      },
      {
        name: t("simulation.country"),
        wrap: true,
        sortable: true,
        minWidth: "251px",
        cell: (row) => `${row.country.name}, ${row.country.timezone}, ${row.country.gmt}`
      },
      {
        name: t("simulation.date_start_real"),
        wrap: true,
        sortable: true,
        minWidth: "160px",
        selector: (row) => row.date_start_real
      },
      {
        name: t("simulation.date_end_real"),
        wrap: true,
        sortable: true,
        minWidth: "160px",
        selector: (row) => row.date_end_real
      },
      {
        name: t("simulation.date_start_sim"),
        wrap: true,
        sortable: true,
        minWidth: "190px",
        selector: (row) => row.date_start_sim
      },
      {
        name: t("simulation.date_end_sim"),
        wrap: true,
        sortable: true,
        minWidth: "190px",
        selector: (row) => row.date_end_sim
      }
    ],
    [t, admin, form.status_id]
  );

  const subHeaderComponent = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) setFilterText("");
    };

    const newSimulation = () => {
      setForm({ ...form, id: "" });
      setModalTitle(t("common.new-a") || "");
      setOpenSimulation(true);
    };

    return (
      <div className={`flex w-full ${admin ? "justify-between" : "justify-end"}`}>
        {admin && (
          <Button variant="outlined" startIcon={<AddRoundedIcon />} sx={{ mb: 2 }} onClick={newSimulation}>
            {t("common.new-a")}
          </Button>
        )}

        <Filter onClear={handleClear} filterText={filterText} onFilter={(e) => setFilterText(e.target.value)} />
      </div>
    );
  }, [filterText, t, admin]);

  const filteredItems = simulations.filter(
    (item) =>
      (item.id && item.id.toString().toLowerCase().includes(filterText.toLowerCase())) ||
      (item.created_at && item.created_at.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.incident && item.incident.incident_es.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.date_start_real && item.date_start_real.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.date_end_real && item.date_end_real.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.date_start_sim && item.date_start_sim.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.date_end_sim && item.date_end_sim.toLowerCase().includes(filterText.toLowerCase()))
  );

  const handleChangeForm = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  React.useEffect(() => {
    const getData = async () => {
      dispatch(setLoading(true));

      try {
        await axios
          .get("/simulationData")
          .then((res) => {
            if (res.status === 200) {
              setData(res.data);
              getSimulations();
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

      dispatch(setLoading(false));
    };

    getData();
  }, []);

  return (
    <div>
      <ModalSimulation
        open={openSimulation}
        onClose={() => setOpenSimulation(false)}
        title={modalTitle}
        data={data}
        form={form}
        setForm={setForm}
      />
      <ModalSimulationShow open={openSimulationShow} onClose={() => setOpenSimulationShow(false)} simulation={simulation} />

      <div className="flex justify-between mb-4">
        <span className="text-2xl">{t("user.simulation")}</span>

        <Breadcrumbs>
          <HomeRoundedIcon fontSize="medium" className="mt-1" />

          <div>{t("user.simulation")}</div>
        </Breadcrumbs>
      </div>

      <Card>
        <CardContent
          sx={{
            "& header": {
              padding: "4px 0"
            }
          }}
        >
          {admin && (
            <FormControl className="mb-[1rem!important]">
              <FormLabel className="flex items-center gap-1">
                <span className="font-bold">{t("user.status")}</span>
                <span className="flex items-center">
                  ({t("simulation.filter")} <FilterAltRoundedIcon />)
                </span>
              </FormLabel>

              <RadioGroup row defaultValue="a1bomei7SDgMw6JK" name="simulation_statuses">
                {data.statuses.map((item) => (
                  <FormControlLabel
                    key={item.id}
                    value={item.id}
                    label={getStatusName(i18n.language, item)}
                    control={<Radio size="small" />}
                    onChange={() => handleChangeForm("status", item.id)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}

          <DataTable
            striped
            columns={columns}
            data={filteredItems}
            pagination
            paginationComponentOptions={paginationComponentOptions(t)}
            subHeader
            subHeaderComponent={subHeaderComponent}
            persistTableHead
            fixedHeader
            customStyles={tableCustomStyles}
            highlightOnHover
            noDataComponent={<span className="my-2">{t("common.not-data")}</span>}
          />
        </CardContent>
      </Card>
    </div>
  );
}
