import React from "react";
import { useTranslation } from "react-i18next";
import { useProSidebar } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Avatar, Badge, Button } from "@mui/material";
import { getRoleName } from "@/common/utils";
import { useAppSelector } from "@/context";

import type { LayoutProps } from "@/common/props";

import BGSidebarHeader from "@/assets/images/logo.png";
import BGSidebarFooter from "@/assets/images/bg-sidebar-footer.png";
import AirplayRoundedIcon from "@mui/icons-material/AirplayRounded";
import AutoAwesomeMotionRoundedIcon from "@mui/icons-material/AutoAwesomeMotionRounded";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import MiscellaneousServicesRoundedIcon from "@mui/icons-material/MiscellaneousServicesRounded";
import BugReportRoundedIcon from "@mui/icons-material/BugReportRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
// import AddLinkRoundedIcon from "@mui/icons-material/AddLinkRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";

import ModalProfile from "@/components/modals/ModalProfile";

export default function SidebarC({ countries }: LayoutProps) {
  const { t, i18n } = useTranslation();
  const { broken, collapsed } = useProSidebar();
  const user = useAppSelector((state) => state.user.data);
  const [userInfo, setUserInfo] = React.useState(user);

  const [open, setOpen] = React.useState(false);
  const [pathName, setPathName] = React.useState("");
  const [cant, setCant] = React.useState({
    blackboard: 0,
    mail: 0,
    chat: 0,
    document: 0
  });

  const getUserInfo = () => {
    return (
      <div className="px-4 my-3 w-full">
        <Button
          className="bg-[#0000001a!important] w-full shadow-md rounded-md flex gap-3 items-center text-start"
          onClick={() => setOpen(true)}
        >
          {user.photo ? (
            <Avatar alt={`${user.name[0]}${user.last_name[0]}`} className="bg-blue-500" src={`../storage/${user.photo}`} />
          ) : (
            <Avatar className="bg-[#2196f3!important]">{`${user.name[0]}${user.last_name[0]}`}</Avatar>
          )}

          <div className="flex flex-col text-sm normal-case">
            <span className="text-black">{`${user.name} ${user.last_name}`}</span>

            <span className="text-[#00000099]">{getRoleName(i18n.language, user.role)}</span>

            {(user.role.name_en === "excon-general" || user.role.name_en === "observer-general") && (
              <div className="flex gap-2 text-xs">
                <span className="font-bold">{`${t("user.simulation")}:`}</span>
                <span>{user.simulation?.name}</span>
              </div>
            )}

            {(user.role.name_en === "excon-group" || user.role.name_en === "observer-group") && (
              <div className="flex gap-2 text-xs">
                <span className="font-bold">{`${t("user.simulation")}:`}</span>
                <span>{user.simulation?.name}</span>
                <span className="font-bold">{`${t("user.area")}:`}</span>
                <span>{user.area?.name}</span>
                <span className="font-bold">{`${t("user.group")}:`}</span>
                <span>{user.group?.name}</span>
              </div>
            )}

            {(user.role.name_en === "participant" || user.role.name_en === "observer-participant") && (
              <div className="flex gap-2 text-xs">
                <span className="font-bold">{`${t("user.simulation")}:`}</span>
                <span>{user.simulation?.name}</span>
                <span className="font-bold">{`${t("user.area")}:`}</span>
                <span>{user.area?.name}</span>
                <span className="font-bold">{`${t("user.group")}:`}</span>
                <span>{user.group?.name}</span>
                {user.subgroup && (
                  <>
                    <span className="font-bold">{`${t("user.subgroup")}:`}</span>
                    <span>{user.subgroup?.name}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </Button>
      </div>
    );
  };

  React.useEffect(() => {
    setPathName(window.location.pathname);
  }, []);

  React.useEffect(() => {
    setUserInfo(user);
  }, [user]);

  return (
    <>
      <ModalProfile open={open} onClose={() => setOpen(false)} countries={countries} />

      <Sidebar breakPoint="lg" width="300px">
        <div className={`flex flex-col items-center overflow-x-hidden overflow-y-auto mb-5 ${broken ? "mt-20" : "mt-5"}`}>
          {!collapsed && (
            <>
              <img alt="image" src={BGSidebarHeader} width={160} height={45} />
              <hr className="w-full mt-2" />
              {getUserInfo()}
            </>
          )}

          <Menu className="px-2">
            <MenuItem icon={<AirplayRoundedIcon />} active={pathName === "/"}>
              {!collapsed && t("sidebar.simulations")}
            </MenuItem>

            <MenuItem icon={<AutoAwesomeMotionRoundedIcon />}>{!collapsed && t("sidebar.board-excon")}</MenuItem>

            <MenuItem icon={<AutoAwesomeMotionRoundedIcon />}>{!collapsed && t("sidebar.board-participant")}</MenuItem>

            <MenuItem
              icon={
                <Badge badgeContent={cant.blackboard} color="success">
                  <EventNoteRoundedIcon />
                </Badge>
              }
            >
              {!collapsed && t("sidebar.blackboard")}
            </MenuItem>

            <MenuItem
              icon={
                <Badge badgeContent={cant.mail} color="success">
                  <EmailRoundedIcon />
                </Badge>
              }
            >
              {!collapsed && "MyMail"}
            </MenuItem>

            <MenuItem
              icon={
                <Badge badgeContent={cant.chat} color="success">
                  <ForumRoundedIcon />
                </Badge>
              }
            >
              {!collapsed && "Chat"}
            </MenuItem>

            <MenuItem
              icon={
                <Badge badgeContent={cant.document} color="success">
                  <MenuBookRoundedIcon />
                </Badge>
              }
            >
              {!collapsed && t("sidebar.document")}
            </MenuItem>

            <SubMenu label={!collapsed && t("sidebar.external-link")} icon={<LinkRoundedIcon />}></SubMenu>

            <MenuItem icon={<InsertChartIcon />}>{!collapsed && t("sidebar.reports")}</MenuItem>

            <MenuItem icon={<GroupsRoundedIcon />}>{!collapsed && t("sidebar.users")}</MenuItem>

            <SubMenu label={!collapsed && t("sidebar.configuration")} icon={<MiscellaneousServicesRoundedIcon />}>
              <MenuItem icon={<BugReportRoundedIcon />}>{t("sidebar.events")}</MenuItem>

              <MenuItem icon={<LocalFireDepartmentRoundedIcon />}>{t("sidebar.incidents")}</MenuItem>

              <MenuItem icon={<PublicRoundedIcon />}>{t("sidebar.countries")}</MenuItem>
            </SubMenu>

            <MenuItem icon={<ContentPasteSearchIcon />}>{!collapsed && t("sidebar.audit")}</MenuItem>
          </Menu>

          {!collapsed && (
            <>
              <hr className="w-full mb-4" />
              <img alt="image" src={BGSidebarFooter} width={230} height={50} />
            </>
          )}
        </div>
      </Sidebar>
    </>
  );
}
