const productsData = [
    {
        "id": 1,
        "name": "Áo Thun Nam",
        "description": "Áo thun chất liệu cotton, thời trang.",
        "price": 250000,
        "status": "Còn hàng"
    },
    {
        "id": 2,
        "name": "Giày Thể Thao",
        "description": "Giày thể thao cao cấp, phù hợp mọi hoạt động.",
        "price": 850000,
        "status": "Hết hàng"
    }
];

// Khởi tạo dữ liệu vào localStorage nếu chưa có
if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(productsData));
}
