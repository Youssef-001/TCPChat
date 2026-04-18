const { commandType, requestType, responseType } = require('../constants');
const readline = require("node:readline/promises");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const commandHandlers = {
    [commandType.LIST_ROOMS]: (socket) => {
        socket.write(JSON.stringify({ type: commandType.LIST_ROOMS }));
    },

    
}


async function startCommandLoop(socket) {
        const input = await rl.question("Enter your command: ");
        const tokens = input.split(' ');
        if (tokens.length == 1) {
            const handler = commandHandlers[input]
            if (handler)
                handler(socket);
            else
                console.log("Unknown command")



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