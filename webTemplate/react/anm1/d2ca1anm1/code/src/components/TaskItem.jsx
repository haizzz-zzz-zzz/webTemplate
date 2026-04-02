import React from 'react';
import { formatDate, isOverdue } from '../utils/taskHelper';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const priorityClass = task.priority.toLowerCase();
  
  const priorityColorMap = {
    'cao': 'danger',
    'trung bình': 'warning',
    'thấp': 'success'
  };

  const bsColor = priorityColorMap[priorityClass] || 'success';

  return (
    <div className={`card h-100 shadow-sm border-0 border-start border-${bsColor} border-4 ${task.isCompleted ? 'bg-light opacity-75' : 'bg-white'}`}>
      <div className="card-body d-flex flex-column p-3">
        <div className="d-flex align-items-start gap-2 mb-2">
          <input
            type="checkbox"
            className="form-check-input mt-1"
            style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
            checked={task.isCompleted}
            onChange={() => onToggleComplete(task.id)}
            id={`task-${task.id}`}
          />
          <label 
            htmlFor={`task-${task.id}`} 
            className={`fw-semibold m-0 flex-grow-1 text-dark ${task.isCompleted ? 'text-decoration-line-through text-muted' : ''}`}
            style={{ cursor: 'pointer', fontSize: '0.95rem' }}
          >
            {task.title}
          </label>
        </div>

        {task.description && (
          <p className="card-text text-muted small ms-4 mb-3" style={{ lineHeight: 1.4 }}>
            {task.description}
          </p>
        )}

        <div className="mt-auto pt-3 border-top d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column gap-1">
            <span className={`badge bg-${bsColor} text-white align-self-start`} style={{ fontSize: '0.7rem' }}>
              {task.priority}
            </span>
            <span className="text-muted" style={{ fontSize: '0.75rem' }}>
              &#128197; {formatDate(task.dueDate)}
            </span>
          </div>

          <div className="d-flex gap-1">
            <button 
              className={`btn btn-sm btn-outline-${task.isCompleted ? 'secondary' : 'success'} border-0 px-2 py-1`} 
              onClick={() => onToggleComplete(task.id)}
              title={task.isCompleted ? "Đánh dấu chưa hoàn thành" : "Hoàn thành"}
            >
              &#10003;
            </button>
            <button 
              className="btn btn-sm btn-outline-primary border-0 px-2 py-1" 
              onClick={() => onEdit(task)}
              title="Chỉnh sửa"
            >
              &#9998;
            </button>
            <button 
              className="btn btn-sm btn-outline-danger border-0 px-2 py-1" 
              onClick={() => onDelete(task.id)}
              title="Xóa"
            >
              &#128465;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
