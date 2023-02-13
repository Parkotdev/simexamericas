import { AuthType, CountryType, SimulationEditType, SimulationType, ZiggyType } from "./types";

export interface PageProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface IndexProps {
  auth: AuthType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  ziggy: ZiggyType;
}

export interface GeneralProps {
  children: React.ReactNode;
}

export interface SignInProps {
  onClose: () => void;
  countries: CountryType[];
  simulations: SimulationEditType[];
}

/******* MODALS *******/

export interface ModalGeneralProps {
  open: boolean;
  onClose: () => void;
}

export interface ModalSignUpProps extends ModalGeneralProps {
  countries: CountryType[];
  simulations: SimulationEditType[];
}

export interface ModalProfileProps extends ModalGeneralProps {
  countries: CountryType[];
}

export interface ModalSimulation extends ModalGeneralProps {
  simulation: SimulationType;
}

/***** END MODALS *****/

export interface FormProfileProps {
  onClose: () => void;
  countries: CountryType[];
}

export interface LayoutProps {
  countries: CountryType[];
}

export interface FilterProps {
  onClear: () => void;
  filterText: string;
  onFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
