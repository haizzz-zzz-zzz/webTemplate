import React, { useMemo } from 'react';
import TaskItem from './TaskItem';
import { filterTasks, sortTasksByPriority } from '../utils/taskHelper';

const TaskList = ({ tasks, statusFilter, priorityFilter, onToggleComplete, onEdit, onDelete }) => {
  const filteredAndSortedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, statusFilter, priorityFilter);
    return sortTasksByPriority(filtered);
  }, [tasks, statusFilter, priorityFilter]);

  if (tasks.length === 0) {
    return (
      <div className="text-center p-5 bg-white rounded shadow-sm">
        <div className="display-4 text-muted mb-3">&#128221;</div>
        <h3 className="h6 text-dark fw-bold">Không có công việc</h3>
        <p className="text-muted small mb-0">Hãy thêm công việc mới để bắt đầu quản lý</p>
      </div>
    );
  }

  if (filteredAndSortedTasks.length === 0) {
    return (
      <div className="text-center p-5 bg-white rounded shadow-sm">
        <div className="display-4 text-muted mb-3">&#128269;</div>
        <h3 className="h6 text-dark fw-bold">Không tìm thấy công việc</h3>
        <p className="text-muted small mb-0">Không có công việc nào phù hợp với bộ lọc hiện tại</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-center mb-3">
        <h3 className="h6 fw-bold m-0 text-dark">
          &#128203; Danh sách Công việc
        </h3>
        <span className="badge bg-primary ms-2">{filteredAndSortedTasks.length}</span>
      </div>
      <div className="row g-3">
        {filteredAndSortedTasks.map(task => (
          <div className="col-12 col-md-6 col-lg-4" key={task.id}>
            <TaskItem
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
