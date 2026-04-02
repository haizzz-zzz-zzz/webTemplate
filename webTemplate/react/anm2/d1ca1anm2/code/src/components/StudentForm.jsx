import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';

function StudentForm({ initialData, onSave, onCancel }) {
  const isEditing = !!initialData;
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    fullName: initialData?.fullName || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    major: initialData?.major || '',
    gender: initialData?.gender || ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Xoá lỗi sau khi gõ
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    let isValid = true;
    let newErrors = {};

    // Validate using pure JS/State to work better with React, but we can also use jQuery if strictly needed.
    // However, basic validation is requested, here we implement it manually or via HTML5.
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Họ và tên không được để trống.';
      isValid = false;
    }

    if (!formData.id.match(/^SV\d{3,}$/)) {
      newErrors.id = 'Mã sinh viên không hợp lệ (VD: SV001).';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ.';
      isValid = false;
    }

    if (!formData.phone.match(/^\d{10,}$/)) {
      newErrors.phone = 'SĐT chỉ chấp nhận số, độ dài tối thiểu 10.';
      isValid = false;
    }

    if (!formData.major) {
      newErrors.major = 'Vui lòng chọn ngành học.';
      isValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div>
      <h5 className="mb-4 fw-bold">Đăng ký/Sửa thông tin Sinh viên</h5>
      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <label className="form-label text-muted small mb-1">Họ và tên</label>
            <input 
              type="text" 
              className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label text-muted small mb-1">Mã sinh viên</label>
            <input 
              type="text" 
              className={`form-control ${errors.id ? 'is-invalid' : ''}`}
              name="id"
              value={formData.id}
              onChange={handleChange}
              placeholder="VD: SV001"
              disabled={isEditing} // Không cho sửa MSSV khi Sửa
            />
            {errors.id && <div className="invalid-feedback">{errors.id}</div>}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 mb-3 mb-md-0">
            <label className="form-label text-muted small mb-1">Email</label>
            <input 
              type="email" 
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label text-muted small mb-1">Số điện thoại</label>
            <input 
              type="text" 
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <label className="form-label text-muted small mb-1">Ngành học</label>
            <select 
              className={`form-select ${errors.major ? 'is-invalid' : ''}`}
              name="major"
              value={formData.major}
              onChange={handleChange}
            >
              <option value="">Chọn ngành</option>
              <option value="IT">IT</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
            </select>
            {errors.major && <div className="invalid-feedback">{errors.major}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label text-muted small mb-1 d-block">Giới tính</label>
            <div className="form-check form-check-inline mt-2">
              <input 
                className={`form-check-input ${errors.gender ? 'is-invalid' : ''}`}
                type="radio" 
                name="gender" 
                id="genderMale" 
                value="Nam"
                checked={formData.gender === 'Nam'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="genderMale">Nam</label>
            </div>
            <div className="form-check form-check-inline mt-2">
              <input 
                className={`form-check-input ${errors.gender ? 'is-invalid' : ''}`}
                type="radio" 
                name="gender" 
                id="genderFemale" 
                value="Nữ"
                checked={formData.gender === 'Nữ'}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="genderFemale">Nữ</label>
            </div>
            {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
          </div>
        </div>

        <div>
          <button type="submit" className="btn btn-primary px-4 me-2">Lưu thông tin</button>
          <button type="button" className="btn btn-secondary px-4" onClick={onCancel}>Hủy</button>
        </div>
      </form>
    </div>
  );
}

export default StudentForm;
