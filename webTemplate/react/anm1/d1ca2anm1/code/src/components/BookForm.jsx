import React, { useState, useEffect } from 'react';

function BookForm({ editingBook, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    maSach: '',
    tenSach: '',
    tacGia: '',
    theLoai: '',
    nam: '',
    soLuong: '',
    nguoiThem: '',
    ngayThem: new Date().toLocaleDateString('vi-VN')
  });

  useEffect(() => {
    if (editingBook) {
      setFormData(editingBook);
    } else {
      setFormData({
        maSach: '',
        tenSach: '',
        tacGia: '',
        theLoai: '',
        nam: '',
        soLuong: '',
        nguoiThem: '',
        ngayThem: new Date().toLocaleDateString('vi-VN')
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.maSach || !formData.tenSach) {
      alert("Vui lòng điền mã sách và tên sách");
      return;
    }
    onSave(formData);
  };

  return (
    <div>
      <h2 className="text-center mb-5 fw-bold">{editingBook ? 'Sửa sách' : 'Thêm sách'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <label className="form-label fw-bold small">Mã sách:</label>
            <input 
              type="text" 
              className="form-control px-3 py-2" 
              name="maSach"
              value={formData.maSach}
              onChange={handleChange}
              disabled={!!editingBook}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold small">Tên sách:</label>
            <input 
              type="text" 
              className="form-control px-3 py-2" 
              name="tenSach"
              value={formData.tenSach}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <label className="form-label fw-bold small">Tác giả:</label>
            <input 
              type="text" 
              className="form-control px-3 py-2" 
              name="tacGia"
              value={formData.tacGia}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold small">Thể loại:</label>
            <select 
              className="form-select px-3 py-2"
              name="theLoai"
              value={formData.theLoai}
              onChange={handleChange}
            >
              <option value="">Chọn thể loại</option>
              <option value="Khoa học">Khoa học</option>
              <option value="Văn học">Văn học</option>
              <option value="Lịch sử">Lịch sử</option>
              <option value="Công nghệ">Công nghệ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <label className="form-label fw-bold small">Năm xuất bản:</label>
            <input 
              type="number" 
              className="form-control px-3 py-2" 
              name="nam"
              value={formData.nam}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold small">Số lượng:</label>
            <input 
              type="number" 
              className="form-control px-3 py-2" 
              name="soLuong"
              value={formData.soLuong}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6 mb-3 mb-md-0">
            <label className="form-label fw-bold small">Tên người thêm:</label>
            <input 
              type="text" 
              className="form-control px-3 py-2" 
              name="nguoiThem"
              value={formData.nguoiThem}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold small">Mã xác thực:</label>
            <input type="text" className="form-control px-3 py-2" />
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-md-6">
            <label className="form-label fw-bold small">Xác nhận mã:</label>
            <input type="text" className="form-control px-3 py-2" />
          </div>
        </div>

        <div className="d-flex gap-2">
          <button 
            type="submit" 
            className="btn btn-success flex-grow-1 text-white rounded-1 shadow-sm fw-bold"
            style={{ padding: '14px', backgroundColor: '#4CAF50', border: 'none', fontSize: '1.05rem' }}
          >
            {editingBook ? 'Cập nhật' : 'Thêm sách'}
          </button>
          
          {editingBook && (
            <button 
              type="button" 
              className="btn btn-secondary rounded-1 shadow-sm fw-bold"
              style={{ padding: '14px 24px', fontSize: '1.05rem' }}
              onClick={onCancel}
            >
              Hủy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm;
