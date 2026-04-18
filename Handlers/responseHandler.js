const { commandType, requestType, responseType } = require("../constants");
const readline = require("node:readline/promises");

const EventEmitter = require("events");
const stateEvents = new EventEmitter();

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
        let resolved = false;

        const onStateChange = () => {
            if (resolved) return;
            resolved = true;
            rl.write('\n');
            resolve(null);
        };

        stateEvents.once('stateChange', onStateChange);

        rl.question(prompt).then((input) => {
            if (resolved) return;
            resolved = true;
            stateEvents.removeListener('stateChange', onStateChange);
            resolve(input);
        });
    });
}

const commandHandlers = {
  [commandType.LIST_ROOMS]: (socket, data) => {
    socket.write(JSON.stringify({ type: commandType.LIST_ROOMS }));
    return;
  },

  [commandType.JOIN_ROOM]: (socket, data) => {
    socket.write(JSON.stringify({ type: commandType.JOIN_ROOM, data: data }));
  },
};

async function startCommandLoop(socket) {
  while (true) {
    process.stdout.write("\n");

    const prompt = clientState.inRoom
      ? `[${clientState.currentRoom}] Message: `
      : "Enter your command: ";

    const input = await waitForInput(prompt);
    if (input === null) continue; // state changed, re-evaluate prompt

    if (clientState.inRoom && !input.startsWith("/")) {
      socket.write(
        JSON.stringify({
          type: requestType.MESSAGE.CHANNEL_MESSAGE,
          data: input,
        }),
      );
      continue;
    }

    const tokens = input.split(" ");
    let data;
    if (tokens[0] === "/join") data = tokens[1];

    const handler = commandHandlers[tokens[0]];
    if (handler) handler(socket, data);
    else console.log("Unknown command");
  }
}

function handleResponse(response, socket) {
  switch (response.type) {
    case responseType.LOGIN_SUCCESS:
      console.log("Login successfully");

      startCommandLoop(socket);
      break;

    case responseType.LOGIN_FAILED:
      console.log("Login failed");
      break;

    case responseType.ROOMS_LIST:
      handleResponse();
      break;

    case responseType.JOIN_ROOM_SUCCESS:
      clientState.inRoom = true;
      clientState.currentRoom = response.data.room_name;
      stateEvents.emit('stateChange');
      console.log(
        `you have joined room ${response.data.room_name} successfully`,
      );
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
