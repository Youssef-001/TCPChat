class User {
    constructor(username, password)
    {
        this.username = username;
        this.password = password;
        this.currentSocket = null;
    }

    send_message(){};
    join_room(){};
    leave_room(){};
    create_room(){};
}

module.exports={User}