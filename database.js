
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

function getUser(username, password)
{
    let user = users.users.find((user) => user.username === username && user.password === password);
    
    if (user) return user;
    else return null
}

module.exports = {getUser}