import React from "react";
import axios from "axios";
import { router } from "@inertiajs/react";
import { Backdrop, CircularProgress } from "@mui/material";
import { setUser, useAppDispatch, useAppSelector } from "@/context";

import type { GeneralProps } from "@/common/props";

export default function ServiceProvider({ children }: GeneralProps) {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.general.loading);

  React.useEffect(() => {
    const getUser = async () => {
      try {
        await axios
          .get("/userAuth")
          .then((res) => {
            if (res.status === 200) {
              dispatch(setUser(res.data.users[0]));
            }
          })
          .catch(() => router.get("/login"));
      } catch (error) {
        router.get("/login");
      }
    };

    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : null}

      {children}
    </>
  );
}
