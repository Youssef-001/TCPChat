const net = require("node:net")

const readline = require('node:readline');

const {getUser} = require('./database.js')

const {parseCredentials} = require("./utils.js")

const {createUser} = require('./userHandler.js');
const { create } = require("node:domain");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let users = [];
let rooms = [];

const server = net.createServer();




server.on('connection', (socket) => {

    socket.on('data', (data) => {
        let request = JSON.parse(data.toString());
        if (request.type == 'login')
        {
            let user = getUser(request.username, request.password);
            if (user) 
            {
               let newUser = createUser(user);
               newUser.attach(socket);
               users.push(newUser);
               socket.write("Login successfully")
            }
        }
    })
})


server.listen(3009, "127.0.0.1", () => {
    console.log("Server running on: ", server.address())
})
