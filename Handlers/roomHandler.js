const { Room } = require("../room")
const {getRooms} = require('../database');

class RoomHandler {
  constructor() {
    this.rooms = [];
    this.loadRooms(getRooms());
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

  getRooms() {return this.rooms}
}


module.exports = {RoomHandler}