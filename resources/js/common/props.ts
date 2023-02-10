import { AuthType, CountryType, SimulationType, ZiggyType } from "./types";

export interface PageProps {
  [key: string]: unknown;
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
  simulations: SimulationType[];
}

/******* MODALS *******/

export interface ModalSignUpProps {
  open: boolean;
  onClose: () => void;
  countries: CountryType[];
  simulations: SimulationType[];
}

/***** END MODALS *****/
