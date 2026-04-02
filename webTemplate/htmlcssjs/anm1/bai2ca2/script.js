// Data Models
const incomeCategories = ["Lương", "Thưởng", "Đầu tư"];
const expenseCategories = ["Ăn uống", "Di chuyển", "Giải trí", "Học tập", "Khác"];

// DOM Elements
const form = document.getElementById('transactionForm');
const typeSelect = document.getElementById('type');
const categorySelect = document.getElementById('category');
const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const editIdInput = document.getElementById('editId');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const transactionList = document.getElementById('transactionList');

const filterType = document.getElementById('filterType');
const filterCategory = document.getElementById('filterCategory');
const filterStartDate = document.getElementById('filterStartDate');
const filterEndDate = document.getElementById('filterEndDate');

const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');
const balanceEl = document.getElementById('balance');

// State Application
let transactions = [];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Load from localStorage or initialize from data.js
    const saved = localStorage.getItem('transactions');
    if (saved && saved !== '[]') {
        try {
            transactions = JSON.parse(saved);
        } catch (e) {
            console.error("Could not parse transactions", e);
            transactions = typeof initialData !== 'undefined' ? [...initialData] : [];
        }
    } else {
        if (typeof initialData !== 'undefined') {
            transactions = [...initialData];
            saveData();
        }
    }
    renderTransactions();
    updateSummary();
});

// Event Listeners
typeSelect.addEventListener('change', (e) => {
    updateCategoryOptions(e.target.value);
});

form.addEventListener('submit', handleFormSubmit);
cancelBtn.addEventListener('click', resetForm);

filterType.addEventListener('change', renderTransactions);
filterCategory.addEventListener('change', renderTransactions);
filterStartDate.addEventListener('change', renderTransactions);
filterEndDate.addEventListener('change', renderTransactions);

// Core Logic & Functions
function updateCategoryOptions(type, selectedCategory = '') {
    categorySelect.innerHTML = '<option value="" selected disabled>Chọn danh mục</option>';
    if (type) {
        categorySelect.disabled = false;
        const categories = type === 'income' ? incomeCategories : expenseCategories;
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            if (cat === selectedCategory) option.selected = true;
            categorySelect.appendChild(option);
        });
    } else {
        categorySelect.disabled = true;
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    const transaction = {
        id: editIdInput.value ? parseInt(editIdInput.value) : Date.now(),
        name: nameInput.value.trim(),
        type: typeSelect.value,
        amount: parseFloat(amountInput.value),
        category: categorySelect.value,
        date: dateInput.value
    };

    if (editIdInput.value) {
        // Update existing transaction
        transactions = transactions.map(t => t.id === transaction.id ? transaction : t);
    } else {
        // Add new transaction
        transactions.push(transaction);
    }

    saveData();
    resetForm();
    renderTransactions();
    updateSummary();
}

function validateForm() {
    let isValid = true;

    // Validate Name: not empty, 3-100 characters
    const nameVal = nameInput.value.trim();
    if (nameVal.length < 3 || nameVal.length > 100) {
        showError(nameInput);
        isValid = false;
    } else {
        clearError(nameInput);
    }

    // Validate Type
    if (!typeSelect.value) {
        showError(typeSelect);
        isValid = false;
    } else {
        clearError(typeSelect);
    }

    // Validate Amount: > 0 and < 1,000,000,000
    const amountVal = parseFloat(amountInput.value);
    if (isNaN(amountVal) || amountVal <= 0 || amountVal >= 1000000000) {
        showError(amountInput);
        isValid = false;
    } else {
        clearError(amountInput);
    }

    // Validate Category
    if (!categorySelect.value) {
        showError(categorySelect);
        isValid = false;
    } else {
        clearError(categorySelect);
    }

    // Validate Date: not empty and not in the future
    const dateVal = dateInput.value;
    if (!dateVal) {
        showError(dateInput);
        isValid = false;
    } else {
        const selectedDate = new Date(dateVal);
        const today = new Date();
        today.setHours(23, 59, 59, 999);
        if (selectedDate > today) {
            showError(dateInput);
            isValid = false;
        } else {
            clearError(dateInput);
        }
    }

    return isValid;
}

function showError(element) {
    element.classList.add('is-invalid');
}

function clearError(element) {
    element.classList.remove('is-invalid');
}

function resetForm() {
    form.reset();
    editIdInput.value = '';
    
    categorySelect.disabled = true;
    categorySelect.innerHTML = '<option value="" selected disabled>Chọn danh mục</option>';
    
    formTitle.textContent = 'Thêm Giao dịch';
    submitBtn.textContent = 'Thêm';
    submitBtn.classList.replace('btn-success', 'btn-primary');
    cancelBtn.classList.add('d-none');
    
    // Clear validation states
    clearError(nameInput);
    clearError(typeSelect);
    clearError(amountInput);
    clearError(categorySelect);
    clearError(dateInput);
}

// Ensure function is exposed globally for onclick handlers inline
window.editTransaction = function(id) {
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    editIdInput.value = transaction.id;
    nameInput.value = transaction.name;
    typeSelect.value = transaction.type;
    
    // Setup category options based on type and select chosen value
    updateCategoryOptions(transaction.type, transaction.category);
    
    amountInput.value = transaction.amount;
    dateInput.value = transaction.date;

    formTitle.textContent = 'Chỉnh sửa Giao dịch';
    submitBtn.textContent = 'Lưu thay đổi';
    // Switch button appearance to indicate updating
    if (submitBtn.classList.contains('btn-primary')) {
        submitBtn.classList.replace('btn-primary', 'btn-success');
    }
    cancelBtn.classList.remove('d-none');
    
    // Clear validation errors from previous tries
    clearError(nameInput);
    clearError(typeSelect);
    clearError(amountInput);
    clearError(categorySelect);
    clearError(dateInput);
    
    // Smooth scroll back to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.deleteTransaction = function(id) {
    if (confirm('Bạn có chắc chắn muốn xóa giao dịch này không?')) {
        transactions = transactions.filter(t => t.id !== id);
        saveData();
        renderTransactions();
        updateSummary();
    }
}

function renderTransactions() {
    transactionList.innerHTML = '';

    const fType = filterType.value;
    const fCategory = filterCategory.value;
    const fStartDate = filterStartDate.value;
    const fEndDate = filterEndDate.value;

    // Filter array
    const filtered = transactions.filter(t => {
        if (fType !== 'all' && t.type !== fType) return false;
        if (fCategory !== 'all' && t.category !== fCategory) return false;
        if (fStartDate && t.date < fStartDate) return false;
        if (fEndDate && t.date > fEndDate) return false;
        return true;
    });

    // Sort by Date Descending (Newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filtered.length === 0) {
        transactionList.innerHTML = '<div class="col-12 text-center text-muted py-4">Chưa có giao dịch nào phù hợp.</div>';
        return;
    }

    // Render nodes
    filtered.forEach(t => {
        const isIncome = t.type === 'income';
        const borderClass = isIncome ? 'border-income' : 'border-expense';
        
        const cardCol = document.createElement('div');
        cardCol.className = 'col-md-6 mb-3';
        
        const formattedAmount = new Intl.NumberFormat('vi-VN').format(t.amount) + ' VND';
        
        cardCol.innerHTML = `
            <div class="card transaction-card ${borderClass} h-100 p-3">
                <div class="card-title text-truncate" title="${t.name}">${t.name}</div>
                <div class="card-subtitle mb-2">${t.category} - ${t.date}</div>
                <div class="amount">${formattedAmount}</div>
                <div class="mt-auto pt-2">
                    <button class="btn btn-warning btn-sm me-1 text-white border-0" onclick="editTransaction(${t.id})">Sửa</button>
                    <button class="btn btn-danger btn-sm border-0" onclick="deleteTransaction(${t.id})">Xóa</button>
                </div>
            </div>
        `;
        transactionList.appendChild(cardCol);
    });
}

function updateSummary() {
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;

    totalIncomeEl.textContent = new Intl.NumberFormat('vi-VN').format(totalIncome) + ' VND';
    totalExpenseEl.textContent = new Intl.NumberFormat('vi-VN').format(totalExpense) + ' VND';
    balanceEl.textContent = new Intl.NumberFormat('vi-VN').format(balance) + ' VND';
}

function saveData() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}
