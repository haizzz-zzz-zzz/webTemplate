import React, { useState } from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, onUpdateStatus, onDelete }) {
  const [sortBy, setSortBy] = useState('none');

  let sortedProducts = [...products];

  if (sortBy === 'price-asc') {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'status') {
    sortedProducts.sort((a, b) => a.status.localeCompare(b.status));
  }

  return (
    <div className="card border mb-5">
      <div className="card-header text-white d-flex justify-content-between align-items-center rounded-top bg-dark p-3">
        <h5 className="mb-0 fw-normal fs-6">Danh Sách Sản Phẩm</h5>
        {/* Tuỳ chọn Sort vẫn giữ vì yêu cầu đề bài, nhưng làm màu tối để lẫn vào nền */}
        <select 
          className="form-select form-select-sm w-auto bg-dark text-white border-secondary small"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="none">Sắp xếp: Mặc định</option>
          <option value="price-asc">Giá: Thấp đến cao</option>
          <option value="price-desc">Giá: Cao đến thấp</option>
          <option value="status">Trạng thái</option>
        </select>
      </div>
      <div className="card-body p-3 bg-white border-0 rounded-bottom">
        {sortedProducts.length === 0 ? (
          <p className="text-center text-secondary my-3">Chưa có sản phẩm nào.</p>
        ) : (
          sortedProducts.map(product => (
            <ProductItem 
              key={product.id} 
              product={product} 
              onUpdateStatus={onUpdateStatus}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;
