// data.js - Dữ liệu mẫu cho hệ thống quản lý đặt phòng khách sạn

const ROOM_TYPES = ["Standard", "Deluxe", "Suite", "VIP"];

const ROOM_PRICES = {
    Standard: 500000,
    Deluxe: 800000,
    Suite: 1200000,
    VIP: 2000000,
};

const sampleBookings = [
    {
        bookingId: "PH000001",
        customerName: "Nguyen Van A",
        phone: "0912345678",
        roomType: "Standard",
        checkIn: "2026-04-01",
        checkOut: "2026-04-04",
        adults: 2,
        children: 1,
        promoCode: "SAVE20%",
        status: "Booked",
        createdAt: "2026-03-28",
    },
    {
        bookingId: "PH000002",
        customerName: "Le Thi B",
        phone: "0987654321",
        roomType: "Deluxe",
        checkIn: "2026-05-10",
        checkOut: "2026-05-13",
        adults: 1,
        children: 0,
        promoCode: "SAVE20%",
        status: "Booked",
        createdAt: "2026-03-29",
    },
    {
        bookingId: "PH000003",
        customerName: "Tran Van C",
        phone: "0901122334",
        roomType: "Suite",
        checkIn: "2026-04-15",
        checkOut: "2026-04-20",
        adults: 3,
        children: 2,
        promoCode: "SAVE20%",
        status: "Booked",
        createdAt: "2026-03-30",
    },
    {
        bookingId: "PH000004",
        customerName: "Pham Thi D",
        phone: "0934455667",
        roomType: "VIP",
        checkIn: "2026-05-01",
        checkOut: "2026-05-02",
        adults: 2,
        children: 0,
        promoCode: "SAVE20%",
        status: "Booked",
        createdAt: "2026-03-31",
    },
    {
        bookingId: "PH000005",
        customerName: "Hoang Van E",
        phone: "0977889900",
        roomType: "Deluxe",
        checkIn: "2026-04-12",
        checkOut: "2026-04-18",
        adults: 4,
        children: 1,
        promoCode: "SAVE20%",
        status: "Cancelled",
        createdAt: "2026-04-01",
    },
];

// Khởi tạo dữ liệu mẫu vào LocalStorage nếu chưa có
function initSampleData() {
    if (!localStorage.getItem("bookings")) {
        localStorage.setItem("bookings", JSON.stringify(sampleBookings));
    }
}

// Lấy danh sách booking từ LocalStorage
function getBookings() {
    const data = localStorage.getItem("bookings");
    return data ? JSON.parse(data) : [];
}

// Lưu danh sách booking vào LocalStorage
function saveBookings(bookings) {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

// Thêm booking mới
function addBooking(booking) {
    const bookings = getBookings();
    booking.createdAt = new Date().toISOString().split("T")[0];
    booking.status = "Booked";
    bookings.push(booking);
    saveBookings(bookings);
}

// Cập nhật booking
function updateBooking(bookingId, updatedData) {
    const bookings = getBookings();
    const index = bookings.findIndex((b) => b.bookingId === bookingId);
    if (index !== -1) {
        bookings[index] = { ...bookings[index], ...updatedData };
        saveBookings(bookings);
        return true;
    }
    return false;
}

// Hủy booking (chuyển trạng thái thành Cancelled)
function cancelBooking(bookingId) {
    const bookings = getBookings();
    const index = bookings.findIndex((b) => b.bookingId === bookingId);
    if (index !== -1) {
        bookings[index].status = "Cancelled";
        saveBookings(bookings);
        return true;
    }
    return false;
}

// Tìm booking theo ID
function findBookingById(bookingId) {
    const bookings = getBookings();
    return bookings.find((b) => b.bookingId === bookingId) || null;
}

// Tìm kiếm booking theo mã hoặc tên khách
function searchBookings(keyword) {
    const bookings = getBookings();
    const kw = keyword.toLowerCase().trim();
    return bookings.filter(
        (b) =>
            b.bookingId.toLowerCase().includes(kw) ||
            b.customerName.toLowerCase().includes(kw)
    );
}
