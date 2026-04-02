import React, { useState, useCallback, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterBar from './components/FilterBar';
import { createNewTask } from './utils/taskHelper';
import { useLocalStorage } from './hooks/useLocalStorage';
import { sampleTasks } from './data';

function App() {
  // State quản lý danh sách task
  const [tasks, setTasks] = useLocalStorage('tasks', sampleTasks);
  
  // State quản lý filter
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const [priorityFilter, setPriorityFilter] = useState('Tất cả ưu tiên');
  
  // State quản lý modal form
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Thêm task mới
  const handleAddTask = useCallback((taskData) => {
    const newTask = createNewTask(taskData);
    setTasks(prev => [newTask, ...prev]);
    setShowForm(false);
  }, [setTasks]);

  // Cập nhật task
  const handleUpdateTask = useCallback((taskId, taskData) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...taskData }
        : task
    ));
    setEditingTask(null);
    setShowForm(false);
  }, [setTasks]);

  // Xóa task
  const handleDeleteTask = useCallback((taskId) => {
    if (window.confirm('Bạn chắc chắn muốn xóa công việc này?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
      if (editingTask?.id === taskId) {
        setEditingTask(null);
        setShowForm(false);
      }
    }
  }, [setTasks, editingTask]);

  // Đánh dấu hoàn thành
  const handleToggleComplete = useCallback((taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    ));
  }, [setTasks]);

  // Chỉnh sửa task
  const handleEditTask = useCallback((task) => {
    setEditingTask(task);
    setShowForm(true);
  }, []);

  // Hủy chỉnh sửa/Đóng form
  const handleCancelEdit = useCallback(() => {
    setEditingTask(null);
    setShowForm(false);
  }, []);

  // Mở form thêm task mới
  const handleOpenForm = useCallback(() => {
    setEditingTask(null);
    setShowForm(true);
  }, []);

  return (
    <div className="container py-5" style={{ minHeight: '100vh', maxWidth: '1000px' }}>
      <header className="d-flex justify-content-between align-items-center mb-4 bg-primary text-white p-3 rounded shadow-sm">
        <h1 className="h4 m-0 d-flex align-items-center gap-2">
          &equiv; Quản Lý Công Việc
        </h1>
        <button 
          className="btn btn-light text-primary rounded-circle fw-bold shadow-sm d-flex align-items-center justify-content-center" 
          style={{ width: '45px', height: '45px', fontSize: '1.5rem'}} 
          onClick={handleOpenForm} 
          title="Thêm công việc mới">
          +
        </button>
      </header>

      <main>
        <FilterBar
          tasks={tasks}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
        />

        <TaskList
          tasks={tasks}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </main>

      {/* Modal Form Bootstrap implementation */}
      {showForm && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1" onClick={handleCancelEdit}>
            <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content border-0 shadow-lg">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title h6 mb-0">
                    {editingTask ? 'Chỉnh sửa công việc' : '≡ Thêm công việc mới'}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleCancelEdit} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <TaskForm 
                    onAddTask={handleAddTask}
                    editingTask={editingTask}
                    onUpdateTask={handleUpdateTask}
                    onCancelEdit={handleCancelEdit}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <footer className="text-center text-muted mt-5 py-3 border-top">
        <small>&copy; 2024 Task Manager - Ứng dụng Quản lý Công việc</small>
      </footer>
    </div>
  );
}

export default App;
