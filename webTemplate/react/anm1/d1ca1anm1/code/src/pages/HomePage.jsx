import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Summary from '../components/Summary';
import StudentForm from '../components/StudentForm';

function HomePage() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);

    useEffect(() => {
        const localData = localStorage.getItem("students");
        if (localData) {
            setStudents(JSON.parse(localData));
        } else {
            // Lazy load the initial data to avoid synchronous block if file is large,
            // but standard import is fine. Using dynamic import since we put data in assets
            import('../data.js').then((module) => {
                setStudents(module.initialData);
                localStorage.setItem("students", JSON.stringify(module.initialData));
            });
        }
    }, []);

    const handleSaveLocal = (data) => {
        setStudents(data);
        localStorage.setItem("students", JSON.stringify(data));
    };

    const handleOpenModal = (student = null) => {
        setSelectedStudent(student);
        if (window.bootstrap && window.bootstrap.Modal) {
            const modalEl = document.getElementById('studentModal');
            let modal = window.bootstrap.Modal.getInstance(modalEl);
            if (!modal) {
                modal = new window.bootstrap.Modal(modalEl);
            }
            modal.show();
        } else if (window.jQuery) {
            window.jQuery('#studentModal').modal('show');
        }
    };

    const handleCloseModal = () => {
        if (window.bootstrap && window.bootstrap.Modal) {
            const modalEl = document.getElementById('studentModal');
            const modal = window.bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        } else if (window.jQuery) {
            window.jQuery('#studentModal').modal('hide');
        }
    };

    const handleSaveStudent = (formData, isEditing) => {
        let updatedStudents;
        if (isEditing) {
            updatedStudents = students.map(s => s.id === formData.id ? { ...formData } : s);
        } else {
            const exists = students.find(s => s.id === formData.id);
            if (exists) {
                return "Mã sinh viên đã tồn tại!";
            }
            updatedStudents = [...students, { ...formData }];
        }
        handleSaveLocal(updatedStudents);
        handleCloseModal();
        return null;
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xoá sinh viên này không?")) {
            const updated = students.filter(s => s.id !== id);
            handleSaveLocal(updated);
        }
    };

    const totalStudents = students.length;
    const avgGPA = totalStudents > 0
        ? (students.reduce((acc, curr) => acc + parseFloat(curr.gpa), 0) / totalStudents).toFixed(2)
        : "0.00";

    return (
        <div style={{ padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="container" style={{
                background: '#fff',
                border: '2px solid #e0c8ff',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
            }}>
                <Header />
                <Summary total={totalStudents} avg={avgGPA} />

                <div className="d-flex justify-content-end mb-3">
                    <button
                        className="btn btn-success text-white px-4 fw-bold rounded-pill shadow-sm"
                        style={{ background: '#28a745', border: 'none' }}
                        onClick={() => handleOpenModal()}
                    >
                        THÊM SINH VIÊN
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle mb-0 text-center" style={{ border: '1px solid #dee2e6' }}>
                        <thead>
                            <tr style={{ background: '#6f42c1', color: 'white' }}>
                                <th style={{ background: '#6f42c1', color: 'white' }}>#</th>
                                <th style={{ background: '#6f42c1', color: 'white' }}>MÃ SV</th>
                                <th style={{ background: '#6f42c1', color: 'white' }}>HỌ VÀ TÊN</th>
                                <th style={{ background: '#6f42c1', color: 'white' }}>NGÀY SINH</th>
                                <th style={{ background: '#6f42c1', color: 'white' }}>LỚP</th>
                                <th style={{ background: '#6f42c1', color: 'white' }}>ĐTB</th>
                                <th style={{ background: '#6f42c1', color: 'white' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.length > 0 ? students.map((s, idx) => (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td className="fw-bold">{s.id}</td>
                                    <td className="text-start">{s.name}</td>
                                    <td>{s.dob ? s.dob.split('-').reverse().join('/') : ''}</td>
                                    <td>{s.class}</td>
                                    <td>{parseFloat(s.gpa).toFixed(1)}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm text-white px-3 me-2"
                                            style={{ background: '#17a2b8', borderRadius: '8px' }}
                                            onClick={() => handleOpenModal(s)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="btn btn-sm text-white px-3"
                                            style={{ background: '#dc3545', borderRadius: '8px' }}
                                            onClick={() => handleDelete(s.id)}
                                        >
                                            Xoá
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan="7" className="text-center py-4">Chưa có sinh viên nào.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <StudentForm
                    selectedStudent={selectedStudent}
                    onSave={handleSaveStudent}
                    onClose={handleCloseModal}
                />
            </div>
        </div>
    );
}

export default HomePage;
