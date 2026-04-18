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
      socket.user = {...user};
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
  },

  [requestType.COMMAND.JOIN_ROOM]: (socket, request) => {


       try {
        const room = roomHandler.findRoom(request.data);
        let user = socket.user;
        roomHandler.joinRoom(user,room);

        let obj = {type: responseType.JOIN_ROOM_SUCCESS, data: {room_name: room.room_name}}
        socket.room = room;


        socket.write(JSON.stringify(obj));
        
        // console.log(room);
    } catch (err) {
        socket.write(JSON.stringify({ 
            type: responseType.ERROR, 
            message: err.message 
        }));
    }

    
  },

  [requestType.MESSAGE.CHANNEL_MESSAGE]: (socket,request) => {
    console.log(socket.room);
    socket.room.broadcast_message({
        type: requestType.MESSAGE.CHANNEL_MESSAGE,
        from: socket.user.username,
        room_name: socket.room.room_name,
        data: request.data,

    });
    console.log(request);
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
