// 2. Lấy dữ liệu từ Local Storage. Nếu chưa có thì nạp dữ liệu mẫu vào.
let students = JSON.parse(localStorage.getItem('students'));
if (!students || students.length === 0) {
    students = mockData;
    localStorage.setItem('students', JSON.stringify(students));
}

let editMode = false;
let currentEditId = null;

// DOM Elements
const modal = document.getElementById('student-modal');
const btnAdd = document.getElementById('btn-add-student');
const btnCancel = document.getElementById('btn-cancel');
const form = document.getElementById('student-form');
const tbody = document.getElementById('student-list');

// Hiển thị danh sách và tính toán Header
function renderTable() {
    tbody.innerHTML = '';
    let totalGpa = 0;

    students.forEach((sv, index) => {
        totalGpa += parseFloat(sv.gpa);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${sv.id}</td>
            <td>${sv.name}</td>
            <td>${formatDateToDisplay(sv.dob)}</td>
            <td>${sv.className}</td>
            <td>${parseFloat(sv.gpa).toFixed(1)}</td>
            <td>
                <button class="btn btn-edit" onclick="editStudent('${sv.id}')">Sửa</button>
                <button class="btn btn-delete" onclick="deleteStudent('${sv.id}')">Xoá</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    // Cập nhật thống kê
    document.getElementById('total-students').innerText = students.length;
    let avgGpa = students.length > 0 ? (totalGpa / students.length).toFixed(2) : "0.00";
    document.getElementById('average-gpa').innerText = avgGpa;
}

// Hàm format ngày tháng bỏ số 0 ở đầu (VD: 15/1/2000) để giống hệt ảnh
function formatDateToDisplay(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

// ... (Giữ nguyên các hàm Mở Modal, Đóng Modal, Xóa, Sửa và Validate ở code trước) ...
// Mở Modal
btnAdd.onclick = () => {
    editMode = false;
    currentEditId = null;
    document.getElementById('modal-title').innerText = "Thêm Sinh Viên";
    document.getElementById('sv-id').readOnly = false; // Cho phép nhập ID
    form.reset();
    clearErrors();
    modal.style.display = "block";
};

// Đóng Modal
btnCancel.onclick = () => {
    modal.style.display = "none";
};

// Xóa Sinh Viên
window.deleteStudent = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sinh viên này khỏi danh sách?")) {
        students = students.filter(sv => sv.id !== id);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
    }
};

// Đưa dữ liệu lên Form để Sửa
window.editStudent = (id) => {
    editMode = true;
    currentEditId = id;
    document.getElementById('modal-title').innerText = "Sửa Sinh Viên";
    
    const sv = students.find(s => s.id === id);
    if(sv) {
        document.getElementById('sv-id').value = sv.id;
        document.getElementById('sv-id').readOnly = true; // Không cho sửa Mã SV
        document.getElementById('sv-name').value = sv.name;
        document.getElementById('sv-dob').value = sv.dob;
        document.getElementById('sv-class').value = sv.className;
        document.getElementById('sv-gpa').value = sv.gpa;
        document.getElementById('sv-email').value = sv.email;
        document.getElementById('sv-password').value = sv.password;
        document.getElementById('sv-confirm-password').value = sv.password;
        
        clearErrors();
        modal.style.display = "block";
    }
};

// Xóa thông báo lỗi cũ
function clearErrors() {
    const errorMsgs = document.querySelectorAll('.error-msg');
    errorMsgs.forEach(msg => msg.innerText = "");
}

// Validate Form
function validateForm() {
    let isValid = true;
    clearErrors();

    const id = document.getElementById('sv-id').value.trim();
    const name = document.getElementById('sv-name').value.trim();
    const dob = document.getElementById('sv-dob').value;
    const className = document.getElementById('sv-class').value;
    const gpa = document.getElementById('sv-gpa').value.trim();
    const email = document.getElementById('sv-email').value.trim();
    const password = document.getElementById('sv-password').value;
    const confirmPassword = document.getElementById('sv-confirm-password').value;

    // 1. Mã Sinh Viên (Bắt đầu bằng SV + 6 số)
    const idRegex = /^SV\d{6}$/;
    if (!id) {
        document.getElementById('error-id').innerText = "Mã sinh viên không được để trống";
        isValid = false;
    } else if (!idRegex.test(id)) {
        document.getElementById('error-id').innerText = "Phải bắt đầu bằng 'SV' và theo sau 6 chữ số (VD: SV123456)";
        isValid = false;
    } else if (!editMode && students.some(sv => sv.id === id)) {
        document.getElementById('error-id').innerText = "Mã sinh viên đã tồn tại!";
        isValid = false;
    }

    // 2. Họ và tên (Không trống, chỉ chữ và khoảng trắng - Hỗ trợ Tiếng Việt)
    const nameRegex = /^[a-zA-Z\sàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ]+$/;
    if (!name) {
        document.getElementById('error-name').innerText = "Họ và tên không được để trống";
        isValid = false;
    } else if (!nameRegex.test(name)) {
        document.getElementById('error-name').innerText = "Chỉ chứa chữ cái và khoảng trắng";
        isValid = false;
    }

    // 3. Ngày sinh (>= 18 tuổi)
    if (!dob) {
        document.getElementById('error-dob').innerText = "Ngày sinh không được để trống";
        isValid = false;
    } else {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            document.getElementById('error-dob').innerText = "Sinh viên phải từ 18 tuổi trở lên";
            isValid = false;
        }
    }

    // 4. Lớp
    if (!className) {
        document.getElementById('error-class').innerText = "Vui lòng chọn lớp học";
        isValid = false;
    }

    // 5. Điểm TB (0-10, 2 chữ số thập phân)
    const gpaRegex = /^\d+(\.\d{1,2})?$/;
    if (gpa === "") {
        document.getElementById('error-gpa').innerText = "Điểm TB không được để trống";
        isValid = false;
    } else if (!gpaRegex.test(gpa) || parseFloat(gpa) < 0 || parseFloat(gpa) > 10) {
        document.getElementById('error-gpa').innerText = "Phải là số từ 0 đến 10, tối đa 2 chữ số thập phân";
        isValid = false;
    }

    // 6. Email (Bắt buộc đuôi @student.edu.vn)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@student\.edu\.vn$/;
    if (!email) {
        document.getElementById('error-email').innerText = "Email không được để trống";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('error-email').innerText = "Email phải đúng định dạng và kết thúc bằng @student.edu.vn";
        isValid = false;
    }

    // 7. Mật khẩu (Min 8 char, 1 hoa, 1 thường, 1 số, 1 ký tự đặc biệt)
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password) {
        document.getElementById('error-password').innerText = "Mật khẩu không được để trống";
        isValid = false;
    } else if (!passRegex.test(password)) {
        document.getElementById('error-password').innerText = "Ít nhất 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt";
        isValid = false;
    }

    // 8. Xác nhận mật khẩu
    if (!confirmPassword) {
        document.getElementById('error-confirm-password').innerText = "Vui lòng xác nhận mật khẩu";
        isValid = false;
    } else if (password !== confirmPassword) {
        document.getElementById('error-confirm-password').innerText = "Mật khẩu xác nhận không khớp";
        isValid = false;
    }

    return isValid;
}

// Xử lý Submit Form (Thêm / Sửa)
form.onsubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
        const studentData = {
            id: document.getElementById('sv-id').value.trim(),
            name: document.getElementById('sv-name').value.trim(),
            dob: document.getElementById('sv-dob').value,
            className: document.getElementById('sv-class').value,
            gpa: document.getElementById('sv-gpa').value.trim(),
            email: document.getElementById('sv-email').value.trim(),
            password: document.getElementById('sv-password').value
        };

        if (editMode) {
            // Cập nhật sinh viên đã có
            const index = students.findIndex(s => s.id === currentEditId);
            if (index !== -1) {
                students[index] = studentData;
            }
        } else {
            // Thêm sinh viên mới
            students.push(studentData);
        }

        // Lưu vào Local Storage và cập nhật UI
        localStorage.setItem('students', JSON.stringify(students));
        modal.style.display = "none";
        renderTable();
    }
};

// Khởi tạo bảng lúc tải trang
window.onload = renderTable;