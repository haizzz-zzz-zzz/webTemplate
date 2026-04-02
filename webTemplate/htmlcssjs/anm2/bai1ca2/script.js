// script.js - Gộp tất cả logic JS (toast, form, bookings) vào một file

// ==================== TOAST NOTIFICATION ====================
function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    const icon =
        type === "success"
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add("show"));

    // Auto remove after 3s
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==================== VALIDATION ====================
const validators = {
    bookingId: (value) => {
        if (!value) return "Mã đặt phòng không được để trống";
        if (!/^PH\d{6}$/.test(value))
            return "Mã đặt phòng phải có định dạng PH + 6 chữ số (VD: PH123456)";
        return "";
    },
    customerName: (value) => {
        if (!value) return "Họ tên khách không được để trống";
        if (value.length < 2 || value.length > 50)
            return "Họ tên phải từ 2-50 ký tự";
        if (!/^[a-zA-ZÀ-ỹ0-9\s]+$/.test(value))
            return "Họ tên chỉ chứa chữ, số và khoảng trắng";
        return "";
    },
    phone: (value) => {
        if (!value) return "Số điện thoại không được để trống";
        if (!/^0\d{9}$/.test(value))
            return "Số điện thoại phải gồm 10 chữ số, bắt đầu bằng 0";
        return "";
    },
    roomType: (value) => {
        if (!value) return "Vui lòng chọn loại phòng";
        return "";
    },
    checkIn: (value, formData) => {
        if (!value) return "Ngày nhận phòng không được để trống";
        if (formData && formData.checkOut) {
            const cin = new Date(value);
            const cout = new Date(formData.checkOut);
            if (cin >= cout) return "Ngày nhận phòng phải trước ngày trả phòng";
        }
        return "";
    },
    checkOut: (value, formData) => {
        if (!value) return "Ngày trả phòng không được để trống";
        if (formData && formData.checkIn) {
            const cin = new Date(formData.checkIn);
            const cout = new Date(value);
            const diffDays = (cout - cin) / (1000 * 60 * 60 * 24);
            if (diffDays < 1) return "Check-out phải sau Check-in ít nhất 1 ngày";
            if (diffDays > 30) return "Thời gian lưu trú không quá 30 ngày";
        }
        return "";
    },
    adults: (value) => {
        const num = parseInt(value);
        if (isNaN(num) || num < 1 || num > 4)
            return "Số người lớn phải từ 1-4 người";
        return "";
    },
    children: (value) => {
        const num = parseInt(value);
        if (isNaN(num) || num < 0 || num > 6)
            return "Số trẻ em phải từ 0-6 người";
        return "";
    },
    promoCode: (value) => {
        if (!value) return ""; // optional
        if (value.length !== 7 || !/^SAVE\d{2}%$/.test(value))
            return "Mã khuyến mãi phải có 8 ký tự, format SAVE20%";
        return "";
    },
    confirmPromo: (value, formData) => {
        if (formData && formData.promoCode && value !== formData.promoCode)
            return "Xác nhận mã phải khớp với mã khuyến mãi";
        return "";
    },
};

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const errorEl = field.parentElement.querySelector(".error-message");
    if (message) {
        field.classList.add("is-invalid");
        field.classList.remove("is-valid");
        if (errorEl) errorEl.textContent = message;
    } else {
        field.classList.remove("is-invalid");
        field.classList.add("is-valid");
        if (errorEl) errorEl.textContent = "";
    }
}

function getFormData() {
    return {
        bookingId: document.getElementById("bookingId")?.value.trim() || "",
        customerName:
            document.getElementById("customerName")?.value.trim() || "",
        phone: document.getElementById("phone")?.value.trim() || "",
        roomType: document.getElementById("roomType")?.value || "",
        checkIn: document.getElementById("checkIn")?.value || "",
        checkOut: document.getElementById("checkOut")?.value || "",
        adults: document.getElementById("adults")?.value || "",
        children: document.getElementById("children")?.value || "",
        promoCode: document.getElementById("promoCode")?.value.trim() || "",
        confirmPromo:
            document.getElementById("confirmPromo")?.value.trim() || "",
    };
}

function validateForm() {
    const formData = getFormData();
    let isValid = true;

    for (const field in validators) {
        const error = validators[field](formData[field], formData);
        showFieldError(field, error);
        if (error) isValid = false;
    }

    return isValid;
}

// ==================== FORM PAGE (add-booking.html) ====================
function initFormPage() {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    initSampleData();

    // Check if editing
    const params = new URLSearchParams(window.location.search);
    const editId = params.get("edit");

    if (editId) {
        const booking = findBookingById(editId);
        if (booking) {
            document.getElementById("bookingId").value = booking.bookingId;
            document.getElementById("bookingId").readOnly = true;
            document.getElementById("customerName").value =
                booking.customerName;
            document.getElementById("phone").value = booking.phone;
            document.getElementById("roomType").value = booking.roomType;
            document.getElementById("checkIn").value = booking.checkIn;
            document.getElementById("checkOut").value = booking.checkOut;
            document.getElementById("adults").value = booking.adults;
            document.getElementById("children").value = booking.children;
            document.getElementById("promoCode").value =
                booking.promoCode || "";
            document.getElementById("confirmPromo").value =
                booking.promoCode || "";

            const submitBtn = document.getElementById("submitBtn");
            if (submitBtn) submitBtn.textContent = "Cập nhật đặt phòng";

            const pageTitle = document.getElementById("formTitle");
            if (pageTitle) pageTitle.textContent = "Thêm / Cập nhật đặt phòng";
        }
    }

    // Real-time validation
    const fields = [
        "bookingId",
        "customerName",
        "phone",
        "roomType",
        "checkIn",
        "checkOut",
        "adults",
        "children",
        "promoCode",
        "confirmPromo",
    ];
    fields.forEach((fieldId) => {
        const el = document.getElementById(fieldId);
        if (el) {
            el.addEventListener("input", () => {
                const formData = getFormData();
                const error = validators[fieldId](formData[fieldId], formData);
                showFieldError(fieldId, error);
            });
            el.addEventListener("blur", () => {
                const formData = getFormData();
                const error = validators[fieldId](formData[fieldId], formData);
                showFieldError(fieldId, error);
            });
        }
    });

    // Submit handler
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showToast("Vui lòng kiểm tra lại thông tin!", "error");
            return;
        }

        const formData = getFormData();
        delete formData.confirmPromo;

        if (editId) {
            updateBooking(editId, formData);
            showToast("Cập nhật đặt phòng thành công!", "success");
        } else {
            // Check duplicate ID
            if (findBookingById(formData.bookingId)) {
                showToast("Mã đặt phòng đã tồn tại!", "error");
                showFieldError("bookingId", "Mã đặt phòng đã tồn tại");
                return;
            }
            addBooking(formData);
            showToast(
                `Đặt phòng ${formData.bookingId} thành công!`,
                "success"
            );
        }

        setTimeout(() => {
            window.location.href = "bookings.html";
        }, 2000);
    });

    // Reset handler
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            form.reset();
            const fields = form.querySelectorAll(".is-invalid, .is-valid");
            fields.forEach((f) => {
                f.classList.remove("is-invalid", "is-valid");
            });
            const errors = form.querySelectorAll(".error-message");
            errors.forEach((e) => (e.textContent = ""));
        });
    }
}

// ==================== BOOKINGS PAGE (bookings.html) ====================
function initBookingsPage() {
    const table = document.getElementById("bookingsTable");
    if (!table) return;

    initSampleData();
    renderBookings(getBookings());

    // Search
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const keyword = searchInput.value.trim();
            const results = keyword ? searchBookings(keyword) : getBookings();
            renderBookings(results);
        });
    }

    // Reload button
    const reloadBtn = document.getElementById("reloadBtn");
    if (reloadBtn) {
        reloadBtn.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            renderBookings(getBookings());
        });
    }
}

function renderBookings(bookings) {
    const tbody = document.getElementById("bookingsBody");
    if (!tbody) return;

    if (bookings.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" class="text-center">Không có dữ liệu đặt phòng</td></tr>`;
    } else {
        tbody.innerHTML = bookings
            .map(
                (b) => `
            <tr>
                <td>${b.bookingId}</td>
                <td>${b.customerName}</td>
                <td>${b.phone}</td>
                <td>${b.roomType}</td>
                <td>${b.checkIn}</td>
                <td>${b.checkOut}</td>
                <td>${b.adults}/${b.children}</td>
                <td>${b.promoCode || ""}</td>
                <td>
                    <span class="badge ${b.status === "Booked" ? "badge-booked" : "badge-cancelled"}">
                        ${b.status}
                    </span>
                </td>
                <td class="actions-cell">
                    ${
                        b.status !== "Cancelled"
                            ? `<a href="add-booking.html?edit=${b.bookingId}" class="btn-action btn-edit">Sửa</a>
                               <button class="btn-action btn-cancel" onclick="handleCancel('${b.bookingId}')">Hủy</button>`
                            : `<a href="add-booking.html?edit=${b.bookingId}" class="btn-action btn-edit">Sửa</a>
                               <button class="btn-action btn-cancelled-disabled" disabled>Đã hủy</button>`
                    }
                </td>
            </tr>
        `
            )
            .join("");
    }

    updateStats(bookings);
}

function handleCancel(bookingId) {
    if (confirm(`Bạn có chắc muốn hủy đặt phòng ${bookingId}?`)) {
        cancelBooking(bookingId);
        showToast("Hủy đặt phòng thành công!", "success");
        renderBookings(getBookings());
    }
}

function updateStats(bookings) {
    const totalEl = document.getElementById("totalBookings");
    const roomsEl = document.getElementById("availableRooms");
    const revenueEl = document.getElementById("expectedRevenue");

    const totalBookings = bookings.length;
    const activeBookings = bookings.filter(
        (b) => b.status === "Booked"
    ).length;
    const totalRooms = 100; // Giả sử 100 phòng
    const availableRooms = totalRooms - activeBookings;

    // Tính doanh thu dự kiến
    let revenue = 0;
    bookings.forEach((b) => {
        if (b.status === "Booked" && ROOM_PRICES[b.roomType]) {
            const cin = new Date(b.checkIn);
            const cout = new Date(b.checkOut);
            const nights = Math.max(
                1,
                (cout - cin) / (1000 * 60 * 60 * 24)
            );
            revenue += ROOM_PRICES[b.roomType] * nights;
        }
    });

    if (totalEl) totalEl.textContent = totalBookings;
    if (roomsEl) roomsEl.textContent = availableRooms;
    if (revenueEl)
        revenueEl.textContent = revenue.toLocaleString("vi-VN");
}

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", () => {
    initFormPage();
    initBookingsPage();
});
