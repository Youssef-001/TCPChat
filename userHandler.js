const {User} = require('./user');

function createUser(user)
{
    let new_user = new User(user.username, user.password);
    return new_user;
}

module.exports={createUser}