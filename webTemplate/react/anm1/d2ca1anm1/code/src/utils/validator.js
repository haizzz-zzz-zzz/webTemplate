// Hàm xác thực tiêu đề công việc
export const validateTitle = (title) => {
  if (!title || title.trim() === '') {
    return 'Tiêu đề không được để trống';
  }
  if (title.length > 50) {
    return 'Tiêu đề không quá 50 ký tự (hiện tại: ' + title.length + ')';
  }
  return '';
};

// Hàm xác thực mô tả
export const validateDescription = (description) => {
  if (description && description.length > 200) {
    return 'Mô tả không quá 200 ký tự (hiện tại: ' + description.length + ')';
  }
  return '';
};

// Hàm xác thực độ ưu tiên
export const validatePriority = (priority) => {
  const validPriorities = ['Thấp', 'Trung bình', 'Cao'];
  if (!priority || !validPriorities.includes(priority)) {
    return 'Phải chọn một trong ba mức độ ưu tiên';
  }
  return '';
};

// Hàm xác thực hạn hoàn thành
export const validateDueDate = (dueDate) => {
  if (!dueDate) {
    return 'Hạn hoàn thành không được để trống';
  }
  
  const selectedDate = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return 'Hạn hoàn thành phải là ngày trong tương lai';
  }
  return '';
};

// Hàm xác thực toàn bộ form
export const validateForm = (taskData) => {
  const errors = {};
  
  const titleError = validateTitle(taskData.title);
  if (titleError) errors.title = titleError;
  
  const descriptionError = validateDescription(taskData.description);
  if (descriptionError) errors.description = descriptionError;
  
  const priorityError = validatePriority(taskData.priority);
  if (priorityError) errors.priority = priorityError;
  
  const dueDateError = validateDueDate(taskData.dueDate);
  if (dueDateError) errors.dueDate = dueDateError;
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
