const { commandType, requestType, responseType } = require('../constants');


async function commandLoop(socket)
{

    const command = await rl.question("Enter your command: ");

    if (command === "/rooms")
    {
        socket.write(JSON.stringify({type: requestType.COMMAND.LIST_ROOMS}));
    }
}


function handleResponse(response) {

    switch (response.type) {

        case responseType.LOGIN_SUCCESS:
            console.log("Login successfully");
            await commandLoop(socket);
            break;
        
        case responseType.LOGIN_FAILED:
            console.log("Login failed");
            break;
        
        case responseType.ROOMS_LIST:
            handleResponse(response)
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

module.exports = {handleResponse}