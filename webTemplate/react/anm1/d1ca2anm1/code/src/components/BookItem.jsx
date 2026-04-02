import React from 'react';

function BookItem({ book, onEdit, onDelete }) {
  return (
    <tr>
      <td>{book.maSach}</td>
      <td>{book.tenSach}</td>
      <td>{book.tacGia}</td>
      <td>{book.theLoai}</td>
      <td>{book.nam}</td>
      <td>{book.soLuong}</td>
      <td>{book.nguoiThem}</td>
      <td>{book.ngayThem}</td>
      <td>
        <button 
          className="btn btn-primary btn-sm d-block w-100 mb-2 py-1" 
          style={{ backgroundColor: '#2196F3', borderColor: '#2196F3' }}
          onClick={onEdit}
        >
          Sửa
        </button>
        <button 
          className="btn btn-danger btn-sm d-block w-100 py-1" 
          style={{ backgroundColor: '#F44336', borderColor: '#F44336' }}
          onClick={onDelete}
        >
          Xoá
        </button>
      </td>
    </tr>
  );
}

export default BookItem;
