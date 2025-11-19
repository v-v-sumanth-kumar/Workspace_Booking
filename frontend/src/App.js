import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookingsPage from "./pages/BookingsPage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="app-center-container">
        <Link to="/">Home</Link> | <Link to="/bookings">Bookings</Link> | <Link to="/admin">Admin Analytics</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
