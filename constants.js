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
    LIST_ROOMS: '/rooms',
    LEAVE_ROOM: '/leave',
    DM_REQUEST: '/dm',
    LIST_ONLINE_USERS: '/users'

}

const responseType = {
    LOGIN_SUCCESS: 'Login sucessfully',
    LOGIN_FAILED: 'Login Failed',
    LIST_ROOMS: '/rooms',
    JOIN_ROOM_SUCCESS: "join_room_success",
    MESSAGE: messageType,
    ERROR: 'ERROR',
    LEAVE_ROOM: 'room_left_success',
    DIRECT_MESSAGE: 'direct_message',
    DM_REQUEST_SUCCESS: 'direct_message_request_success',
    USERS_LIST: 'users_list'
}

module.exports = { commandType, requestType, responseType };