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

const responseType = {
    LOGIN_SUCCESS: 'Login sucessfully',
    LOGIN_FAILED: 'Login Failed'
}

module.exports = { commandType, requestType, responseType };