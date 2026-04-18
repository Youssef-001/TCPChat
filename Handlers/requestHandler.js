const { commandType, requestType, responseType } = require("../constants");

const { RoomHandler } = require("./roomHandler");

const { UserHandler } = require("./userHandler");

const userHandler = new UserHandler();

const roomHandler = new RoomHandler();

const requestHandlers = {
  [requestType.LOGIN]: (socket, request) => {
    try {
      const user = userHandler.loginUser({
        username: request.username,
        password: request.password,
        socket,
      });
    } catch (err) {
      console.log(err.message);
      return;
    }
    socket.write(JSON.stringify({ type: responseType.LOGIN_SUCCESS }));
  },


  [requestType.COMMAND.LIST_ROOMS]: (socket, request) => {
      let rooms = roomHandler.getRooms();

    rooms = {'type': commandType.LIST_ROOMS, rooms: rooms};
      socket.write(JSON.stringify(rooms));


  }
};

function handleRequest(socket, request) {

    const handler = requestHandlers[request.type];

    if (handler) handler(socket, request);
    else {
        console.log("Unknown request type")
    }


}



module.exports = { handleRequest };
