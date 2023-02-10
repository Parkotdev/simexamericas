import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from "react-i18next";
import axios from "axios";
import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@mui/material";
import config from "@/common/config";
import { validEmail } from "@/common/utils";

import type { CountryI, DataSignUpI } from "@/common/interfaces";
import type { SignInProps } from "@/common/props";
import type { CountryType } from "@/common/types";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

export default function FormSignUp({ onClose, countries, simulations }: SignInProps) {
  const { t, i18n } = useTranslation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reCaptchaRef = React.useRef<any>(null);

  const [country, setCountry] = React.useState<null | CountryI>(null);

  const [passwordC, setPasswordC] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordC, setShowPasswordC] = React.useState(false);

  const [data, setData] = React.useState<DataSignUpI>({
    areas: [],
    groups: [],
    subgroups: []
  });

  const [form, setForm] = React.useState({
    name: "",
    last_name: "",
    email: "",
    country_id: "",
    password: "",
    phone: "",
    organization: "",
    simulation_id: "",
    area_id: "",
    group_id: "",
    subgroup_id: ""
  });

  const [error, setError] = React.useState({
    name: false,
    last_name: false,
    email: false,
    country_id: false,
    password: false,
    password_confirm: false,
    simulation_id: false,
    area_id: false,
    group_id: false,
    captcha: false
  });

  const [help, setHelp] = React.useState({
    name: "",
    last_name: "",
    email: "",
    country_id: "",
    password: "",
    password_confirm: "",
    simulation_id: "",
    area_id: "",
    group_id: "",
    captcha: ""
  });

  const getAreas = async (simulation_id: string) => {
    await axios.get("/sanctum/csrf-cookie").then(async () => {
      await axios
        .get(`/areasBYsimulation/${simulation_id}`)
        .then((res) => setData({ ...data, areas: res.data }))
        .catch((error) => console.log(error));
    });
  };

  const getGroups = async (area_id: string) => {
    await axios.get("/sanctum/csrf-cookie").then(async () => {
      await axios
        .get(`/groupsBYareas/${area_id}`)
        .then((res) => setData({ ...data, groups: res.data }))
        .catch((error) => console.log(error));
    });
  };

  const getSubgroups = async (group_id: string) => {
    await axios.get("/sanctum/csrf-cookie").then(async () => {
      await axios
        .get(`/subgroupsBYgroup/${group_id}`)
        .then((res) => setData({ ...data, subgroups: res.data }))
        .catch((error) => console.log(error));
    });
  };

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
    setError({ ...error, [name]: value.trim() === "" });
    setHelp({ ...help, [name]: value.trim() === "" ? t("valid.required") : "" });
  };

  const handleChangeCountry = (newValue: CountryType | null) => {
    setCountry(newValue);
    setError({ ...error, country_id: newValue ? false : true });
    setHelp({ ...help, country_id: newValue ? "" : t("valid.required") });
  };

  const handleChangePassword = (value: string) => {
    setForm({ ...form, password: value });

    if (value != passwordC) {
      setError({ ...error, password: value === "", password_confirm: true });
      setHelp({ ...help, password: value === "" ? t("valid.required") : "", password_confirm: t("valid.password") });
    } else {
      setError({ ...error, password: value === "", password_confirm: false });
      setHelp({ ...help, password: value === "" ? t("valid.required") : "", password_confirm: "" });
    }
  };

  const handleChangePasswordC = (value: string) => {
    setPasswordC(value);

    if (value === "") {
      setError({ ...error, password_confirm: true });
      setHelp({ ...help, password_confirm: t("valid.required") });
    } else {
      if (value != form.password) {
        setError({ ...error, password_confirm: true });
        setHelp({ ...help, password_confirm: t("valid.password") });
      } else {
        setError({ ...error, password_confirm: false });
        setHelp({ ...help, password_confirm: "" });
      }
    }
  };

  const handleChangeSimulation = (simulation_id: string) => {
    setForm({ ...form, simulation_id, area_id: "", group_id: "", subgroup_id: "" });
    setError({ ...error, simulation_id: false });
    setHelp({ ...help, simulation_id: "" });
    setData({ ...data, groups: [], subgroups: [] });
    getAreas(simulation_id);
  };

  const handleChangeArea = (area_id: string) => {
    setForm({ ...form, area_id, group_id: "", subgroup_id: "" });
    setError({ ...error, area_id: false });
    setHelp({ ...help, area_id: "" });
    setData({ ...data, subgroups: [] });
    getGroups(area_id);
  };

  const handleChangeGroup = (group_id: string) => {
    setForm({ ...form, group_id, subgroup_id: "" });
    setError({ ...error, group_id: false });
    setHelp({ ...help, group_id: "" });
    getSubgroups(group_id);
  };

  const handleChangeSubgroup = (subgroup_id: string) => {
    setForm({ ...form, subgroup_id });
  };

  const handleChangeReCaptcha = (token: string | null) => {
    setError({ ...error, captcha: token ? false : true });
    setHelp({ ...help, captcha: token ? "" : t("valid.required") });
  };

  const handleSubmit = () => {
    console.log(form);
  };

  /* React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.grecaptcha.render("recaptcha-2", {
        hl: i18n.language,
        sitekey: config.re_captcha_key
      });
    }
  }, []); */

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
      <DialogContent dividers>
        <form noValidate autoComplete="off" className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              fullWidth
              size="small"
              value={form.name}
              error={error.name}
              variant="outlined"
              helperText={help.name}
              onChange={(e) => handleChange("name", e.target.value)}
              label={
                <>
                  {`${t("user.name")}:`} {<span style={{ color: "red" }}>*</span>}
                </>
              }
            />

            <TextField
              fullWidth
              size="small"
              value={form.last_name}
              error={error.last_name}
              variant="outlined"
              helperText={help.last_name}
              onChange={(e) => handleChange("last_name", e.target.value)}
              label={
                <>
                  {`${t("user.last_name")}:`} {<span style={{ color: "red" }}>*</span>}
                </>
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextField
              fullWidth
              size="small"
              type="email"
              value={form.email}
              error={error.email}
              variant="outlined"
              helperText={help.name}
              onChange={(e) => handleChange("email", e.target.value)}
              label={
                <>
                  {`${t("user.email")}:`} {<span style={{ color: "red" }}>*</span>}
                </>
              }
            />

            <Autocomplete
              value={country}
              options={countries}
              onChange={(event, newValue) => handleChangeCountry(newValue)}
              getOptionLabel={(option) => option.name + ", " + option.timezone + ", " + option.gmt}
              renderOption={(props, option) => (
                <Box
                  {...props}
                  component="li"
                  sx={{
                    "& > img": {
                      mr: 2,
                      flexShrink: 0
                    }
                  }}
                >
                  <img
                    alt=""
                    width={20}
                    height={20}
                    src={`/images/flags/${option.iso_code.toLowerCase()}.png`}
                    className="w-auto h-auto"
                  />
                  {option.name}, {option.timezone}, {option.gmt}
                </Box>
              )}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    size="small"
                    error={error.country_id}
                    helperText={help.country_id}
                    label={
                      <>
                        {`${t("user.country")}: `}
                        {
                          <span
                            style={{
                              color: "red"
                            }}
                          >
                            *
                          </span>
                        }
                      </>
                    }
                  />
                </>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              value={form.password}
              error={error.password}
              helperText={help.password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => handleChangePassword(e.target.value)}
              label={
                <>
                  {`${t("common.password")}:`} {<span style={{ color: "red" }}>*</span>}
                </>
              }
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

            <TextField
              fullWidth
              size="small"
              variant="outlined"
              value={passwordC}
              error={error.password_confirm}
              helperText={help.password_confirm}
              type={showPasswordC ? "text" : "password"}
              onChange={(e) => handleChangePasswordC(e.target.value)}
              label={
                <>
                  {`${t("user.password-confirm")}:`} {<span style={{ color: "red" }}>*</span>}
                </>
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPasswordC(!showPasswordC)}>
                      {showPasswordC ? <VisibilityOffRoundedIcon /> : <VisibilityRoundedIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <TextField
              fullWidth
              size="small"
              value={form.phone}
              variant="outlined"
              onChange={(e) => handleChange("phone", e.target.value)}
              label={`${t("user.phone")}:`}
            />

            <TextField
              fullWidth
              size="small"
              type="tel"
              value={form.organization}
              variant="outlined"
              onChange={(e) => handleChange("organization", e.target.value)}
              label={`${t("user.organization")}:`}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormControl fullWidth size="small" error={error.simulation_id}>
              <InputLabel htmlFor="simulation">
                {`${t("user.simulation")}:`} {<span style={{ color: "red" }}>*</span>}
              </InputLabel>

              <Select
                value={form.simulation_id}
                labelId="simulation"
                input={<OutlinedInput label={`${t("user.simulation")}: *`} />}
                onChange={(event) => handleChangeSimulation(event.target.value)}
              >
                <MenuItem value={0} disabled>
                  <em>{t("common.select")}</em>
                </MenuItem>

                {simulations.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>{help.simulation_id}</FormHelperText>
            </FormControl>

            <FormControl fullWidth size="small" error={error.area_id}>
              <InputLabel htmlFor="area">
                {`${t("user.area")}:`} {<span style={{ color: "red" }}>*</span>}
              </InputLabel>

              <Select
                labelId="area"
                value={form.area_id}
                input={<OutlinedInput label={`${t("user.area")}: *`} />}
                onChange={(event) => handleChangeArea(event.target.value)}
              >
                <MenuItem value={0} disabled>
                  <em>{t("common.select")}</em>
                </MenuItem>

                {data.areas.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>{help.area_id}</FormHelperText>
            </FormControl>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormControl fullWidth size="small" error={error.group_id}>
              <InputLabel htmlFor="group">
                {`${t("user.group")}:`} {<span style={{ color: "red" }}>*</span>}
              </InputLabel>

              <Select
                value={form.group_id}
                labelId="group"
                input={<OutlinedInput label={`${t("user.group")}: *`} />}
                onChange={(event) => handleChangeGroup(event.target.value)}
              >
                <MenuItem value={0} disabled>
                  <em>{t("common.select")}</em>
                </MenuItem>

                {data.groups.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>

              <FormHelperText>{help.group_id}</FormHelperText>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel htmlFor="area">{`${t("user.subgroup")}:`}</InputLabel>

              <Select
                labelId="subgroup"
                value={form.subgroup_id}
                input={<OutlinedInput label={`${t("user.subgroup")}: *`} />}
                onChange={(event) => handleChangeSubgroup(event.target.value)}
              >
                <MenuItem value={0} disabled>
                  <em>{t("common.select")}</em>
                </MenuItem>

                {data.subgroups.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="my-6">
            <Box
              sx={{
                "& > div > div > div": {
                  border: error.captcha ? "1px solid #d32f2f" : "none"
                }
              }}
            >
              <ReCAPTCHA
                id="recaptcha-2"
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
              {help.captcha}
            </FormHelperText>
          </div>
        </form>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          {t("common.save")}
        </Button>

        <Button variant="contained" color="inherit" onClick={onClose}>
          {t("common.cancel")}
        </Button>
      </DialogActions>
    </>
  );
}
