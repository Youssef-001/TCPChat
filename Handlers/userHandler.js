const {User} = require('../user');
const {getUsers} = require('../database')

class UserHandler {

    constructor()
    {
        this.users = [];
        this.loadUsers();
    }

    loadUsers()
    {
        let users = getUsers();
        users.forEach((user) => {
            let newUser = new User(user.username, user.password, null);
            this.users.push(newUser);
        })

    }

    getUser(username)
    {
        const user = this.users.find((user) => username === user.username);

        if (user) return user;
        else throw Error("User not found");
    }

authenticateUser(user) {
    const { username, password } = user;

    const auth_user = this.users.find(
        (u) => u.username === username && u.password === password
    );

    if (auth_user) return auth_user;
    else throw new Error("Invalid credentials");
}

    loginUser(user)
    {

   
      
            let find_user = this.authenticateUser(user)

            if (find_user) {
                this.users.map((us) => {
                    if (us === find_user) us.attach(user.socket);
                })

            }

            return user;
        
    

    

    // createUser(){}

        }
}

module.exports = {UserHandler};