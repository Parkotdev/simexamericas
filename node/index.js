/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const config = require("config");
const express = require("express");
const http = require("http");
/* const fs = require("fs");
const https = require("https"); */
const cors = require("cors");
const { Server } = require("socket.io");
const schedule = require("node-schedule");

const moment = require("moment-timezone");

const axios = require("axios");
axios.defaults.baseURL = config.get("server.host");
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

const app = express();
app.use(cors());

/* const server = https.createServer(
  {
    key: fs.readFileSync("../ssl/key.key"),
    cert: fs.readFileSync("../ssl/ssl-bundle.crt")
  },
  app
); */

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log(`User connect: ${socket.id}`);

  /******************** AREA ********************/
  socket.on("area_add", (area) => {
    io.emit("get_areas", { type: "add", area });
  });

  socket.on("area_delete", (area) => {
    io.emit("get_areas", { type: "delete", area });
  });
  /****************** END AREA ******************/

  /******************** GROUPS ********************/
  socket.on("group_add", (group) => {
    io.emit("get_groups", { type: "add", group });
  });

  socket.on("area_delete", (group) => {
    io.emit("get_groups", { type: "delete", group });
  });
  /****************** END GROUPS ******************/

  /******************** SUBGROUPS ********************/
  socket.on("subgroup_add", (subgroup) => {
    io.emit("get_subgroups", { type: "add", subgroup });
  });

  socket.on("area_delete", (subgroup) => {
    io.emit("get_subgroups", { type: "delete", subgroup });
  });
  /****************** END SUBGROUPS ******************/

  socket.on("disconnect", () => {
    console.log(`User disconnect: ${socket.id}`);
  });
});

server.listen(config.get("server.port"), () => {
  console.log("Server node online");
});
