import React from 'react';

function StudentList({ students, onEdit, onDelete }) {
  if (students.length === 0) {
    return <div className="text-center p-3 text-muted">Chưa có sinh viên nào.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <tbody>
          {students.map((student) => (
            <tr key={student.id} className="student-row">
              <td className="w-100">
                <div className="fw-bold mb-1" style={{ fontSize: '1.1rem' }}>{student.fullName}</div>
                <div className="text-muted small">
                  Mã SV: {student.id} | Email: {student.email} | SĐT: {student.phone}
                </div>
                <div className="text-muted small">
                  Ngành: {student.major} | Giới tính: {student.gender}
                </div>
              </td>
              <td className="text-end text-nowrap align-middle">
                <button 
                  className="btn btn-warning btn-sm mx-1 fw-bold px-3 text-white" 
                  onClick={() => onEdit(student)}
                >
                  Sửa
                </button>
                <button 
                  className="btn btn-danger btn-sm mx-1 fw-bold px-3" 
                  onClick={() => onDelete(student.id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center text-muted mt-3 small">
        Showing 1 to {students.length} of {students.length} entries
      </div>
    </div>
  );
}

export default StudentList;
