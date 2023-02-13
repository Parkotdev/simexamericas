import React from "react";
import { useTranslation } from "react-i18next";
import JoditEditor from "jodit-pro-react";
import axios from "axios";
import config from "@/common/config";

import type { EditorProps } from "@/common/props";

export default function Editor({ role, description, setDescription }: EditorProps) {
  const { t } = useTranslation();
  const [token, setToken] = React.useState("");

  const editor_config = {
    license: config.editor_license_key,
    readonly: false,
    askBeforePasteFromWord: false,
    askBeforePasteHTML: false,
    uploader: {
      url: "/connector?action=upload",
      headers: {
        "X-CSRF-Token": token
      }
    },
    filebrowser: {
      ajax: {
        url: "/connector",
        method: "POST",
        dataType: "text",
        headers: {
          "X-CSRF-Token": token
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        prepareData: function (data: any) {
          data.role = role;
          return data;
        }
      }
    },
    height: 580,
    placeholder: t("common.editor-placeholder")
  };

  React.useEffect(() => {
    const getToken = async () => {
      await axios.get("/getToken").then((res) => {
        if (res.status === 200) setToken(res.data);
      });
    };

    getToken();
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <label className="mb-1 text-[#00000099]">
        {t("common.description")}:<span className="text-red-500">*</span>
      </label>

      {token && <JoditEditor value={description} config={editor_config} onBlur={(newContent) => setDescription(newContent)} />}
    </div>
  );
}
