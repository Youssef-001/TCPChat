class Room {
    constructor(room_id, room_name, current_users) {
        this.room_id = room_id;
        this.room_name = room_name;
        this.current_users = [];
    }

    user_join(user){
        this.current_users.push(user);
        return this.current_users
    }
    user_leave(){}
}

module.exports = {Room}