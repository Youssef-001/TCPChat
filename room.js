class Room {
    constructor(room_id, room_name, current_users) {
        this.room_id = room_id;
        this.room_name = room_name;
        this.current_users = null;
    }

    user_join(){}
    user_leave(){}
}

module.exports = {Room}