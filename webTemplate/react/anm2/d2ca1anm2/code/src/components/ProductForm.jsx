import React, { useState } from 'react';

function ProductForm({ onAddProduct }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('Còn hàng');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !price.trim()) {
      setError('Các trường thông tin không được để trống.');
      return;
    }
    if (name.length > 30) {
      setError('Tên sản phẩm không quá 30 kí tự.');
      return;
    }
    if (Number(price) < 0) {
      setError('Giá sản phẩm không được là số âm.');
      return;
    }

    onAddProduct({
      id: Date.now().toString(),
      name,
      description,
      price: Number(price),
      status
    });

    setName('');
    setDescription('');
    setPrice('');
    setStatus('Còn hàng');
    setError('');
  };

  return (
    <div className="card mb-4 border">
      <div className="card-header text-white px-3 py-2 bg-success">
        <h5 className="mb-0 fs-6">Thêm Sản Phẩm Mới</h5>
      </div>
      <div className="card-body">
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-secondary fw-medium">Tên Sản Phẩm</label>
            <input 
              type="text" 
              className="form-control" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên sản phẩm"
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary fw-medium">Mô Tả</label>
            <textarea 
              className="form-control" 
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả sản phẩm"
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label text-secondary fw-medium">Giá</label>
            <input 
              type="number" 
              className="form-control" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Nhập giá sản phẩm"
            />
          </div>
          <div className="mb-4">
            <label className="form-label text-secondary fw-medium">Trạng Thái</label>
            <select 
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100 fw-medium">
            Thêm Sản Phẩm
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
