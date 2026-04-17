const commandType = {
    LIST_ROOMS: '/rooms',
    JOIN_ROOM: '/join',
    DIRECT_MESSAGE: '/dm',
}

const requestType = {
    LOGIN: 'login',
    MESSAGE: 'message',
    COMMAND: commandType,
}

module.exports = { commandType, requestType };