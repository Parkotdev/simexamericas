import React from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { AppBar, Box, Button, Paper, Toolbar } from "@mui/material";

import type { CountryType, SimulationType } from "@/common/types";

import logo from "@/assets/images/logo.png";
import bgOPSes from "@/assets/images/bg-ops-es.png";
import bgOPSen from "@/assets/images/bg-ops-en.png";
import bgOPSfr from "@/assets/images/bg-ops-fr.png";
import bgOPSpt from "@/assets/images/bg-ops-pt.png";
import bgNavBar from "@/assets/images/bg-navbar.png";

import { FormSignIn } from "@/containers";
import { Language, ModalSignUp } from "@/components";

const getBG = (locale: string) => {
  switch (locale) {
    case "en":
      return <img alt="image" src={bgOPSen} width={467} className="w-auto h-[80px]" />;
    case "fr":
      return <img alt="image" src={bgOPSfr} width={467} className="w-auto h-[80px]" />;
    case "pt":
      return <img alt="image" src={bgOPSpt} width={467} className="w-auto h-[80px]" />;
    default:
      return <img alt="image" src={bgOPSes} width={467} className="w-auto h-[80px]" />;
  }
};

export default function Login() {
  const { t, i18n } = useTranslation();
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const [countries, setCountries] = React.useState<CountryType[]>([]);
  const [simulations, setSimulations] = React.useState<SimulationType[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      try {
        await axios
          .get("/getDataSignUp")
          .then((res) => {
            if (res.status === 200 && res.data.countries) {
              setCountries(res.data.countries);
              setSimulations(res.data.simulations);
            }
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <>
      <ModalSignUp open={openSignUp} onClose={() => setOpenSignUp(false)} countries={countries} simulations={simulations} />

      <div className="h-screen">
        <AppBar position="sticky">
          <Toolbar>
            <img alt="image" src={logo} width={145} height={40} className="mr-2" />

            {getBG(i18n.language)}

            <img alt="image" src={bgNavBar} width={225} height={40} className="ml-2" />

            <Box sx={{ flexGrow: 1 }} />

            <Language />
          </Toolbar>
        </AppBar>

        <div className="flex justify-center items-center h-[calc(100vh-95px)]">
          <Paper elevation={10} className="p-4">
            <FormSignIn />

            <div className="flex justify-between items-center mt-6">
              <Button variant="text" onClick={() => setOpenSignUp(true)}>
                {t("auth.sign-up")}
              </Button>

              <Button variant="text">{t("auth.forgot")}</Button>
            </div>
          </Paper>
        </div>
      </div>
    </>
  );
}
