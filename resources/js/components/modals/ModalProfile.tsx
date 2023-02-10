import React from "react";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { getRoleName } from "@/common/utils";
import { setLoading, setUser, useAppDispatch, useAppSelector } from "@/context";

import type { ModalProfileProps } from "@/common/props";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FileUploadRounded from "@mui/icons-material/FileUploadRounded";
import profile from "@/assets/images/profile.png";

import ModalProfileEdit from "./ModalProfileEdit";

export default function ModalProfile({ open, onClose, countries }: ModalProfileProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);

  const [userInfo, setUserInfo] = React.useState(user);
  const [openEdit, setOpenEdit] = React.useState(false);

  const changePhoto = async (file: File) => {
    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("id", userInfo.id);
    formData.append("file", file);

    try {
      await axios
        .post("userPhoto", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(setUser({ ...user, photo: res.data.users.photo }));
            Swal.fire({
              position: "top-end",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
              title: t("user.photo-success") || ""
            });
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
        });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        title: "Oops",
        text: t("common.error") || ""
      });
    }

    dispatch(setLoading(false));
  };

  const photoValidate = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];

      if (file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png") {
        if (file.size <= 5000000) {
          changePhoto(file);
        } else {
          event.preventDefault();
          Swal.fire({
            position: "top-end",
            icon: "warning",
            showConfirmButton: false,
            timer: 2000,
            title: t("valid.image-size-5") || ""
          });
        }
      } else {
        event.preventDefault();
        Swal.fire({
          position: "top-end",
          icon: "warning",
          showConfirmButton: false,
          timer: 2000,
          title: t("valid.image-format") || ""
        });
      }
    }
  };

  React.useEffect(() => {
    setUserInfo(user);
  }, [user]);

  return (
    <>
      <ModalProfileEdit open={openEdit} onClose={() => setOpenEdit(false)} countries={countries} />

      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar variant="dense" className="justify-between">
            <Typography sx={{ fontSize: "1.3rem" }}>{t("user.profile")}</Typography>

            <IconButton edge="end" color="inherit" onClick={onClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <DialogContent dividers>
          <div className="flex flex-col items-center text-lg">
            <Badge
              sx={{ mb: 2 }}
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              badgeContent={
                <label htmlFor="photo" className="contents">
                  <input type="file" id="photo" accept="image/png, image/jpeg" onChange={photoValidate} className="hidden" />
                  <IconButton
                    component="span"
                    sx={{
                      width: 50,
                      height: 50,
                      color: "white",
                      backgroundColor: "#2e7d32",
                      "&:hover": {
                        backgroundColor: "#1b5e20"
                      }
                    }}
                  >
                    <FileUploadRounded />
                  </IconButton>
                </label>
              }
            >
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  backgroundColor: "#bdbdbd"
                }}
                src={userInfo.photo ? `../storage/${userInfo.photo}` : profile}
              />
            </Badge>

            <span className="font-bold">{`${userInfo.name} ${userInfo.last_name}`}</span>
            <span className="text-[#00000099]">{getRoleName(i18n.language, userInfo.role)}</span>
            <span>{userInfo.email}</span>
            <span>{`${userInfo.country.name}, ${userInfo.country.timezone}, ${userInfo.country.gmt}`}</span>
          </div>

          {userInfo.simulation && (
            <List>
              <ListItem divider>
                <ListItemAvatar>
                  {userInfo.simulation.icon ? (
                    <Avatar alt={userInfo.simulation.name} src={`../storage/${userInfo.simulation.icon}`} />
                  ) : (
                    <Avatar>{userInfo.simulation.name[0]}</Avatar>
                  )}
                </ListItemAvatar>

                <ListItemText primary={t("user.simulation")} secondary={userInfo.simulation.name} />
              </ListItem>

              {userInfo.area && (
                <>
                  <ListItem divider>
                    <ListItemAvatar>
                      {userInfo.area.icon ? (
                        <Avatar alt={userInfo.area.name} src={`../storage/${userInfo.area.icon}`} />
                      ) : (
                        <Avatar>{userInfo.area.name[0]}</Avatar>
                      )}
                    </ListItemAvatar>

                    <ListItemText primary={t("user.area")} secondary={userInfo.area.name} />
                  </ListItem>

                  {userInfo.group && (
                    <ListItem divider>
                      <ListItemAvatar>
                        {userInfo.group.icon ? (
                          <Avatar alt={userInfo.group.name} src={`../storage/${userInfo.group.icon}`} />
                        ) : (
                          <Avatar>{userInfo.group.name[0]}</Avatar>
                        )}
                      </ListItemAvatar>

                      <ListItemText primary={t("user.group")} secondary={userInfo.group.name} />
                    </ListItem>
                  )}

                  {userInfo.subgroup && (
                    <ListItem divider>
                      <ListItemAvatar>
                        {userInfo.subgroup.icon ? (
                          <Avatar alt={userInfo.subgroup.name} src={`../storage/${userInfo.subgroup.icon}`} />
                        ) : (
                          <Avatar>{userInfo.subgroup.name[0]}</Avatar>
                        )}
                      </ListItemAvatar>

                      <ListItemText primary={t("user.subgroup")} secondary={userInfo.subgroup.name} />
                    </ListItem>
                  )}
                </>
              )}
            </List>
          )}
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={() => setOpenEdit(true)}>
            {t("common.edit")}
          </Button>

          <Button color="inherit" variant="contained" onClick={onClose}>
            {t("common.close")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
