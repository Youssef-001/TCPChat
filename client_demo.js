const net = require("node:net");
const readline = require('node:readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

    const clearLine = (dir) => {

        return new Promise((resolve,reject) => {
            process.stdout.clearLine(dir, () => {
                resolve();
            })

        })
    }

    const moveCursor = (dx, dy) => {
        return new Promise((resolve,reject) => {
            process.stdout.moveCursor(dx,dy, () => {
                resolve()
            })
        })
    }

const socket = net.createConnection({host: "127.0.0.1", port: 3009}, async() => {
    console.log("Connected to server.")

    const ask = async() => {
        const message = await rl.question("Send your message: ");
        await moveCursor(0, -1);
        await clearLine(0); 
        socket.write(message);
    }

    ask();

    socket.on('data', async(data) => {
        console.log();
        await moveCursor(0, -1);
        await clearLine(0);
        console.log(data.toString());
        ask();
    })
});



