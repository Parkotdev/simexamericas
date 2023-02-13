import React from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";

import type { GeneralProps } from "@/common/props";

import type { CountryType } from "@/common/types";

import { NavBar, Sidebar } from "@/components";

export default function Layout({ children }: GeneralProps) {
  const { t } = useTranslation();
  const [countries, setCountries] = React.useState<CountryType[]>([]);

  React.useEffect(() => {
    const getCountries = async () => {
      await axios
        .get("/countries")
        .then((res) => {
          if (res.status === 200) {
            setCountries(res.data.countries);
          } else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
              title: "Oops",
              text: t("common.error") || ""
            });
          }
        })
        .catch(() => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
            title: "Oops",
            text: t("common.error") || ""
          });
        });
    };

    getCountries();
  }, []);

  return (
    <div className="p-0 flex relative h-screen">
      <Sidebar countries={countries} />

      <main className="grow overflow-y-hidden">
        <NavBar countries={countries} />

        <div className="p-5">{children}</div>
      </main>
    </div>
  );
}
