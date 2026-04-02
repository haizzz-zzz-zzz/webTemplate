# 📋 Task Manager - Ứng dụng Quản lý Công việc

Một ứng dụng React hiện đại để quản lý công việc hàng ngày với các tính năng đầy đủ.

## ✨ Tính năng chính

- ✅ **Thêm công việc mới** - Với thông tin chi tiết (tiêu đề, mô tả, độ ưu tiên, hạn chót)
- 📝 **Chỉnh sửa công việc** - Cập nhật thông tin từng công việc
- ✓ **Đánh dấu hoàn thành** - Theo dõi tiến độ công việc
- 🗑️ **Xóa công việc** - Loại bỏ công việc không cần thiết
- 🔍 **Lọc công việc** - Theo trạng thái và độ ưu tiên
- 💾 **Lưu dữ liệu** - Tự động lưu vào localStorage
- 📱 **Responsive Design** - Hoạt động trên mọi thiết bị

## 🛠️ Yêu cầu kỹ thuật

- Node.js (v16+)
- npm hoặc yarn

## 📦 Cài đặt

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Chạy development server:**
```bash
npm run dev
```

3. **Build cho production:**
```bash
npm run build
```

4. **Preview production build:**
```bash
npm run preview
```

## 📁 Cấu trúc dự án

```
code/
├── public/                    # File tĩnh
├── src/
│   ├── components/           # React Components
│   │   ├── TaskForm/        # Form để thêm/sửa công việc
│   │   ├── TaskList/        # Danh sách công việc
│   │   ├── TaskItem/        # Từng công việc (Card)
│   │   └── FilterBar/       # Thanh lọc
│   ├── utils/               # Hàm tiện ích
│   │   ├── validator.js     # Xác thực dữ liệu
│   │   └── taskHelper.js    # Hàm hỗ trợ
│   ├── hooks/               # Custom Hooks
│   │   └── useLocalStorage.js
│   ├── assets/              # Ảnh, icon
│   ├── App.jsx              # Component chính
│   ├── App.css              # CSS chính
│   ├── index.css            # CSS toàn cục
│   └── main.jsx             # Entry point
├── index.html               # HTML duy nhất
├── package.json             # Thông tin dự án
└── vite.config.js           # Cấu hình Vite
```

## 🔍 Xác thực dữ liệu

### Tiêu đề công việc:
- ✓ Không được để trống
- ✓ Tối đa 50 ký tự

### Mô tả:
- ✓ Tối đa 200 ký tự

### Độ ưu tiên:
- ✓ Phải chọn một trong: Thấp, Trung bình, Cao

### Hạn hoàn thành:
- ✓ Không được để trống
- ✓ Phải là ngày trong tương lai

## 🎨 Công nghệ sử dụng

- **React 18** - Framework UI
- **Vite** - Build tool
- **Bootstrap 5** - CSS Framework
- **UUID** - Sinh ID duy nhất
- **React Hooks** - useState, useEffect, useMemo, useCallback

## 💡 Ghi chú

- Dữ liệu được lưu tự động vào localStorage
- Dữ liệu sẽ được khôi phục khi tải lại trang
- Các công việc được sắp xếp theo độ ưu tiên (Cao → Trung bình → Thấp)

## 📝 Tác giả

Ứng dụng được phát triển như một bài tập ReactJS.

## 📄 Giấy phép

MIT
