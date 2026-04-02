import React, { useState } from 'react';
import Navbar from './components/Navbar';
import EmployeeList from './components/EmployeeList';
import EmployeeModal from './components/EmployeeModal';
import data from './data';

export default function App() {
  const [employees, setEmployees] = useState(data);
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleOpenModal = (employee = null) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingEmployee(null);
    setShowModal(false);
  };

  const handleSaveEmployee = (empData) => {
    if (editingEmployee) {
      setEmployees(employees.map(e => e.id === editingEmployee.id ? { ...empData, id: editingEmployee.id } : e));
    } else {
      const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
      setEmployees([...employees, { id: newId, ...empData }]);
    }
    handleCloseModal();
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter(e => e.id !== id));
  };

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  };

  const filteredEmployees = employees.filter(emp => {
    const kw = searchKeyword.toLowerCase().trim();
    if (!kw) return true;
    return (
      emp.name.toLowerCase().includes(kw) ||
      emp.email.toLowerCase().includes(kw) ||
      emp.phone.includes(kw) ||
      emp.position.toLowerCase().includes(kw)
    );
  });

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <EmployeeList 
        employees={filteredEmployees} 
        onAddClick={() => handleOpenModal()} 
        onEditClick={handleOpenModal}
        onDeleteClick={handleDeleteEmployee} 
      />
      <EmployeeModal 
        show={showModal} 
        employee={editingEmployee}
        onClose={handleCloseModal} 
        onSave={handleSaveEmployee} 
      />
    </div>
  );
}

