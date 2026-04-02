import React, { useState } from 'react';
import BookItem from './BookItem';

function BookList({ books, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter(b => 
    b.tenSach.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.maSach.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalBooks = filteredBooks.length;
  
  const categories = {};
  filteredBooks.forEach(b => {
    categories[b.theLoai] = (categories[b.theLoai] || 0) + 1;
  });

  return (
    <div>
      <h2 className="text-center mb-4 fw-bold">Quản lý thư viện</h2>
      
      <div className="mb-4">
        <label className="form-label fw-bold">Tìm kiếm theo tên hoặc mã sách:</label>
        <input 
          type="text" 
          className="form-control px-3 py-2" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-light">
            <tr>
              <th className="py-3">Mã sách</th>
              <th className="py-3">Tên sách</th>
              <th className="py-3">Tác giả</th>
              <th className="py-3">Thể loại</th>
              <th className="py-3">Năm</th>
              <th className="py-3">Số lượng</th>
              <th className="py-3">Người thêm</th>
              <th className="py-3">Ngày thêm</th>
              <th className="py-3 text-center" style={{ minWidth: '100px' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <BookItem 
                key={book.maSach} 
                book={book} 
                onEdit={() => onEdit(book)} 
                onDelete={() => onDelete(book.maSach)} 
              />
            ))}
            {filteredBooks.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4">Không tìm thấy sách phù hợp</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 lh-lg fw-bold" style={{ fontSize: '1.05rem', color: '#333' }}>
        <div className="mb-1">Tổng số sách: {totalBooks}</div>
        {Object.entries(categories).map(([category, count]) => (
          <div key={category}>{category}: {count}</div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
