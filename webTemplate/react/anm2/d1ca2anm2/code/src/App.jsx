import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import AddBooking from './components/AddBooking';
import BookingList from './components/BookingList';

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 shadow-sm">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold mb-0 h1">Quản lý Đặt phòng Khách sạn</span>
        <div className="ms-auto d-flex gap-2">
          <Link to="/add" className={`btn ${location.pathname === '/add' ? 'btn-primary' : 'btn-outline-primary'}`}>
            Thêm đặt phòng
          </Link>
          <Link to="/" className={`btn ${location.pathname === '/' ? 'btn-primary' : 'btn-outline-primary'}`}>
            Quản lý đặt phòng
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="container" style={{ minHeight: '100vh', backgroundColor: '#f4f7f6', padding: '20px' }}>
        <div className="bg-white rounded p-4 shadow-sm">
          <Navigation />
          <Routes>
            <Route path="/add" element={<AddBooking />} />
            <Route path="/" element={<BookingList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
