import React from 'react';

function ProductItem({ product, onUpdateStatus, onDelete }) {
  return (
    <div className="card mb-3 shadow-none border">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h4 className="mb-1 fw-normal text-dark fs-5">{product.name}</h4>
          <p className="text-secondary mb-2 small">{product.description}</p>
          <div className="mb-1 small">
            <strong className="text-dark">Giá:</strong> {product.price}đ
          </div>
          <div className="text-secondary small">
            Trạng thái: {product.status}
          </div>
        </div>
        <div className="d-flex gap-2 align-items-center">
          {product.status === 'Còn hàng' ? (
            <button 
              className="btn btn-warning btn-sm px-3"
              onClick={() => onUpdateStatus(product.id, 'Hết hàng')}
            >
              Đánh dấu Hết hàng
            </button>
          ) : (
            <button 
              className="btn btn-warning btn-sm px-3"
              onClick={() => onUpdateStatus(product.id, 'Còn hàng')}
            >
              Đánh dấu Còn hàng
            </button>
          )}
          <button 
            className="btn btn-danger btn-sm px-3 shadow-sm"
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này?')) {
                onDelete(product.id);
              }
            }}
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default ProductItem;
