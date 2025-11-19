import React, { useState, useEffect } from "react";
import UserBookings from "../components/UserBookings";
import { getAllBookings } from "../services/api";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = () => {
    getAllBookings().then(setBookings);
  };

  return (
    <div className="app-center-container">
      <UserBookings bookings={bookings} fetchBookings={fetchBookings} />
    </div>
  );
}

export default BookingsPage;