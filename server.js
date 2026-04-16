const net = require("node:net")

const readline = require('node:readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const server = net.createServer();