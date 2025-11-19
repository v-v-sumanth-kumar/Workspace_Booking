const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export async function getRooms() {
  const res = await fetch(`${BASE_URL}/rooms`);
  return res.json();
}


export async function createBooking(booking) {
  const res = await fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to create booking');
  }
  return data;
}

export async function getAdminAnalytics() {
  const res = await fetch(`${BASE_URL}/analytics`);
  return res.json();
}

export async function cancelBooking(bookingId) {
  const res = await fetch(`${BASE_URL}/bookings/${bookingId}/cancel`, {
    method: "POST"
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to cancel booking');
  }
  return res.json();
}
// api.js

export async function getAllBookings() {
  const res = await fetch(`${BASE_URL}/bookings`);  // Your API endpoint returning all bookings
  if (!res.ok) {
    throw new Error('Failed to fetch bookings');
  }
  return res.json();
}

