/**
 * Ứng Dụng Quản Lý Công Việc (To-Do List)
 * Viết bằng Vanilla JS thuần
 */

// Mảng chứa dữ liệu công việc (State)
let tasks = [];

// Trạng thái bộ lọc hiện tại
let currentFilter = {
    status: 'all',     // 'all' | 'completed' | 'pending'
    priority: 'all'    // 'all' | 'low' | 'medium' | 'high'
};

// DOM Elements
const taskModal = new bootstrap.Modal(document.getElementById('taskModal'));
const btnOpenAddModal = document.getElementById('btnOpenAddModal');
const btnSaveTask = document.getElementById('btnSaveTask');
const taskForm = document.getElementById('taskForm');
const taskListContainer = document.getElementById('taskListContainer');

// Form fields
const inputId = document.getElementById('taskId');
const inputTitle = document.getElementById('taskTitle');
const inputDesc = document.getElementById('taskDesc');
const inputPriority = document.getElementById('taskPriority');
const inputDueDate = document.getElementById('taskDueDate');

// Error fields
const titleError = document.getElementById('titleError');
const descError = document.getElementById('descError');
const descCount = document.getElementById('descCount');
const priorityError = document.getElementById('priorityError');
const dueDateError = document.getElementById('dueDateError');

// Filter Buttons
const statusButtons = document.querySelectorAll('#statusFilterGroup .filter-btn');
const priorityButtons = document.querySelectorAll('#priorityFilterGroup .filter-btn');

/* -------------------------------------------------------------------------- */
/*                               KHỞI TẠO & LƯU TRỮ                           */
/* -------------------------------------------------------------------------- */

// Tải dữ liệu từ LocalStorage khi khởi động
function loadTasks() {
    const storedTasks = localStorage.getItem('vt_tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    } else {
        // Dữ liệu mẫu ban đầu nếu trống
        tasks = initialTasks;
        saveTasks();
    }
    renderTasks();
}

// Lưu dữ liệu vào LocalStorage
function saveTasks() {
    localStorage.setItem('vt_tasks', JSON.stringify(tasks));
    updateCounts(); // Cập nhật số lượng trên các nút lọc
}

/* -------------------------------------------------------------------------- */
/*                               XỬ LÝ FORM & VALIDATION                      */
/* -------------------------------------------------------------------------- */

// Lắng nghe sự kiện điền mô tả phần đếm ký tự
inputDesc.addEventListener('input', () => {
    const len = inputDesc.value.length;
    descCount.textContent = `${len}/200 ký tự`;
    if (len > 200) {
        descCount.classList.add('text-danger');
        descCount.classList.remove('text-secondary');
    } else {
        descCount.classList.remove('text-danger');
        descCount.classList.add('text-secondary');
    }
});

// Hàm Validate Form
function validateForm() {
    let isValid = true;
    
    // Reset lỗi
    titleError.textContent = '';
    inputTitle.classList.remove('is-invalid');
    descError.textContent = '';
    inputDesc.classList.remove('is-invalid');
    priorityError.textContent = '';
    inputPriority.classList.remove('is-invalid');
    dueDateError.textContent = '';
    inputDueDate.classList.remove('is-invalid');

    // 1. Validate Tiêu đề (Bắt buộc)
    if (!inputTitle.value.trim()) {
        titleError.textContent = 'Tiêu đề không được để trống.';
        inputTitle.classList.add('is-invalid');
        isValid = false;
    }

    // 2. Validate Mô tả (50 - 200 ký tự)
    const descLen = inputDesc.value.trim().length;
    if (descLen > 0 && (descLen < 50 || descLen > 200)) {
        descError.textContent = 'Mô tả phải từ 50 đến 200 ký tự.';
        inputDesc.classList.add('is-invalid');
        isValid = false;
    }

    // 3. Validate Độ ưu tiên (Bắt buộc)
    if (!inputPriority.value) {
        priorityError.textContent = 'Vui lòng chọn độ ưu tiên.';
        inputPriority.classList.add('is-invalid');
        isValid = false;
    }

    // 4. Validate Hạn hoàn thành (Tương lai)
    if (!inputDueDate.value) {
        dueDateError.textContent = 'Hạn hoàn thành không được để trống.';
        inputDueDate.classList.add('is-invalid');
        isValid = false;
    } else {
        const selectedDate = new Date(inputDueDate.value);
        selectedDate.setHours(0,0,0,0);
        const today = new Date();
        today.setHours(0,0,0,0);
        
        if (selectedDate < today) {
            dueDateError.textContent = 'Hạn hoàn thành không thể là ngày quá khứ.';
            inputDueDate.classList.add('is-invalid');
            isValid = false;
        }
    }

    return isValid;
}

// Mở modal Thêm mới (Cần xoá dữ liệu cũ)
btnOpenAddModal.addEventListener('click', () => {
    document.getElementById('taskModalLabel').innerHTML = '<i class="bi bi-list-task me-2"></i>Thêm công việc mới';
    document.getElementById('btnSaveText').textContent = 'Thêm';
    inputId.value = '';
    taskForm.reset();
    inputTitle.classList.remove('is-invalid');
    inputDesc.classList.remove('is-invalid');
    inputPriority.classList.remove('is-invalid');
    inputDueDate.classList.remove('is-invalid');
    descCount.textContent = '0/200 ký tự';
});

// Lưu công việc (Thêm mới hoặc Cập nhật)
btnSaveTask.addEventListener('click', () => {
    if (!validateForm()) return;

    const id = inputId.value;
    const taskData = {
        title: inputTitle.value.trim(),
        desc: inputDesc.value.trim(),
        priority: inputPriority.value,
        dueDate: inputDueDate.value
    };

    if (id) {
        // Cập nhật
        const index = tasks.findIndex(t => t.id == id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...taskData };
        }
    } else {
        // Thêm mới
        tasks.push({
            id: Date.now(), // Tạo ID duy nhất bằng số ms
            ...taskData,
            isCompleted: false
        });
    }

    saveTasks();
    renderTasks();
    taskModal.hide();
});


/* -------------------------------------------------------------------------- */
/*                               RENDER & FILTER                              */
/* -------------------------------------------------------------------------- */

// Cập nhật số lượng công việc trên nút Lọc trạng thái
function updateCounts() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.isCompleted).length;
    const pending = total - completed;

    document.getElementById('count-all').textContent = `(${total})`;
    document.getElementById('count-completed').textContent = `(${completed})`;
    document.getElementById('count-pending').textContent = `(${pending})`;
}

// Xử lý sự kiện click cho Lọc Trạng Thái
statusButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Xoá active class của tất cả
        statusButtons.forEach(b => {
             // Đổi thành viền
             const rootClass = b.getAttribute('class').match(/btn-(outline-)?(primary|success|info)/)[0];
             b.classList.remove('active');
             if(!rootClass.includes('outline')) {
                b.classList.replace(rootClass, rootClass.replace('btn-', 'btn-outline-'));
             }
        });
        
        // Active nút hiện tại
        const rootClass = btn.getAttribute('class').match(/btn-outline-(primary|success|info)/)[0];
        btn.classList.add('active');
        btn.classList.replace(rootClass, rootClass.replace('outline-', ''));
        
        currentFilter.status = btn.getAttribute('data-value');
        renderTasks();
    });
});

// Xử lý sự kiện click cho Lọc Độ ưu tiên
priorityButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        priorityButtons.forEach(b => {
             const rootClass = b.getAttribute('class').match(/btn-(outline-)?(primary|success|warning|danger)/)[0];
             b.classList.remove('active');
             if(!rootClass.includes('outline')) {
                b.classList.replace(rootClass, rootClass.replace('btn-', 'btn-outline-'));
             }
        });

        const rootClass = btn.getAttribute('class').match(/btn-outline-(primary|success|warning|danger)/)[0];
        btn.classList.add('active');
        btn.classList.replace(rootClass, rootClass.replace('outline-', ''));

        currentFilter.priority = btn.getAttribute('data-value');
        renderTasks();
    });
});
// Set state mặc định ban đầu cho nút "Tất cả" -> Active
document.querySelector('[data-filter="status"][data-value="all"]').classList.replace('btn-outline-primary', 'btn-primary');
document.querySelector('[data-filter="priority"][data-value="all"]').classList.replace('btn-outline-primary', 'btn-primary');


// Transform data: Mapping priority dictionary
const pMap = {
    'low': { bg: 'bg-success', label: 'Thấp' },
    'medium': { bg: 'bg-warning text-dark', label: 'Trung bình' },
    'high': { bg: 'bg-danger', label: 'Cao' }
};

// Render giao diện danh sách
function renderTasks() {
    taskListContainer.innerHTML = '';
    
    // Lọc dữ liệu
    let filtered = tasks.filter(t => {
        if (currentFilter.status === 'completed' && !t.isCompleted) return false;
        if (currentFilter.status === 'pending' && t.isCompleted) return false;
        if (currentFilter.priority !== 'all' && t.priority !== currentFilter.priority) return false;
        return true;
    });

    if (filtered.length === 0) {
        taskListContainer.innerHTML = '<div class="col-12 text-center text-secondary py-5">Không tìm thấy công việc nào phù hợp!</div>';
        return;
    }

    filtered.forEach(task => {
        const pInfo = pMap[task.priority];
        // Format ngày (từ yyyy-mm-dd sang dd/mm/yyyy)
        const dateObj = new Date(task.dueDate);
        const dateString = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;

        const colDiv = document.createElement('div');
        colDiv.className = 'col-12 col-md-6 col-lg-4';
        
        colDiv.innerHTML = `
            <div class="task-card priority-${task.priority} ${task.isCompleted ? 'completed' : ''}">
                <div class="task-content">
                    <span class="task-title">${task.title}</span>
                    <div class="task-desc">${task.desc || 'Không có mô tả'}</div>
                    <div class="task-badges d-flex gap-2">
                        <span class="badge ${pInfo.bg} d-flex align-items-center"><i class="bi bi-flag-fill me-1"></i> ${pInfo.label}</span>
                        <span class="badge bg-secondary d-flex align-items-center"><i class="bi bi-calendar-event me-1"></i> ${dateString}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button class="btn btn-outline-success" onclick="toggleTaskStatus(${task.id})" title="${task.isCompleted ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}">
                        <i class="bi ${task.isCompleted ? 'bi-x-lg' : 'bi-check-lg'}"></i>
                    </button>
                    <button class="btn btn-outline-primary" onclick="editTask(${task.id})" title="Chỉnh sửa">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-outline-danger" onclick="deleteTask(${task.id})" title="Xoá">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                </div>
            </div>
        `;
        taskListContainer.appendChild(colDiv);
    });
}

/* -------------------------------------------------------------------------- */
/*                               CÁC HÀM TIỆN ÍCH CHỨC NĂNG                 */
/* -------------------------------------------------------------------------- */

// Toggle Trạng thái Hoàn thành
window.toggleTaskStatus = function(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.isCompleted = !task.isCompleted;
        saveTasks();
        renderTasks();
    }
};

// Xoá công việc
window.deleteTask = function(id) {
    if (confirm("Bạn có chắc chắn muốn xoá công việc này?")) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        renderTasks();
    }
};

// Mở modal Chỉnh sửa
window.editTask = function(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Fill data
    inputId.value = task.id;
    inputTitle.value = task.title;
    inputDesc.value = task.desc;
    inputPriority.value = task.priority;
    inputDueDate.value = task.dueDate;
    
    // Cập nhật giao diện modal
    document.getElementById('taskModalLabel').innerHTML = '<i class="bi bi-pencil-square me-2"></i>Chỉnh sửa công việc';
    document.getElementById('btnSaveText').textContent = 'Cập nhật';
    
    // Xoá validation cũ & cập nhật đếm char
    inputTitle.classList.remove('is-invalid');
    inputDesc.classList.remove('is-invalid');
    inputPriority.classList.remove('is-invalid');
    inputDueDate.classList.remove('is-invalid');
    descCount.textContent = `${task.desc.length}/200 ký tự`;

    // Show modal
    taskModal.show();
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});
