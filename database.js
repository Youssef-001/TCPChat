
let users = {
    'users': [
        {
            id: '4328',
            username: 'yusef0x1',
            password: '1234'
        },
        {
            id: '8273',
            username: 'ahmed0x1',
            password: '12345'
        }
    ]
}



let rooms = {
    'rooms': [
        {
            room_id: '32456',
            room_name: 'room1',
            current_users: null
        },
        {
            room_id: '12752',
            room_name: 'room2',
            current_users: null
        }
    ]
}


function getUser(username, password)
{
    let user = users.users.find((user) => user.username === username && user.password === password);
    
    if (user) return user;
    else return null
}

function getRooms()
{
    return rooms.rooms;
}



module.exports = {getUser, getRooms}