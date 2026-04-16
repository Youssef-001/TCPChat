const net = require("node:net")

const readline = require('node:readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const server = net.createServer();

const clients = [];

server.on("connection", (socket) => {
    console.log("A new connection on the server")
const clientNumber = clients.length + 1;
console.log(socket);
    

    let curr = {
        'socket': socket,
        'clientNumber': clients.length+1
    }
    clients.push(curr);

    clients.map((client) => {
        client.socket.write(`User ${curr.clientNumber} has joined the chat! `)
    })
    
    socket.on('data', (data) => {


        // clients.map((sock2) => {
        //     if (sock2.socket == socket)
        //         clientNumber=sock2.clientNumber;
        // })

        clients.map((sock) => {

            let newData = Buffer.from(`> User ${clientNumber}: ${data.toString()}`)
            sock.socket.write(newData);
        })
    })

    console.log(clients.length)

    socket.on("error", (err) => {
    console.log(`User ${clientNumber} error: ${err.message}`);
});

socket.on("close", () => {
    clients.splice(clients.indexOf(curr), 1);
    console.log(`User ${clientNumber} disconnected. ${clients.length} remaining.`);

    clients.forEach((client) => {
        client.socket.write(`User ${clientNumber} has left the chat.`);
    });
});
})





server.listen(3009, "127.0.0.1", () => {
    console.log("Server running on: ", server.address())
})
