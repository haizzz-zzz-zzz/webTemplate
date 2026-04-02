const defaultStudents = [
  { id: "SV001", name: "Nguyễn Văn A", email: "a.nguyen@example.com", phone: "0123456789", major: "IT", gender: "Nam" },
  { id: "SV002", name: "Trần Thị B", email: "b.tran@example.com", phone: "0987654321", major: "Business", gender: "Nữ" },
  { id: "SV003", name: "Phạm Văn C", email: "c.pham@example.com", phone: "0912345678", major: "Design", gender: "Nam" },
  { id: "SV004", name: "Lê Thị D", email: "d.le@example.com", phone: "0934567890", major: "IT", gender: "Nữ" },
  { id: "SV005", name: "Hoàng Văn E", email: "e.hoang@example.com", phone: "0901234567", major: "Business", gender: "Nam" }
];

function getStudents() {
  const data = localStorage.getItem('students');
  if (!data) {
    localStorage.setItem('students', JSON.stringify(defaultStudents));
    return defaultStudents;
  }
  return JSON.parse(data);
}

function saveStudents(students) {
  localStorage.setItem('students', JSON.stringify(students));
}
