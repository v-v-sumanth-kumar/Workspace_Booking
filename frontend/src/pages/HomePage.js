import React, { useState, useEffect } from "react";
import BookingForm from "../components/BookingForm";
import { getRooms } from "../services/api";

function HomePage() {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);


  useEffect(() => {
    getRooms().then(setRooms);
  }, []);

  return (
    <div className="app-center-container">
      <BookingForm
        selectedRoom={selectedRoom}
        rooms={rooms}
        onSelectRoom={setSelectedRoom}

      />
    </div>
  );
}

export default HomePage;
