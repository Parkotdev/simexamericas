import { AreaType, GroupType, SubgroupType } from "./types";

export interface CountryI {
  id: string;
  iso_code: string;
  iso_code_3: string;
  phone_code: string;
  name: string;
  timezone: string;
  gmt: string;
  created_at: null | string;
  updated_at: null | string;
}

export interface DataSignUpI {
  areas: AreaType[];
  groups: GroupType[];
  subgroups: SubgroupType[];
}

export interface AreaGroupSubgroupFormI {
  id: string;
  id_parent: string;
  edit: boolean;
  type: number;
  title: string;
  text: React.ReactNode;
  name: string;
  name_placeholder: string;
  name_error: boolean;
  description: string;
  color: string;
  icon: {
    element: null | File;
    color: string;
    text: null | string;
    link: undefined | string;
    delete: boolean;
  };
}
