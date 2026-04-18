const commandType = {
    LIST_ROOMS: '/rooms',
    JOIN_ROOM: '/join',
    DIRECT_MESSAGE: '/dm',
}

const messageType = {
    CHANNEL_MESSAGE: 'Channel message',
    DM_MESSAGE: 'DM message'
}

const requestType = {
    LOGIN: 'login',
    MESSAGE: messageType,
    COMMAND: commandType,
}

const responseType = {
    LOGIN_SUCCESS: 'Login sucessfully',
    LOGIN_FAILED: 'Login Failed',
    ROOMS_LIST: 'Rooms List',
    JOIN_ROOM_SUCCESS: "join_room_success",
    ERROR: 'ERROR'
}

module.exports = { commandType, requestType, responseType };