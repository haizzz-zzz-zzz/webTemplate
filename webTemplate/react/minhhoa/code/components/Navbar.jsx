import React, { useState } from 'react';

export default function Navbar({ onSearch }) {
  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    onSearch(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(keyword);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold" href="#">Quản lý nhân sự</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white" href="#">Trang chủ</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-secondary" href="#">Liên hệ</a>
            </li>
          </ul>
          <form className="d-flex" onSubmit={handleSubmit}>
            <input className="form-control me-2" type="search" placeholder="Tìm kiếm..." aria-label="Search" value={keyword} onChange={handleChange} />
            <button className="btn btn-outline-light" type="submit">Tìm</button>
          </form>
        </div>
      </div>
    </nav>
  );
}
