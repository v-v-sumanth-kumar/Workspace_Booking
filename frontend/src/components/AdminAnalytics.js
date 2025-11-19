import React, { useEffect, useState } from "react";
import { getAdminAnalytics } from "../services/api";

function AdminAnalytics() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    getAdminAnalytics().then(setAnalytics);
  }, []);

  return (
    <div className="admin-analytics-container">
      <h3>Admin Analytics</h3>
      <table className="admin-analytics-table">
        <thead>
          <tr>
            <th>Room</th>
            <th>Total Hours Booked</th>
            <th>Total Revenue (₹)</th>
          </tr>
        </thead>
        <tbody>
          {analytics.map((item) => (
            <tr key={item.roomId}>
              <td>{item.roomName}</td>
              <td>{item.totalHours}</td>
              <td>{item.totalRevenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminAnalytics;
