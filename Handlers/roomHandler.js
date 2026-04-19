const { Room } = require("../room");
const { getRooms } = require("../database");

class RoomHandler {
  constructor() {
    this.rooms = [];
    this.loadRooms(getRooms());
  }

  loadRooms(rooms) {
    rooms.map((room) => {
      let newRoom = new Room(room.room_id, room.room_name, room.current_users);
      this.rooms.push(newRoom);
    });
  }

  createRoom(room_name) {
    const id = crypto.randomUUID();

    let newRoom = new Room(id, room_name, []);
    this.rooms.push(newRoom);
  }

  joinRoom(user, room) {

    room.current_users.push(user);
    return room.current_users;
}

  leaveRoom(user, room) {

    room.current_users.splice(room.current_users.indexOf(user), 1)
    return room.current_users;
}


broadcast_message(room, payload)
{
      room.current_users.forEach((u) => {
      u.socket.write(
        JSON.stringify({
          ...payload
        }),
      );
    });
}

findRoom(room_name) {
    const room = this.rooms.find((room) => room.room_name === room_name);
    if (!room) throw new Error(`Room "${room_name}" not found`);
    return room;
}

  getRooms() {
    return this.rooms;
  }
  serializeRooms(rooms_list) {
   
   return rooms_list.map(({ room_id, room_name }) => ({ room_id, room_name }));
  
  }
}


module.exports = { RoomHandler };
