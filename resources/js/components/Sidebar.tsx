import React from "react";
import { useTranslation } from "react-i18next";
import { useProSidebar } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Badge } from "@mui/material";

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

export default function SidebarC() {
  const { t } = useTranslation();
  const { broken, collapsed } = useProSidebar();

  const [cant, setCant] = React.useState({
    blackboard: 0,
    mail: 0,
    chat: 0,
    document: 0
  });

  return (
    <Sidebar breakPoint="lg">
      <div className={`flex flex-col items-center overflow-x-hidden overflow-y-auto mb-5 ${broken ? "mt-20" : "mt-5"}`}>
        {!collapsed && (
          <>
            <img alt="image" src={BGSidebarHeader} width={160} height={50} />
            <hr className="w-full mt-2" />
          </>
        )}

        <Menu>
          <MenuItem icon={<AirplayRoundedIcon />}>{!collapsed && t("sidebar.simulations")}</MenuItem>

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
  );
}
