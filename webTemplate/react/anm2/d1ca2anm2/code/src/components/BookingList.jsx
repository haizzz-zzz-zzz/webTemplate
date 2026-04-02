import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBookings, cancelBooking } from '../utils/storage';
import $ from 'jquery';

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    setBookings(getBookings());
  };

  const getPricePerNight = (roomType) => {
    switch (roomType) {
      case 'Standard': return 500000;
      case 'Deluxe': return 1000000;
      case 'Suite': return 2000000;
      case 'VIP': return 3000000;
      default: return 0;
    }
  };

  const calculateDays = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateRevenue = () => {
    let total = 0;
    bookings.forEach(b => {
      if (b.status !== 'Cancelled') {
        const days = calculateDays(b.checkIn, b.checkOut);
        let price = getPricePerNight(b.roomType) * days;
        if (b.promoCode === 'SAVE20%') {
          price *= 0.8;
        }
        total += price;
      }
    });
    return total;
  };

  const activeBookings = bookings.filter(b => b.status !== 'Cancelled').length;
  const availableRooms = 100 - activeBookings;
  const expectedRevenue = calculateRevenue();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBookings = bookings.filter(b => 
    b.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    navigate('/add', { state: { editId: id } });
  };

  const showToast = (message) => {
    const toastHtml = `
      <div class="toast align-items-center text-white bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" id="liveToast">
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
    $('#toast-container').html(toastHtml);
    import('bootstrap').then((bootstrap) => {
       const toastEl = document.getElementById('liveToast');
       const toast = new bootstrap.Toast(toastEl);
       toast.show();
    });
  };

  const handleCancel = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đặt phòng này?')) {
      if (cancelBooking(id)) {
        loadBookings();
        showToast('Hủy đặt phòng thành công!');
      }
    }
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white">
        <h4 className="mb-0">Danh sách đặt phòng</h4>
      </div>
      <div className="card-body">
        <div className="d-flex mb-4 gap-2">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Tìm mã đặt phòng hoặc tên khách" 
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn btn-light border" onClick={loadBookings}>Tải lại</button>
        </div>

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center border p-3 bg-light">
              <h4 className="mb-0">{bookings.length}</h4>
              <small className="text-muted">Tổng booking</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center border p-3 bg-light">
              <h4 className="mb-0">{availableRooms}</h4>
              <small className="text-muted">Phòng trống (ước tính)</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center border p-3 bg-light">
              <h4 className="mb-0">{expectedRevenue.toLocaleString('vi-VN')}</h4>
              <small className="text-muted">Doanh thu dự kiến (VNĐ)</small>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Mã</th>
                <th>Khách</th>
                <th>Phone</th>
                <th>Loại</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Người lớn/Trẻ em</th>
                <th>Promo</th>
                <th>Trạng thái</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? filteredBookings.map(b => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.customerName}</td>
                  <td>{b.phone}</td>
                  <td>{b.roomType}</td>
                  <td>{b.checkIn}</td>
                  <td>{b.checkOut}</td>
                  <td>{b.adults}/{b.children}</td>
                  <td>{b.promoCode}</td>
                  <td>
                    {b.status === 'Cancelled' ? (
                      <span className="badge bg-danger rounded-pill">Đã hủy</span>
                    ) : (
                      <span className="badge bg-success rounded-pill">Booked</span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => handleEdit(b.id)}>Sửa</button>
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => handleCancel(b.id)}
                      disabled={b.status === 'Cancelled'}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="10" className="text-center">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Toast container */}
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <div id="toast-container" className="toast-container position-fixed bottom-0 end-0 p-3" style={{zIndex: 11}}>
        </div>
      </div>
    </div>
  );
}

export default BookingList;
