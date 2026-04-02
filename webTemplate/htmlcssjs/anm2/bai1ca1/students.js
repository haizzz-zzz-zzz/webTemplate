document.addEventListener('DOMContentLoaded', () => {
    renderStudents();
});

function renderStudents() {
    const students = getStudents();
    const listContainer = document.getElementById('student-list');
    listContainer.innerHTML = '';

    students.forEach(student => {
        const item = document.createElement('div');
        item.className = 'student-item';
        item.innerHTML = `
            <div class="student-info">
                <h3>${student.name}</h3>
                <p>Mã SV: ${student.id} | Email: ${student.email} | SĐT: ${student.phone}</p>
                <p>Ngành: ${student.major} | Giới tính: ${student.gender}</p>
            </div>
            <div class="student-actions">
                <a href="register-student.html?edit=${student.id}" class="btn btn-warning">Sửa</a>
                <button onclick="deleteStudent('${student.id}')" class="btn btn-danger">Xoá</button>
            </div>
        `;
        listContainer.appendChild(item);
    });

    const total = students.length;
    document.getElementById('showing-count').textContent = total;
    document.getElementById('total-count').textContent = total;
}

function deleteStudent(id) {
    if (confirm('Bạn có chắc chắn muốn xoá sinh viên này không?')) {
        let students = getStudents();
        students = students.filter(s => s.id !== id);
        saveStudents(students);
        renderStudents();
    }
}
