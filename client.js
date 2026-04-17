const net = require("node:net");
const readline = require("node:readline/promises");
const { getUser } = require("./database.js");

const { commandType, requestType, responseType } = require("./constants.js");

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
  // return `Username: ${username}, password: ${password}`;
  return { username: username, password: password };
}

async function commandLoop(socket)
{

    const command = await rl.question("Enter your command: ");

    if (command === "/rooms")
    {
        socket.write(JSON.stringify({type: requestType.COMMAND.LIST_ROOMS}));
    }
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
    //   console.log(credentials);

    socket.on("data", async (data) => {
    //   console.log(data.toString()));
      const response = JSON.parse(data.toString());

      if (response.type === responseType.LOGIN_SUCCESS)
      {
        console.log("Login successfully");
        await commandLoop(socket);
        
      }

      else if (response.type === responseType.LOGIN_FAILED)
      {
        console.log("Login failed")
      }
        //  Just print data for now.
      else {
        console.log(data.toString());
      }


    });
  },
);

