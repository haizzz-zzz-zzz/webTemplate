import React from 'react';

export default function EmployeeItem({ emp, index, onEditClick, onDeleteClick }) {
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{emp.name}</td>
      <td>{emp.email}</td>
      <td>{emp.phone}</td>
      <td>{emp.position}</td>
      <td>
        <button className="btn btn-warning btn-sm me-2 text-white" onClick={() => onEditClick(emp)}>Sửa</button>
        <button className="btn btn-danger btn-sm" onClick={() => {
          if (window.confirm('Bạn có chắc chắn muốn xoá nhân viên này không?')) {
            onDeleteClick(emp.id);
          }
        }}>Xoá</button>
      </td>
    </tr>
  );
}
