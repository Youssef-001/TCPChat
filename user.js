class User {
    constructor(username, password)
    {
        this.username = username;
        this.password = password;
        this.socket = null;
    }

    attach(socket)
    {
        this.socket=socket;
    }
    send_message(){};
    join_room(){};
    leave_room(){};
    create_room(){};
}

module.exports={User}