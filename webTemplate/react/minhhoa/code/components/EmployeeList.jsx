import React from 'react';
import EmployeeItem from './EmployeeItem';

export default function EmployeeList({ employees, onAddClick, onEditClick, onDeleteClick }) {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh sách nhân sự</h2>
        <button className="btn btn-primary" onClick={onAddClick}>+ Thêm mới</button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Vị trí</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <EmployeeItem
                key={emp.id}
                emp={emp}
                index={index}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
