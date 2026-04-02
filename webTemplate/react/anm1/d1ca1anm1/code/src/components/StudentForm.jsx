import React, { useState, useEffect } from 'react';

function StudentForm({ selectedStudent, onSave, onClose }) {
    const [formData, setFormData] = useState({
        id: '', name: '', dob: '', class: '', gpa: '', email: '', password: '', confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    
    const isEditing = !!selectedStudent;

    useEffect(() => {
        if (selectedStudent) {
            setFormData({
                ...selectedStudent,
                confirmPassword: selectedStudent.password || ''
            });
        } else {
            setFormData({
                id: '', name: '', dob: '', class: '', gpa: '', email: '', password: '', confirmPassword: ''
            });
        }
        setErrors({});
    }, [selectedStudent]);

    const validate = () => {
        let isValid = true;
        let newErrors = {};

        const idRegex = /^SV\d{6}$/;
        if (!formData.id.trim()) {
            newErrors.id = "Vui lòng nhập Mã sinh viên";
            isValid = false;
        } else if (!idRegex.test(formData.id)) {
            newErrors.id = "Bắt đầu bằng 'SV' + 6 chữ số";
            isValid = false;
        }

        const nameRegex = /^[a-zA-Z\s\u00C0-\u1EF9]+$/;
        if (!formData.name.trim()) {
            newErrors.name = "Vui lòng nhập Họ và tên";
            isValid = false;
        } else if (!nameRegex.test(formData.name)) {
            newErrors.name = "Chỉ chứa chữ cái và khoảng trắng";
            isValid = false;
        }

        if (!formData.dob) {
            newErrors.dob = "Vui lòng chọn Ngày sinh";
            isValid = false;
        } else {
            const birthDate = new Date(formData.dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) {
                newErrors.dob = "Sinh viên phải từ 18 tuổi trở lên";
                isValid = false;
            }
        }

        if (!formData.class) {
            newErrors.class = "Vui lòng chọn Lớp học";
            isValid = false;
        }

        const gpaStr = formData.gpa.toString().trim();
        if (!gpaStr) {
            newErrors.gpa = "Vui lòng nhập Điểm trung bình";
            isValid = false;
        } else {
            const gpaNum = parseFloat(gpaStr);
            if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 10) {
                newErrors.gpa = "Từ 0 đến 10";
                isValid = false;
            } else if (!/^\d+(\.\d{1,2})?$/.test(gpaStr)) {
                newErrors.gpa = "Tối đa 2 chữ số thập phân";
                isValid = false;
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = "Vui lòng nhập Email";
            isValid = false;
        } else if (!emailRegex.test(formData.email) || !formData.email.endsWith("@student.edu.vn")) {
            newErrors.email = "Đúng định dạng @student.edu.vn";
            isValid = false;
        }

        const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        if (!formData.password) {
            newErrors.password = "Vui lòng nhập Mật khẩu";
            isValid = false;
        } else if (!pwRegex.test(formData.password)) {
            newErrors.password = "Tối thiểu 8 ký tự, có đủ hoa, thường, số, ký tự đặc biệt";
            isValid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Vui lòng xác nhận Mật khẩu";
            isValid = false;
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Mật khẩu không khớp";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            // onSave có thể trả về lỗi (ví dụ: trùng ID)
            const submitError = onSave(formData, isEditing);
            if (submitError) {
                setErrors(prev => ({ ...prev, id: submitError }));
            }
        }
    };

    return (
        <div className="modal fade" id="studentModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                <div className="modal-header bg-light">
                <h5 className="modal-title w-100 text-center fw-bold" style={{ color: '#333' }}>
                    Thêm/Sửa Sinh Viên
                </h5>
                </div>
                <div className="modal-body p-4">
                <form id="studentForm" onSubmit={handleSubmit} noValidate>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <label className="form-label fw-bold" style={{ fontSize: '14px' }}>MÃ SINH VIÊN <span className="text-danger">*</span></label>
                            <input type="text" className={`form-control ${errors.id ? 'is-invalid' : ''}`} name="id" value={formData.id} onChange={handleChange} disabled={isEditing} placeholder="VD: SV123456" style={{ borderRadius: '8px' }} />
                            {errors.id && <div className="invalid-feedback">{errors.id}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold" style={{ fontSize: '14px' }}>HỌ VÀ TÊN <span className="text-danger">*</span></label>
                            <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} name="name" value={formData.name} onChange={handleChange} style={{ borderRadius: '8px' }} />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <label className="form-label fw-bold" style={{ fontSize: '14px' }}>NGÀY SINH <span className="text-danger">*</span></label>
                            <input type="date" className={`form-control ${errors.dob ? 'is-invalid' : ''}`} name="dob" value={formData.dob} onChange={handleChange} style={{ borderRadius: '8px' }} />
                            {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold" style={{ fontSize: '14px' }}>LỚP HỌC <span className="text-danger">*</span></label>
                            <select className={`form-select ${errors.class ? 'is-invalid' : ''}`} name="class" value={formData.class} onChange={handleChange} style={{ borderRadius: '8px' }}>
                                <option value="">Chọn lớp</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                            {errors.class && <div className="invalid-feedback">{errors.class}</div>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <label className="form-label fw-bold" style={{ fontSize: '14px' }}>ĐIỂM TRUNG BÌNH <span className="text-danger">*</span></label>
                            <input type="number" step="0.01" className={`form-control ${errors.gpa ? 'is-invalid' : ''}`} name="gpa" value={formData.gpa} onChange={handleChange} style={{ borderRadius: '8px' }} />
                            {errors.gpa && <div className="invalid-feedback">{errors.gpa}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold" style={{ fontSize: '14px' }}>EMAIL SINH VIÊN <span className="text-danger">*</span></label>
                            <input type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" value={formData.email} onChange={handleChange} placeholder="@student.edu.vn" style={{ borderRadius: '8px' }} />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <label className="form-label fw-bold" style={{ fontSize: '14px' }}>MẬT KHẨU TÀI KHOẢN <span className="text-danger">*</span></label>
                            <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} name="password" value={formData.password} onChange={handleChange} placeholder="Tối thiểu 8 ký tự" style={{ borderRadius: '8px' }} />
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>
                        <div className="col-md-6">
                            <label className="form-label fw-bold" style={{ fontSize: '14px' }}>XÁC NHẬN MẬT KHẨU <span className="text-danger">*</span></label>
                            <input type="password" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={{ borderRadius: '8px' }} />
                            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                        </div>
                    </div>
                    <div className="text-center pt-3">
                        <button type="button" className="btn btn-danger px-5 py-2 fw-bold text-white rounded-pill me-3" onClick={onClose} style={{ background: '#dc3545', border: 'none' }}>HỦY</button>
                        <button type="submit" className="btn btn-success px-5 py-2 fw-bold text-white rounded-pill" style={{ background: '#28a745', border: 'none' }}>LƯU SINH VIÊN</button>
                    </div>
                </form>
                </div>
            </div>
            </div>
        </div>
    );
}

export default StudentForm;
