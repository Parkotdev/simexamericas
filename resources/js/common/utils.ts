import { RoleType } from "./types";

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
