const { commandType, requestType, responseType } = require('../constants');
const readline = require("node:readline/promises");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


async function startCommandLoop(socket) {
        const input = await rl.question("Enter your command: ");
        const request = {};

        switch (input) {

            case commandType.LIST_ROOMS:
                request.type = commandType.LIST_ROOMS;

        }
        socket.write(JSON.stringify(request));
    
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
            handleResponse()
            break;
        
        default: 
            console.log(response);
            break;
        }
    }
    
    function handleRoomsList(response)
    {
    console.log(response.data);

}

module.exports = {handleResponse, rl}