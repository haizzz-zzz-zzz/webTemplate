import React, { useState, useEffect } from 'react';

export default function EmployeeModal({ show, employee, onClose, onSave }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', position: '', gender: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (show) {
      if (employee) {
        setFormData(employee);
      } else {
        setFormData({ name: '', email: '', phone: '', position: '', gender: '' });
      }
      setErrors({});
    }
  }, [show, employee]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ tên';
    } else if (formData.name.length > 30) {
      newErrors.name = 'Họ tên không được vượt quá 30 ký tự';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không đúng định dạng';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại phải bao gồm đúng 10 chữ số';
    }

    if (!formData.position) {
      newErrors.position = 'Vui lòng chọn vị trí';
    }

    if (!formData.gender) {
      newErrors.gender = 'Vui lòng chọn giới tính';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(formData);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
          <div className="modal-content border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">{employee ? 'Sửa thông tin nhân sự' : 'Thêm nhân sự mới'}</h5>
              <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Họ tên</label>
                    <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Số điện thoại</label>
                    <input type="text" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} name="phone" value={formData.phone} onChange={handleChange} />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Vị trí</label>
                    <select className={`form-select ${errors.position ? 'is-invalid' : ''}`} name="position" value={formData.position} onChange={handleChange}>
                      <option value="">-- Chọn vị trí --</option>
                      <option value="Nhân viên">Nhân viên</option>
                      <option value="Quản lý">Quản lý</option>
                      <option value="Giám đốc">Giám đốc</option>
                    </select>
                    {errors.position && <div className="invalid-feedback">{errors.position}</div>}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label d-block">Giới tính</label>
                    <div className="form-check form-check-inline">
                      <input className={`form-check-input ${errors.gender ? 'is-invalid' : ''}`} type="radio" name="gender" id="genderMale" value="Nam" checked={formData.gender === 'Nam'} onChange={handleChange} />
                      <label className="form-check-label" htmlFor="genderMale">Nam</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className={`form-check-input ${errors.gender ? 'is-invalid' : ''}`} type="radio" name="gender" id="genderFemale" value="Nữ" checked={formData.gender === 'Nữ'} onChange={handleChange} />
                      <label className="form-check-label" htmlFor="genderFemale">Nữ</label>
                    </div>
                    {errors.gender && <div className="text-danger small mt-1">{errors.gender}</div>}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-success" onClick={handleSave}>Lưu</button>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>Hủy</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
