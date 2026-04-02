import React from 'react';

const FilterBar = ({ tasks, statusFilter, priorityFilter, onStatusChange, onPriorityChange }) => {
  // Calculate counts
  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.isCompleted).length;
  const incompleteCount = tasks.filter(t => !t.isCompleted).length;

  const statuses = [
    { label: 'Tất cả', value: 'Tất cả', count: totalCount },
    { label: 'Hoàn thành', value: 'Hoàn thành', count: completedCount },
    { label: 'Chưa hoàn thành', value: 'Chưa hoàn thành', count: incompleteCount }
  ];

  const priorities = [
    { label: 'Tất cả ưu tiên', value: 'Tất cả ưu tiên' },
    { label: 'Ưu tiên cao', value: 'Ưu tiên cao' },
    { label: 'Ưu tiên trung bình', value: 'Ưu tiên trung bình' },
    { label: 'Ưu tiên thấp', value: 'Ưu tiên thấp' }
  ];

  return (
    <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center mb-4">
      <div className="d-flex flex-wrap gap-2">
        {statuses.map(status => (
          <button
            key={status.value}
            className={`btn btn-sm ${statusFilter === status.value ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => onStatusChange(status.value)}
          >
            {status.label} <span className={`badge ms-1 ${statusFilter === status.value ? 'bg-light text-primary' : 'bg-secondary'}`}>{status.count}</span>
          </button>
        ))}
      </div>

      <div className="d-flex flex-wrap gap-2">
        {priorities.map(priority => (
          <button
            key={priority.value}
            className={`btn btn-sm ${priorityFilter === priority.value ? 'btn-primary' : 'btn-outline-secondary'}`}
            onClick={() => onPriorityChange(priority.value)}
          >
            {priority.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
