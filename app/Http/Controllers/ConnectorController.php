<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ConnectorController extends Controller
{
    private $baseurl = "https://file.simexamericas.org/images/";
    // private $baseurl = "http://connector.local/images/";

    public function connector(Request $request)
    {
        $response = [
            "success" => true,
            "time" => date("Y-M-D H:i"),
            "elapsedTime" => null,
            "data" => [
                "code" => 220
            ]
        ];
        $access = $request['role'] == 0 || $request['role'] == 1;
        $dir = base_path('connector/images') . DIRECTORY_SEPARATOR;

        switch ($request["action"]) {
            case "permissions":
                $response["data"]["permissions"] = [
                    "allowFiles" => $access,
                    "allowFileMove" => false,
                    "allowFileUpload" => $access,
                    "allowFileUploadRemote" => $access,
                    "allowFileRemove" => $access,
                    "allowFileRename" => $access,
                    "allowFolders" => $access,
                    "allowFolderMove" => false,
                    "allowFolderCreate" => $access,
                    "allowFolderRemove" => $access,
                    "allowFolderRename" => $access,
                    "allowImageResize" => false,
                    "allowImageCrop" => false
                ];
                break;
            case "files":
                $response["data"]["sources"] = [
                    [
                        "name" => "SIMEX",
                        "baseurl" => $this->baseurl,
                        "path" => $request["path"] ? $request["path"] . DIRECTORY_SEPARATOR : "",
                        "files" => $this->dirORfile($dir . $request["path"], true)
                    ],
                ];
                break;
            case "folders":
                $response["data"]["sources"] = [
                    [
                        "name" => "SIMEX",
                        "title" => "SIMEX",
                        "baseurl" => $this->baseurl,
                        "path" => $request["path"] ? $request["path"] . DIRECTORY_SEPARATOR : "",
                        "folders" => $this->dirORfile($dir . $request["path"], false),
                    ],
                ];
                break;
            case "upload":
                $files = $request->file('files');
                $names = [];
                $isImages = [];
                foreach ($files as $file) {
                    $dir = $request["path"] !== ""
                        ? base_path('connector/images') . DIRECTORY_SEPARATOR . $request["path"] . DIRECTORY_SEPARATOR
                        : base_path('connector/images') . DIRECTORY_SEPARATOR;
                    $name = str_replace(" ", "-", $this->getName($dir, $file->getClientOriginalName()));
                    $file->storeAs($request["path"], str_replace(" ", "-", $name), 'connector');
                    array_push($names, $name);
                    array_push($isImages, true);
                }
                $response["data"] = [
                    "code" => 220,
                    "baseurl" => $this->baseurl,
                    "elapsedTime" => null,
                    "files" => $names,
                    "isImages" => $isImages,
                ];
                break;
            case "fileRemove":
                Storage::disk('connector')->delete($request["path"] . DIRECTORY_SEPARATOR . $request["name"]);
                $response["data"] = ["code" => 220];
                break;
        }

        return $response;
    }

    private function dirORfile($dir, $files)
    {
        $result = array();

        $cdir = scandir($dir);
        foreach ($cdir as $key => $value) {
            if (!in_array($value, array(".", ".."))) {
                if ($files && is_file($dir . DIRECTORY_SEPARATOR . $value)) {
                    $pathinfo = pathinfo($value);
                    $ext = $pathinfo["extension"];
                    $type = $this->getType($ext);
                    array_push($result, [
                        "name" => $value,
                        "file" => $value,
                        "type" => $type,
                        "isImage" => $type === "image",
                        "size" => filesize($dir . DIRECTORY_SEPARATOR . $value)
                    ]);
                } else if (!$files && is_dir($dir . DIRECTORY_SEPARATOR . $value)) {
                    array_push($result, $value);
                }
            }
        }

        return $result;
    }

    private function getName($dir, $name)
    {
        if (file_exists($dir . $name)) {
            $num = 1;
            $pathinfo = pathinfo($name);
            $ext = $pathinfo['extension'];
            $only_name = $pathinfo['filename'];
            if (preg_match('/\([0-9]*\)$/', $only_name)) {
                $pos_i = strrpos($only_name, "(");
                $num = intval(substr($only_name, $pos_i + 1, -1)) + 1;
                $only_name = substr($name, 0, $pos_i) . "($num)";
                while (file_exists($dir . $only_name . $ext)) {
                    $num++;
                    $only_name = substr($name, 0, $pos_i) . "($num)";
                }
            } else {
                $new_name = $only_name;
                while (file_exists($dir . $only_name . $ext)) {
                    $num++;
                    $only_name = $new_name . "($num)";
                }
            }

            return "$only_name.$ext";
        }

        return $name;
    }

    private function getType($ext)
    {
        $type = "";
        switch ($ext) {
            case 'bmp':
            case 'gif':
            case 'jpeg':
            case 'jpg':
            case 'png':
            case 'tif':
            case 'tiff':
            case 'svg':
                $type = "image";
                break;
            case 'pdf':
            case 'doc':
            case 'docx':
            case 'ppt':
            case 'pptx':
            case 'pptm':
            case 'pps':
            case 'ppsm':
            case 'xls':
            case 'xlsx':
                $type = "file";
                break;
            case 'mp4':
            case 'mpg':
            case 'avi':
                $type = "video";
                break;
        }
        return $type;
    }
}
