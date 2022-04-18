const express = require("express");
const app = express();

// socket io config
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
 const io = new Server(server);

 io.on("connection", (socket) => {
   console.log("a user connected");
   socket.on("disconnect", () => {
     console.log("user disconnected");
   });
 });

 const bodyparser = require("body-parser");
 const config = require("config");
 const cors = require("cors");

 app.use(bodyparser.urlencoded({ extended: true }));
 app.use(bodyparser.json());
 app.use(cors());

 require("./model/db");

 // allow static assests to be available

 app.use(express.static(__dirname + "/public"));
 app.use("/uploads", express.static("uploads"));

 // controllers

 const userController = require("./controller/user.controller");
 const authController = require("./controller/auth.controller");
 const textController = require("./controller/text.controller");
 const messageController = require("./controller/message.controller");

 app.get("/", (req, res) => res.send(config.get("APP_DETAILS")));
 app.use("/api/v1/users", userController);
 app.use("/api/v1/auth", authController);
 app.use("/api/v1/text", textController);
 app.use("/api/v1/messages", messageController);

 const port = process.env.PORT || 5000;
 app.listen(port, () => console.log(`App listening on port ${port}!`));

 module.exports = { io };