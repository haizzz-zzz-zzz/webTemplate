import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveBooking, getBookingById } from '../utils/storage';
import $ from 'jquery';

function AddBooking() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    customerName: '',
    phone: '',
    roomType: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    promoCode: '',
    confirmPromo: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state && location.state.editId) {
      const booking = getBookingById(location.state.editId);
      if (booking) {
        setFormData(booking);
        setIsEdit(true);
      }
    }
  }, [location]);

  const validate = () => {
    let newErrors = {};
    const idRegex = /^PH\d{6}$/;
    if (!idRegex.test(formData.id)) newErrors.id = 'Mã đặt phòng phải là PH + 6 chữ số';

    const nameRegex = /^[a-zA-Z0-9\s]{2,50}$/;
    // Adjusting regex for Vietnamese characters
    const nameRegexVN = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s0-9]{2,50}$/;
    if (!nameRegexVN.test(formData.customerName)) newErrors.customerName = 'Họ tên 2-50 ký tự, chỉ chữ/số/khoảng trắng';

    const phoneRegex = /^0\d{9}$/;
    if (!phoneRegex.test(formData.phone)) newErrors.phone = '10 số, bắt đầu bằng số 0';

    if (!formData.roomType) newErrors.roomType = 'Vui lòng chọn loại phòng';

    const today = new Date();
    today.setHours(0,0,0,0);
    const checkInDate = new Date(formData.checkIn);
    
    if (!formData.checkIn) {
      newErrors.checkIn = 'Vui lòng chọn ngày nhận phòng';
    } 

    if (!formData.checkOut) {
      newErrors.checkOut = 'Vui lòng chọn ngày trả phòng';
    } else if (formData.checkIn) {
      const checkOutDate = new Date(formData.checkOut);
      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 1) {
        newErrors.checkOut = 'Sau Check-in ít nhất 1 ngày';
      } else if (diffDays > 30) {
        newErrors.checkOut = 'Không vượt quá 30 ngày';
      }
    }

    if (formData.adults < 1 || formData.adults > 4) newErrors.adults = '1-4 người lớn';
    if (formData.children < 0 || formData.children > 6) newErrors.children = '0-6 trẻ em';

    if (formData.promoCode && formData.promoCode !== 'SAVE20%') {
       newErrors.promoCode = 'Promo Code format: SAVE20%';
    }

    if (formData.promoCode !== formData.confirmPromo) {
      newErrors.confirmPromo = 'Mã xác nhận không khớp';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const showToast = (message, type = 'success') => {
    const toastHtml = `
      <div class="toast align-items-center text-white bg-${type === 'success' ? 'success' : 'danger'} border-0" role="alert" aria-live="assertive" aria-atomic="true" id="liveToast">
        <div class="d-flex">
          <div class="toast-body">
            ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
    $('#toast-container').html(toastHtml);
    // Dynamic import bootstrap toast to show
    import('bootstrap').then((bootstrap) => {
       const toastEl = document.getElementById('liveToast');
       const toast = new bootstrap.Toast(toastEl);
       toast.show();
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      saveBooking(formData);
      showToast(isEdit ? 'Cập nhật đặt phòng thành công!' : `Đặt phòng ${formData.id} thành công!`, 'success');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      showToast('Vui lòng kiểm tra lại thông tin!', 'danger');
    }
  };

  const handleReset = () => {
    setFormData({
      id: '', customerName: '', phone: '', roomType: '',
      checkIn: '', checkOut: '', adults: 1, children: 0,
      promoCode: '', confirmPromo: ''
    });
    setErrors({});
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-white">
        <h4 className="mb-0">Thêm / Cập nhật đặt phòng</h4>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          
          {/* Thông tin cơ bản */}
          <h5 className="mt-2 mb-3 text-secondary">Thông tin cơ bản</h5>
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label">Mã đặt phòng</label>
              <input type="text" name="id" className={`form-control ${errors.id ? 'is-invalid' : ''}`} value={formData.id} onChange={handleChange} disabled={isEdit} placeholder="PH123456" />
              <div className="invalid-feedback">{errors.id}</div>
              <small className="text-muted">PH + 6 chữ số</small>
            </div>
            <div className="col-md-3">
              <label className="form-label">Họ tên khách</label>
              <input type="text" name="customerName" className={`form-control ${errors.customerName ? 'is-invalid' : ''}`} value={formData.customerName} onChange={handleChange} placeholder="Nguyen Van A" />
              <div className="invalid-feedback">{errors.customerName}</div>
              <small className="text-muted">2-50 ký tự</small>
            </div>
            <div className="col-md-3">
              <label className="form-label">Số điện thoại</label>
              <input type="text" name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleChange} placeholder="0xxxxxxxxx" />
              <div className="invalid-feedback">{errors.phone}</div>
              <small className="text-muted">10 số, bắt đầu 0</small>
            </div>
            <div className="col-md-3">
              <label className="form-label">Loại phòng</label>
              <select name="roomType" className={`form-select ${errors.roomType ? 'is-invalid' : ''}`} value={formData.roomType} onChange={handleChange}>
                <option value="">Chọn loại phòng</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
                <option value="VIP">VIP</option>
              </select>
              <div className="invalid-feedback">{errors.roomType}</div>
            </div>
          </div>

          <hr />

          {/* Thời gian */}
          <h5 className="mt-4 mb-3 text-secondary">Thời gian</h5>
          <div className="row g-3 mb-4">
            <div className="col-md-3">
              <label className="form-label">Ngày nhận phòng</label>
              <input type="date" name="checkIn" className={`form-control ${errors.checkIn ? 'is-invalid' : ''}`} value={formData.checkIn} onChange={handleChange} />
              <div className="invalid-feedback">{errors.checkIn}</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Ngày trả phòng</label>
              <input type="date" name="checkOut" className={`form-control ${errors.checkOut ? 'is-invalid' : ''}`} value={formData.checkOut} onChange={handleChange} />
              <div className="invalid-feedback">{errors.checkOut}</div>
              <small className="text-muted">Ít nhất 1 ngày sau check-in, tối đa 30 ngày</small>
            </div>
            <div className="col-md-3">
              <label className="form-label">Số người lớn</label>
              <input type="number" name="adults" className={`form-control ${errors.adults ? 'is-invalid' : ''}`} value={formData.adults} onChange={handleChange} min="1" max="4" />
              <div className="invalid-feedback">{errors.adults}</div>
            </div>
            <div className="col-md-3">
              <label className="form-label">Số trẻ em</label>
              <input type="number" name="children" className={`form-control ${errors.children ? 'is-invalid' : ''}`} value={formData.children} onChange={handleChange} min="0" max="6" />
              <div className="invalid-feedback">{errors.children}</div>
            </div>
          </div>

          <hr />

          {/* Khuyến mãi */}
          <h5 className="mt-4 mb-3 text-secondary">Khuyến mãi</h5>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label">Mã khuyến mãi</label>
              <input type="text" name="promoCode" className={`form-control ${errors.promoCode ? 'is-invalid' : ''}`} value={formData.promoCode} onChange={handleChange} placeholder="SAVE20%" />
              <div className="invalid-feedback">{errors.promoCode}</div>
              <small className="text-muted">8 ký tự, format SAVE20%</small>
            </div>
            <div className="col-md-6">
              <label className="form-label">Xác nhận mã</label>
              <input type="text" name="confirmPromo" className={`form-control ${errors.confirmPromo ? 'is-invalid' : ''}`} value={formData.confirmPromo} onChange={handleChange} placeholder="Nhập lại mã" />
              <div className="invalid-feedback">{errors.confirmPromo}</div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">{isEdit ? 'Cập nhật đặt phòng' : 'Lưu đặt phòng'}</button>
            <button type="button" className="btn btn-light border" onClick={handleReset}>Làm mới</button>
          </div>
        </form>
      </div>
      
      {/* Toast container */}
      <div aria-live="polite" aria-atomic="true" className="position-relative">
        <div id="toast-container" className="toast-container position-fixed bottom-0 end-0 p-3" style={{zIndex: 11}}>
        </div>
      </div>
      
    </div>
  );
}

export default AddBooking;
