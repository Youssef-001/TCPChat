const { Room } = require("./room");

class RoomHandler {
  constructor() {
    this.rooms = [];
  }

  loadRooms(rooms)
  {
    rooms.map((room) => {
        let newRoom = new Room(room.room_id, room.room_name, room.current_users);
        this.rooms.push(newRoom);
    })
  }

  createRoom(room_name) {

    const id = crypto.randomUUID();

    let newRoom = new Room(id, room_name, []);
    this.rooms.push(newRoom);
  }

  joinRoom(rooms, room_name, user) {}

  findRoom(room_name) {}

  leaveRoom(rooms, room_name, user) {}
}


module.exports = {RoomHandler}