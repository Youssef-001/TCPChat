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
    LIST_ROOMS: '/rooms'
}

const responseType = {
    LOGIN_SUCCESS: 'Login sucessfully',
    LOGIN_FAILED: 'Login Failed',
    LIST_ROOMS: '/rooms',
    JOIN_ROOM_SUCCESS: "join_room_success",
    MESSAGE: messageType,
    ERROR: 'ERROR'
}

module.exports = { commandType, requestType, responseType };