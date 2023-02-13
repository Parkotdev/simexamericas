export type ZiggyType = {
  defaults: [];
  location: string;
  port: null | number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  routes: any;
  url: string;
};

export type RoleType = {
  id: string;
  name_es: string;
  name_en: string;
  name_fr: string;
  name_pt: string;
  created_at: null | string;
  updated_at: null | string;
};

export type CountryType = {
  id: string;
  iso_code: string;
  iso_code_3: string;
  phone_code: string;
  name: string;
  timezone: string;
  gmt: string;
  created_at: null | string;
  updated_at: null | string;
};

export type EventType = {
  id: string;
  incidents: IncidentType[];
  event_es: string;
  event_en: string;
  event_fr: string;
  event_pt: string;
  created_at: null | string;
  updated_at: null | string;
};

export type IncidentType = {
  id: string;
  event: EventType;
  incident_es: string;
  incident_en: string;
  incident_fr: string;
  incident_pt: string;
  created_at: null | string;
  updated_at: null | string;
};

export type StatusType = {
  id: string;
  status_es: string;
  status_en: string;
  status_fr: string;
  status_pt: string;
  created_at: null | string;
  updated_at: null | string;
};

export type SimulationEditType = {
  id: string;
  country_id: string;
  incident_id: string;
  status_id: string;
  name: string;
  description: string;
  logo: null | string;
  icon: null | string;
  date_start_real: string;
  date_end_real: string;
  date_ini_sim: string;
  date_end_sim: string;
  pause: boolean;
  created_at?: null | string;
  updated_at?: null | string;
};

export type SimulationType = {
  id: string;
  country: CountryType;
  incident: IncidentType;
  incidents: IncidentType[];
  status: StatusType;
  name: string;
  description: string;
  logo: null | string;
  icon: null | string;
  date_start_real: string;
  date_end_real: string;
  date_start_sim: string;
  date_end_sim: string;
  pause: boolean;
  created_at: null | string;
  updated_at: null | string;
};

export type AreaType = {
  id: string;
  simulation_id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  created_at: null | string;
  updated_at: null | string;
};

export type GroupType = {
  id: string;
  area_id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  created_at: null | string;
  updated_at: null | string;
};

export type SubgroupType = {
  id: string;
  group_id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  created_at: null | string;
  updated_at: null | string;
};

export type UserType = {
  id: string;
  role: RoleType;
  country: CountryType;
  simulation: null | SimulationType;
  area: null | AreaType;
  group: null | GroupType;
  subgroup: null | SubgroupType;
  name: string;
  last_name: string;
  email: string;
  password: string;
  status: boolean;
  photo: null | string;
  phone: null | string;
  organization: null | string;
};

export type UserEditType = {
  id: string;
  role_id?: string;
  country_id: string;
  simulation_id?: string;
  area_id?: string;
  group_id?: string;
  subgroup_id?: string;
  name: string;
  last_name: string;
  email?: string;
  status?: boolean;
  phone: string;
  organization: string;
};

export type AuthType = {
  user: null | UserType;
};

export type GeneralSliceType = {
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any;
};

export type UserSliceType = {
  data: UserType;
};

export type SimulationDataType = {
  statuses: StatusType[];
  events: IncidentType[];
  incidents: IncidentType[];
  countries: CountryType[];
};
