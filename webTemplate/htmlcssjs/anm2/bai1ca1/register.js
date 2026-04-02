document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const editModeParam = new URLSearchParams(window.location.search).get('edit');
    let students = getStudents();

    if (editModeParam) {
        const studentToEdit = students.find(s => s.id === editModeParam);
        if (studentToEdit) {
            document.getElementById('edit-mode').value = studentToEdit.id;
            document.getElementById('fullname').value = studentToEdit.name;
            document.getElementById('studentid').value = studentToEdit.id;
            document.getElementById('studentid').readOnly = true;
            document.getElementById('email').value = studentToEdit.email;
            document.getElementById('phone').value = studentToEdit.phone;
            document.getElementById('major').value = studentToEdit.major;
            
            const genderRadio = document.querySelector(`input[name="gender"][value="${studentToEdit.gender}"]`);
            if(genderRadio) genderRadio.checked = true;
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.error').forEach(el => el.textContent = '');
        
        // Get values
        const fullname = document.getElementById('fullname').value.trim();
        const studentid = document.getElementById('studentid').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const major = document.getElementById('major').value;
        const genderEl = document.querySelector('input[name="gender"]:checked');
        const gender = genderEl ? genderEl.value : '';
        const editModeId = document.getElementById('edit-mode').value;

        let isValid = true;

        if (!fullname) {
            document.getElementById('fullname-error').textContent = 'Họ và tên không được để trống';
            isValid = false;
        }

        const idRegex = /^SV[0-9]{3}$/;
        if (!studentid || !idRegex.test(studentid)) {
            document.getElementById('studentid-error').textContent = 'Mã sinh viên không hợp lệ (VD: SV001)';
            isValid = false;
        } else if (!editModeId && students.some(s => s.id === studentid)) {
            document.getElementById('studentid-error').textContent = 'Mã sinh viên đã tồn tại';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Email không hợp lệ';
            isValid = false;
        }

        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phone || !phoneRegex.test(phone)) {
            document.getElementById('phone-error').textContent = 'Số điện thoại chỉ chấp nhận số và dài 10-11 ký tự';
            isValid = false;
        }

        if (!major) {
            document.getElementById('major-error').textContent = 'Vui lòng chọn ngành học';
            isValid = false;
        }

        if (!gender) {
            document.getElementById('gender-error').textContent = 'Vui lòng chọn giới tính';
            isValid = false;
        }

        if (!isValid) return;

        const studentData = { id: studentid, name: fullname, email, phone, major, gender };

        if (editModeId) {
            const index = students.findIndex(s => s.id === editModeId);
            if (index !== -1) {
                students[index] = studentData;
            }
        } else {
            students.push(studentData);
        }

        saveStudents(students);
        window.location.href = 'students.html';
    });
});
