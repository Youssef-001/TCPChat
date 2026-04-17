
const { commandType, requestType, responseType } = require('../constants');

const {RoomHandler} = require('./roomHandler');

const {UserHandler} = require('./userHandler');

const userHandler = new UserHandler();


const roomHandler = new RoomHandler();

function handleRequest(socket, request)
{

    switch(request.type) 
    {
        case requestType.LOGIN:
            handleLogin(socket,request);
            break;
        case requestType.COMMAND.LIST_ROOMS:
            handleListRooms(socket,request);
            break;

    }

}

function handleLogin(socket, request)
{
          try {
            const user = userHandler.loginUser({
              username: request.username,
              password: request.password,
              socket,
            });
    
            if (user)
              socket.write(JSON.stringify({ type: responseType.LOGIN_SUCCESS }));
          } catch (err) {
            console.log("Login failed");
          }
}

function handleListRooms(socket, request)
{

    let rooms = roomHandler.getRooms();
    socket.write(JSON.stringify(rooms));

}

module.exports = {handleRequest};