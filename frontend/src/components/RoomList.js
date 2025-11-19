import React, { useState, useEffect } from "react";
import { getRooms } from "../services/api";

function RoomList({ onSelectRoom }) {
  const [rooms, setRooms] = useState([]);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    getRooms().then(setRooms);
  }, []);

  const handleChange = (e) => {
    const roomId = e.target.value;
    setSelectedId(roomId);
    const room = rooms.find(r => String(r.id) === String(roomId));
    if (room && onSelectRoom) {
      onSelectRoom(room);
    }
  };

  return (
    <select value={selectedId} onChange={handleChange}>
      <option value="">Select a room</option>
      {rooms.length === 0 ? (
        <option>No rooms available</option>
      ) : (
        rooms.map(room => (
          <option key={room.id} value={room.id}>{room.name}</option>
        ))
      )}
    </select>
  );
}

export default RoomList
