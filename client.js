const net = require("node:net");
const readline = require('node:readline/promises');
const {getUser} = require('./database.js')

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


async function user_login() {
    const username = await rl.question("Please enter your username: ");
    const password = await rl.question("Please enter your password: ");
    // return `Username: ${username}, password: ${password}`;
    return {'Username': username, 'Password': password};
}


const socket = net.createConnection({host: "127.0.0.1", port: 3009}, async() => {
    console.log("Connected to server.")

  let credentials = await user_login();
//   console.log(credentials);
  socket.write(JSON.stringify({type: 'login', ...credentials}));

});



