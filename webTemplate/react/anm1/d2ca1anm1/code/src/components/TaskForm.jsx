import React, { useState, useCallback, useEffect } from 'react';
import { validateForm } from '../utils/validator';

const TaskForm = ({ onAddTask, editingTask, onUpdateTask, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Trung bình',
    dueDate: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate
      });
      setErrors({});
    }
  }, [editingTask]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (editingTask) {
      onUpdateTask(editingTask.id, formData);
    } else {
      onAddTask(formData);
    }

    setFormData({
      title: '',
      description: '',
      priority: 'Trung bình',
      dueDate: ''
    });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      priority: 'Trung bình',
      dueDate: ''
    });
    setErrors({});
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-semibold small text-dark">
          &#9415; Tiêu đề <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          placeholder="Nhập tiêu đề công việc"
          value={formData.title}
          onChange={handleChange}
          maxLength="50"
        />
        {errors.title && <div className="invalid-feedback">{errors.title}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label fw-semibold small text-dark">
          &equiv; Mô tả
        </label>
        <textarea
          id="description"
          name="description"
          className={`form-control ${errors.description ? 'is-invalid' : ''}`}
          placeholder="Mô tả chi tiết công việc (tối đa 200 ký tự)"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          maxLength="200"
        />
        {errors.description && <div className="invalid-feedback">{errors.description}</div>}
        <div className="text-muted small mt-1 text-end">{formData.description.length}/200 ký tự</div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <label htmlFor="priority" className="form-label fw-semibold small text-dark">
            &#9888; Độ ưu tiên <span className="text-danger">*</span>
          </label>
          <select
            id="priority"
            name="priority"
            className={`form-select ${errors.priority ? 'is-invalid' : ''}`}
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Thấp">Thấp</option>
            <option value="Trung bình">Trung bình</option>
            <option value="Cao">Cao</option>
          </select>
          {errors.priority && <div className="invalid-feedback">{errors.priority}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="dueDate" className="form-label fw-semibold small text-dark">
            &#128197; Hạn hoàn thành <span className="text-danger">*</span>
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            className={`form-control ${errors.dueDate ? 'is-invalid' : ''}`}
            value={formData.dueDate}
            onChange={handleChange}
          />
          {errors.dueDate && <div className="invalid-feedback">{errors.dueDate}</div>}
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>
          &times; Hủy
        </button>
        <button type="submit" className="btn btn-primary d-flex align-items-center gap-1">
          &#9745; {editingTask ? 'Cập nhật' : 'Thêm'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
