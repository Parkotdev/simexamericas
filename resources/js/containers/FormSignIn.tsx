import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import { router } from "@inertiajs/react";
import axios from "axios";
import { Avatar, Box, Button, FormHelperText, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import Swal from "sweetalert2";
import config from "@/common/config";

import { validEmail } from "@/common/utils";
import { setLoading, useAppDispatch } from "@/context";

import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

export default function FormSignIn() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reCaptchaRef = React.useRef<any>(null);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const [errorEmail, setErrorEmail] = React.useState(false);
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [errorCaptcha, setErrorCaptcha] = React.useState(false);

  const [helpEmail, setHelpEmail] = React.useState("");
  const [helpPassword, setHelpPassword] = React.useState("");
  const [helpCaptcha, setHelpCaptcha] = React.useState("");

  const handleChangeInput = (name: string, value: string) => {
    if (name === "email") {
      setEmail(value);
      if (value.trim() === "") {
        if (!errorEmail) setErrorEmail(true);
        setHelpEmail(t("valid.required") || "");
      } else if (!validEmail(value)) {
        if (!errorEmail) setErrorEmail(true);
        setHelpEmail(t("valid.email") || "");
      } else {
        if (errorEmail) setErrorEmail(false);
        if (helpEmail) setHelpEmail("");
      }
    } else {
      setPassword(value);
      setErrorPassword(value.trim() === "");
      setHelpPassword(value.trim() === "" ? t("valid.required") || "" : "");
    }
  };

  const handleChangeReCaptcha = (token: string | null) => {
    setErrorCaptcha(token ? false : true);
    setHelpCaptcha(token ? "" : t("valid.required") || "");
  };

  const handleLogin = async () => {
    let is_valid = true;

    if (email.trim() === "") {
      is_valid = false;
      setErrorEmail(true);
      setHelpEmail(t("valid.required") || "");
    }

    if (password.trim() === "") {
      is_valid = false;
      setErrorPassword(true);
      setHelpPassword(t("valid.required") || "");
    }

    if (!reCaptchaRef.current.getValue()) {
      is_valid = false;
      setErrorCaptcha(true);
      setHelpCaptcha(t("valid.required") || "");
    }

    if (is_valid) {
      dispatch(setLoading(true));

      try {
        await axios
          .post("/login", {
            email,
            password,
            locale: i18n.language
          })
          .then((res) => {
            if (res.status === 200) {
              router.get("/");
            }
          })
          .catch((error) => {
            Swal.fire({ title: error.response.data.message, icon: "error" });
          });
      } catch (error) {
        console.log(error);
        Swal.fire({ title: "Oops", text: t("common.error") || "", icon: "error" });
      }

      dispatch(setLoading(false));
    }
  };

  React.useEffect(() => {
    const iframeGoogleCaptcha = reCaptchaRef.current.captcha.querySelector("iframe");

    if (iframeGoogleCaptcha) {
      iframeGoogleCaptcha
        .getAttribute("src")
        .match(/hl=(.*?)&/)
        .pop();
      iframeGoogleCaptcha.setAttribute(
        "src",
        iframeGoogleCaptcha.getAttribute("src").replace(/hl=(.*?)&/, "hl=" + i18n.language + "&")
      );
    }
  }, [i18n.language]);

  return (
    <>
      <div className="flex flex-col items-center gap-1">
        <Avatar className="bg-[green!important]">
          <LockRoundedIcon />
        </Avatar>

        <Typography variant="h6">{t("auth.login")}</Typography>
      </div>

      <div className={`flex gap-2 mb-3 ${errorEmail ? "items-center" : "items-end"}`}>
        <AccountCircleRoundedIcon color="action" />

        <TextField
          fullWidth
          name="email"
          value={email}
          error={errorEmail}
          variant="standard"
          helperText={helpEmail}
          label={`${t("common.user")}:`}
          onChange={(e) => handleChangeInput("email", e.target.value)}
        />
      </div>

      <div className={`flex gap-2 ${errorPassword ? "items-center" : "items-end"}`}>
        <LockRoundedIcon color="action" />

        <TextField
          fullWidth
          name="password"
          value={password}
          variant="standard"
          error={errorPassword}
          helperText={helpPassword}
          label={`${t("common.password")}:`}
          type={showPassword ? "text" : "password"}
          onChange={(e) => handleChangeInput("password", e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </div>

      <div className="my-6">
        <Box
          sx={{
            "& > div > div > div": {
              border: errorCaptcha ? "1px solid #d32f2f" : "none"
            }
          }}
        >
          <ReCAPTCHA
            id="recaptcha"
            hl={i18n.language}
            ref={reCaptchaRef}
            sitekey={config.re_captcha_key || ""}
            onChange={handleChangeReCaptcha}
          />
        </Box>

        <FormHelperText
          sx={{
            ml: "14px",
            color: "#d32f2f"
          }}
        >
          {helpCaptcha}
        </FormHelperText>
      </div>

      <Button fullWidth variant="contained" onClick={handleLogin}>
        {t("auth.sign-in")}
      </Button>
    </>
  );
}
