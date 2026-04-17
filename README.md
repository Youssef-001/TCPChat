# TCPChat

A small TCP-based chat prototype built with Node.js. The project uses raw TCP sockets from Node's `net` module to implement a simple client/server chat workflow with login support and room listing.

## Overview

This project contains:

- A TCP server that listens for JSON requests on `127.0.0.1:3009`
- A command-line TCP client that connects to the server and prompts for user credentials
- In-memory user and room data stored in `database.js`
- Basic request handling for:
  - user login
  - listing available rooms

The codebase looks like an educational or early-stage networking project rather than a finished production chat app.

## Features

Current implemented behavior:

- User login over TCP using JSON messages
- In-memory authentication against predefined users
- Listing chat rooms with the `/rooms` command
- Simple separation of concerns using handlers for users, rooms, and requests

Partially implemented or planned behavior:

- Joining rooms
- Direct messaging
- Sending room messages
- Leaving rooms
- Creating rooms dynamically

## Project Structure

- [server.js](d:/Programming/node/networking/TCPChat/server.js) - Starts the TCP server and forwards incoming requests to the request handler
- [client.js](d:/Programming/node/networking/TCPChat/client.js) - CLI client that connects to the server, logs in, and sends commands
- [database.js](d:/Programming/node/networking/TCPChat/database.js) - In-memory users and rooms
- [constants.js](d:/Programming/node/networking/TCPChat/constants.js) - Shared request, command, and response constants
- [Handlers/requestHandler.js](d:/Programming/node/networking/TCPChat/Handlers/requestHandler.js) - Dispatches incoming request types
- [Handlers/userHandler.js](d:/Programming/node/networking/TCPChat/Handlers/userHandler.js) - User loading, lookup, and login behavior
- [Handlers/roomHandler.js](d:/Programming/node/networking/TCPChat/Handlers/roomHandler.js) - Room loading and room access helpers
- [user.js](d:/Programming/node/networking/TCPChat/user.js) - User model
- [room.js](d:/Programming/node/networking/TCPChat/room.js) - Room model
- [client_demo.js](d:/Programming/node/networking/TCPChat/client_demo.js) and [server_demo.js](d:/Programming/node/networking/TCPChat/server_demo.js) - Demo or experiment files

## Requirements

- Node.js 18+ recommended

This project currently uses only Node built-in modules, so there is no `package.json` or external dependency installation step.

## How To Run

Start the server in one terminal:

```powershell
node server.js
```

Start the client in another terminal:

```powershell
node client.js
```

The server will listen on:

```text
127.0.0.1:3009
```

## Default Test Users

Defined in [database.js](d:/Programming/node/networking/TCPChat/database.js):

- Username: `yusef0x1` Password: `1234`
- Username: `ahmed0x1` Password: `12345`

## Default Rooms

Also defined in [database.js](d:/Programming/node/networking/TCPChat/database.js):

- `room1`
- `room2`

## Client Flow

1. Run `node client.js`
2. Enter a username
3. Enter a password
4. On successful login, enter a command
5. The currently supported command is `/rooms`

Example request sent by the client:

```json
{ "type": "login", "username": "yusef0x1", "password": "1234" }
```

Example room-list command:

```json
{ "type": "/rooms" }
```

## Protocol Notes

The app exchanges JSON over raw TCP sockets.

Current request types come from [constants.js](d:/Programming/node/networking/TCPChat/constants.js):

- `login`
- `/rooms`
- `/join`
- `/dm`

Only `login` and `/rooms` are currently wired into request handling.

## Known Limitations

A few things are still incomplete or rough around the edges:

- Room join/leave and direct message functionality are declared but not implemented
- Data is stored only in memory, so nothing persists between runs
- Some model methods are placeholders
- There is no message framing beyond direct JSON parsing from socket data
- Error handling and validation are minimal
- There is no automated test suite yet
- There is no `package.json` with scripts for running the app

## Suggested Next Improvements

- Add `package.json` with `start`, `server`, and `client` scripts
- Implement `/join` and message broadcasting inside rooms
- Add proper request/response schemas and validation
- Improve login failure responses and error reporting
- Add tests for handlers and protocol behavior
- Persist users and rooms to a file or database

## Learning Goals

This project is a good base for practicing:

- TCP networking with Node.js
- Client/server architecture
- Request routing and handler patterns
- Simple chat protocol design
- State management for users and rooms

## License

No license file is currently included in the repository.
