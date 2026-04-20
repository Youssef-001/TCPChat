const { commandType, requestType, responseType } = require("../constants");

const { RoomHandler } = require("./roomHandler");

const { UserHandler } = require("./userHandler");

const {get_last_n_messages} = require('./fileHandler')

const userHandler = new UserHandler();

const roomHandler = new RoomHandler();

const requestHandlers = {
  [requestType.LOGIN]: (socket, request) => {
    let user;
    try {
       user = userHandler.loginUser({
        username: request.username,
        password: request.password,
        socket,
      });
      socket.user = { ...user };
    } catch (err) {
      console.log(err.message);
      return;
    }
    socket.write(JSON.stringify({ type: responseType.LOGIN_SUCCESS, data: user.username }));
  },

  [requestType.LIST_ROOMS]: (socket, request) => {
    let rooms = roomHandler.getRooms();

    rooms = {
      type: requestType.LIST_ROOMS,
      rooms: roomHandler.serializeRooms(rooms),
    };
    socket.write(JSON.stringify(rooms));
  },

  [requestType.COMMAND.JOIN_ROOM]: async(socket, request) => {
    try {
      const room = roomHandler.findRoom(request.data);
      let user = socket.user;
      roomHandler.joinRoom(user, room);
// add chat history here.
      let messages = await get_last_n_messages(room.room_name, 20);
      let obj = {
        type: responseType.JOIN_ROOM_SUCCESS,
        data: { room_name: room.room_name,
          messages: messages
         },
      };
      socket.room = room;

      socket.write(JSON.stringify(obj));

      // console.log(room);
    } catch (err) {
      socket.write(
        JSON.stringify({
          type: responseType.ERROR,
          message: err.message,
        }),
      );
    }
  },

  [requestType.MESSAGE.CHANNEL_MESSAGE]: (socket, request) => {
    console.log(socket.room);
    roomHandler.broadcast_message(socket.room, {
      type: requestType.MESSAGE.CHANNEL_MESSAGE,
      from: socket.user.username,
      room_name: socket.room.room_name,
      data: request.data,
    });
    console.log(request);
  },

  [requestType.LEAVE_ROOM]: (socket, request) => {
    let user = socket.user;
    let room = socket.room;
    roomHandler.leaveRoom(user, room);

    socket.write(
      JSON.stringify({
        type: responseType.LEAVE_ROOM,
      }),
    );
  },

  [requestType.DM_REQUEST]: (socket, request) => {
    try {
      let destination_user = userHandler.getUser(request.data.username);

      socket.write(JSON.stringify({
        type: responseType.DM_REQUEST_SUCCESS,
        data: destination_user.username
      }))
      
    } catch (err) {
      socket.write(JSON.stringify({
        type: responseType.ERROR,
        message: err.message,
      }));
    }
  },

  [requestType.MESSAGE.DM_MESSAGE]: (socket,request) => {


    try {
      let destination_user = userHandler.getUser(request.data.username);
      userHandler.send_DM(socket.user, destination_user, request.data.message);


    }

    catch(err)
    {
      socket.write(JSON.stringify({
        type: responseType.ERROR,
        message: err.message,
      }));
    }

  }
};

function handleRequest(socket, request) {
  const handler = requestHandlers[request.type];

  if (handler) handler(socket, request);
  else {
    console.log("Unknown request type");
  }
}

module.exports = { handleRequest };
