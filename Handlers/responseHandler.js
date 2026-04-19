const { commandType, requestType, responseType } = require("../constants");
const readline = require("node:readline/promises");

const EventEmitter = require("events");
const stateEvents = new EventEmitter();
const { clearLine, moveCursor } = require("../utils.js");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clientState = {
  inRoom: false,
  currentRoom: null,
};

function waitForInput(prompt) {
  return new Promise((resolve) => {
    let settled = false;

    rl.setPrompt(prompt);
    rl.prompt();

    const cleanup = () => {
      rl.removeListener("line", onLine);
      stateEvents.removeListener("stateChange", onStateChange);
    };

    const onLine = (input) => {
      if (settled) return;
      settled = true;
      cleanup();
      resolve(input.trim());
    };

    const onStateChange = () => {
      if (settled) return;
      settled = true;
      cleanup();
      process.stdout.write("\n");
      resolve(null);
    };

    rl.once("line", onLine);
    stateEvents.once("stateChange", onStateChange);
  });
}


const sendRequestHandler = {
  [requestType.COMMAND.LIST_ROOMS]: (socket, data) => {
    socket.write(JSON.stringify({ type: requestType.LIST_ROOMS }));
    // return;
  },

  [requestType.COMMAND.JOIN_ROOM]: (socket, data) => {
    socket.write(JSON.stringify({ type: commandType.JOIN_ROOM, data: data }));
  },

  [requestType.MESSAGE.CHANNEL_MESSAGE]: (socket, data) => {

          socket.write(
        JSON.stringify({
          type: requestType.MESSAGE.CHANNEL_MESSAGE,
          data,
        }),
      );
  },

  [requestType.LEAVE_ROOM] : (socket,data) => {
    socket.write(JSON.stringify({
      type: requestType.LEAVE_ROOM,
      data
    }))
  }
};

async function startCommandLoop(socket) {
  while (true) {
    process.stdout.write("\n");

    const prompt = clientState.inRoom
      ? `[${clientState.currentRoom}] Message: `
      : "Enter your command: ";

    const input = await waitForInput(prompt);
    if (input === null) continue; // state changed, re-evaluate prompt

    let isCommand = input.startsWith("/");
    
    let data;
    let request_type;
    if (isCommand) {
      const tokens = input.split(" ");
      if (tokens[0] === requestType.COMMAND.JOIN_ROOM) {
        data = tokens[1];
        request_type  = requestType.COMMAND.JOIN_ROOM;
      }

      else if (tokens[0] == requestType.LIST_ROOMS)
      {
        request_type = requestType.LIST_ROOMS;
      }

      else if (tokens[0] == requestType.LEAVE_ROOM && clientState.inRoom)
      {
        request_type = requestType.LEAVE_ROOM;
        data = clientState.currentRoom;

      }
    }

    else {
        if (clientState.inRoom)
        {
            request_type = requestType.MESSAGE.CHANNEL_MESSAGE;
            data = input;
        }
    }

    const handler = sendRequestHandler[request_type];
    if (handler) handler(socket, data);
    else console.log("Unknown command");
  }
}

async function handleResponse(response, socket) {
  switch (response.type) {
    case responseType.LOGIN_SUCCESS:
      console.log("Login successfully");

      startCommandLoop(socket);
      break;

    case responseType.LOGIN_FAILED:
      console.log("Login failed");
      break;

    case responseType.LIST_ROOMS:
      response.rooms.forEach((room) => process.stdout.write(`\r${room.room_name}\n`))
      break;

    case responseType.JOIN_ROOM_SUCCESS:
      clientState.inRoom = true;
      clientState.currentRoom = response.data.room_name;
      stateEvents.emit("stateChange");
      console.log(
        `you have joined room ${response.data.room_name} successfully`,
      );
      break;


    case responseType.LEAVE_ROOM:
      let left_room = clientState.currentRoom;
      clientState.inRoom = false;
      clientState.currentRoom = null;
      stateEvents.emit("stateChange");
      console.log(`You left ${left_room}`);
      break;

    case responseType.MESSAGE.CHANNEL_MESSAGE:
      await clearLine(0);
      await moveCursor(0, 0);
      process.stdout.write(
        `\r[${response.room_name}] > ${response.from}: ${response.data}\n`,
      );
      rl.prompt(true);
      break;

    default:
      console.log(response);
      break;
  }
}

function handleRoomsList(response) {
  console.log(response.data);
}

module.exports = { handleResponse, rl };
