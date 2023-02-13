import type { TFunction } from "i18next";
import type { EventType, IncidentType, RoleType, StatusType } from "./types";

export const validEmail = (email: string) => {
  return /^([\da-z_\\.-]+)@([\da-z\\.-]+)\.([a-z\\.]{2,6})$/.exec(email);
};

export const getRoleName = (locale: string, role: RoleType) => {
  switch (locale) {
    case "en":
      return role.name_en;
    case "fr":
      return role.name_fr;
    case "pt":
      return role.name_pt;
    default:
      return role.name_es;
  }
};

export const getStatusName = (locale: string, status: StatusType) => {
  switch (locale) {
    case "en":
      return status.status_en;
    case "fr":
      return status.status_fr;
    case "pt":
      return status.status_pt;
    default:
      return status.status_es;
  }
};

export const getIncidentName = (locale: string, incident: IncidentType) => {
  switch (locale) {
    case "en":
      return incident.incident_en;
    case "fr":
      return incident.incident_fr;
    case "pt":
      return incident.incident_pt;
    default:
      return incident.incident_es;
  }
};

export const getIncidentsName = (locale: string, incidents: IncidentType[]) => {
  switch (locale) {
    case "en":
      return incidents.map((item) => item.incident_en).toString();
    case "fr":
      return incidents.map((item) => item.incident_fr).toString();
    case "pt":
      return incidents.map((item) => item.incident_pt).toString();
    default:
      return incidents.map((item) => item.incident_es).toString();
  }
};

export const getEventName = (locale: string, event: EventType) => {
  switch (locale) {
    case "en":
      return event.event_en;
    case "fr":
      return event.event_fr;
    case "pt":
      return event.event_pt;
    default:
      return event.event_es;
  }
};

export const paginationComponentOptions = (t: TFunction) => {
  return {
    rowsPerPageText: t("table.files"),
    rangeSeparatorText: t("table.from"),
    selectAllRowsItem: true,
    selectAllRowsItemText: t("table.all")
  };
};

export const tableCustomStyles = {
  headCells: {
    style: {
      color: "white",
      fontSize: "14px",
      backgroundColor: "#40546a",
      borderRight: "solid 1px white"
    }
  },
  rows: {
    style: {
      borderLeft: "solid 1px rgba(0, 0, 0, .12)"
    },
    highlightOnHoverStyle: {
      outline: "none",
      cursor: "pointer",
      backgroundColor: "rgb(230, 244, 244)"
    }
  },
  cells: {
    style: {
      padding: "8px",
      borderRight: "solid 1px rgba(0, 0, 0, .12)",
      "& span": {
        overflow: "hidden",
        WhiteSpace: "nowrap",
        textOverflow: "ellipsis"
      }
    }
  }
};

export const getDescription =
  "<p><strong>1. Justificación y antecedentes</strong></p><p>&nbsp;</p><p><br/><strong>2. Propósito de la simulación</strong></p><p>&nbsp;</p><p><br/><strong>3. Objetivos de entrenamiento</strong></p><p>&nbsp;</p><p><br/><strong>4. Escenarios</strong></p><p>&nbsp;</p><p><br/><strong>5. Grupos objetivos</strong></p><p>&nbsp;</p><p><br/><strong>6. Metodología</strong></p><p>&nbsp;</p>";
