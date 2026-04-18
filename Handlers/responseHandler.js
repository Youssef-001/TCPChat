const { commandType, requestType, responseType } = require('../constants');
const readline = require("node:readline/promises");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


const commandHandlers = {
    [commandType.LIST_ROOMS]: (socket, data) => {
        socket.write(JSON.stringify({ type: commandType.LIST_ROOMS }));
        return;
    },

    [commandType.JOIN_ROOM] : (socket, data) => {
        socket.write((JSON.stringify({type: commandType.JOIN_ROOM, data: data})))
    }



    
}


async function startCommandLoop(socket) {
    while(true){
       process.stdout.write("\n");
        const input = await rl.question("Enter your command: ");
        const tokens = input.split(' ');

        let data;
        if (tokens[0] === '/join')
            data = tokens[1];
            const handler = commandHandlers[tokens[0]]
            if (handler)
                handler(socket, data);
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