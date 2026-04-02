import { v4 as uuidv4 } from 'uuid';

// Tạo task mới với ID duy nhất
export const createNewTask = (taskData) => {
  return {
    id: uuidv4(),
    ...taskData,
    isCompleted: false,
    createdAt: new Date().toISOString(),
  };
};

// Map filter priority to task priority
const mapFilterPriority = (filterPriority) => {
  if (filterPriority === 'Ưu tiên cao') return 'Cao';
  if (filterPriority === 'Ưu tiên trung bình') return 'Trung bình';
  if (filterPriority === 'Ưu tiên thấp') return 'Thấp';
  return filterPriority;
};

// Lọc công việc theo trạng thái
export const filterTasksByStatus = (tasks, status) => {
  if (status === 'Tất cả') return tasks;
  if (status === 'Hoàn thành') return tasks.filter(task => task.isCompleted);
  if (status === 'Chưa hoàn thành') return tasks.filter(task => !task.isCompleted);
  return tasks;
};

// Lọc công việc theo độ ưu tiên
export const filterTasksByPriority = (tasks, priority) => {
  if (priority === 'Tất cả ưu tiên') return tasks;
  const mappedPriority = mapFilterPriority(priority);
  return tasks.filter(task => task.priority === mappedPriority);
};

// Kết hợp lọc theo trạng thái và độ ưu tiên
export const filterTasks = (tasks, statusFilter, priorityFilter) => {
  let filtered = tasks;
  filtered = filterTasksByStatus(filtered, statusFilter);
  filtered = filterTasksByPriority(filtered, priorityFilter);
  return filtered;
};

// Sắp xếp công việc theo độ ưu tiên (Cao -> Trung bình -> Thấp)
export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { 'Cao': 1, 'Trung bình': 2, 'Thấp': 3 };
  return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

// Định dạng ngày
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
};

// Kiểm tra ngày đã hết hạn
export const isOverdue = (dueDate, isCompleted) => {
  if (isCompleted) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  return due < today;
};
