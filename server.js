const net = require("node:net");

const readline = require("node:readline");

const { getUser, getRooms } = require("./database.js");

const { parseCredentials } = require("./utils.js");

const { createUser } = require("./userHandler.js");
const { create } = require("node:domain");
const { commandType, requestType, responseType } = require("./constants.js");

const { RoomHandler } = require("./Handlers/roomHandler.js");
const { UserHandler } = require("./Handlers/userHandler.js");
const {handleRequest} = require('./Handlers/requestHandler.js');
const { User } = require("./user.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// let users = [];

const server = net.createServer();

let roomHandler = new RoomHandler();
let userHandler = new UserHandler();
roomHandler.loadRooms(getRooms());

server.on("connection", (socket) => {
  socket.on("data", (data) => {
    let request = JSON.parse(data.toString());

    handleRequest(socket,request);


  });
});

server.listen(3009, "127.0.0.1", () => {
  console.log("Server running on: ", server.address());
});
