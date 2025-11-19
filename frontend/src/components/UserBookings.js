import React from "react";
import { cancelBooking } from "../services/api";
import { showSuccess, showError } from "../utils/alerts";

function UserBookings({ bookings, fetchBookings }) {

  const handleCancel = async (id) => {
    try {
      await cancelBooking(id);
      showSuccess("Booking cancelled successfully!");
      fetchBookings();
    } catch (err) {
      showError("Failed to cancel: " + err.message);
    }
  };

  return (
    <div className="user-bookings-container">
      <h3>Your Bookings</h3>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map(b => (
            <li key={b.id}>
              Room: <b>{b.room?.name || 'Unknown Room'}</b>, 
              From: {new Date(b.startTime).toLocaleString()},
              To: {new Date(b.endTime).toLocaleString()}
              {b.status === 'CANCELLED' ? (
                <span style={{color: 'red', fontWeight: 'bold'}}> [CANCELLED]</span>
              ) : new Date(b.startTime) <= new Date() ? (
                <span style={{color: 'gray'}}> [COMPLETED]</span>
              ) : (
                <button className="cancel-btn" onClick={() => handleCancel(b.id)}>
                  Cancel
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default UserBookings;
