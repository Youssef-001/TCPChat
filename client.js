const net = require("node:net");
const readline = require("node:readline/promises");
const { getUser } = require("./database.js");

const { commandType, requestType, responseType } = require("./constants.js");

const {handleResponse} = require('./Handlers/responseHandler.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

async function user_login() {
  const username = await rl.question("Please enter your username: ");
  const password = await rl.question("Please enter your password: ");
  return { username: username, password: password };
}

const socket = net.createConnection(
  { host: "127.0.0.1", port: 3009 },
  async () => {
    console.log("Connected to server.");

    try {
      let credentials = await user_login();
      socket.write(JSON.stringify({ type: requestType.LOGIN, ...credentials }));
    } catch (err) {
      console.log("Login failed.");
    }

    socket.on("data", async (data) => {
      const response = JSON.parse(data.toString());
      handleResponse(response);
    });
  },
);
