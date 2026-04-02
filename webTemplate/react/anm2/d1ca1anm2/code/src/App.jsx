import { useState, useEffect } from 'react'
import StudentList from './components/StudentList'
import StudentForm from './components/StudentForm'

function App() {
  const [students, setStudents] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'form't mân
  const [editingStudent, setEditingStudent] = useState(null);

  // Load students from localStorage
  useEffect(() => {
    const rawData = localStorage.getItem('students');
    if (rawData) {
      setStudents(JSON.parse(rawData));
    }
  }, []);

  const saveStudents = (newStudents) => {
    setStudents(newStudents);
    localStorage.setItem('students', JSON.stringify(newStudents));
  };

  const handleAddClick = () => {
    setEditingStudent(null);
    setView('form');
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setView('form');
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá sinh viên này?')) {
      const newStudents = students.filter(s => s.id !== id);
      saveStudents(newStudents);
    }
  };

  const handleSaveForm = (formData) => {
    let newStudents = [...students];
    if (editingStudent) {
      // Update
      const index = newStudents.findIndex(s => s.id === editingStudent.id);
      if (index !== -1) {
        newStudents[index] = formData;
      }
    } else {
      // Add
      newStudents.push(formData);
    }
    saveStudents(newStudents);
    setView('list');
  };

  const handleCancelForm = () => {
    setView('list');
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-0">
      <nav className="navbar navbar-light bg-light border-bottom px-4">
        <span className="navbar-brand mb-0 h1">Student Management</span>
        {view === 'list' && (
          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary px-4">Filter</button>
            <button className="btn btn-primary" onClick={handleAddClick}>+ Add Student</button>
          </div>
        )}
      </nav>

      <div className="p-4 bg-white m-3 border rounded shadow-sm">
        {view === 'list' ? (
          <StudentList 
            students={students} 
            onEdit={handleEditClick} 
            onDelete={handleDeleteClick} 
          />
        ) : (
          <StudentForm 
            initialData={editingStudent} 
            onSave={handleSaveForm} 
            onCancel={handleCancelForm} 
          />
        )}
      </div>
    </div>
  )
}

export default App
