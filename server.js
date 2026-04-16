const net = require("node:net")

const readline = require('node:readline');

const {parseCredentials} = require("./utils.js")

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const server = net.createServer();

 function user_login()
{
    rl.question("Please enter your username: ", (username) => {
        rl.question("Please enter your password: ", (password) => {
            console.log(`Username: ${username}, password: ${password}`);
        })
    });
}


server.on('connection', (socket) => {

    socket.on('data', (data) => {
        // console.log(data.toString())
        console.log(JSON.parse(data.toString()));
    })
})


server.listen(3009, "127.0.0.1", () => {
    console.log("Server running on: ", server.address())
})
