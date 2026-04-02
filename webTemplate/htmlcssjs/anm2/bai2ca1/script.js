document.addEventListener("DOMContentLoaded", () => {
    const productForm = document.getElementById("productForm");
    const productName = document.getElementById("productName");
    const productDesc = document.getElementById("productDesc");
    const productPrice = document.getElementById("productPrice");
    const productStatus = document.getElementById("productStatus");
    const productList = document.getElementById("productList");
    const sortSelect = document.getElementById("sortSelect");

    // Lấy dữ liệu từ localStorage. Nếu rỗng thì dùng dữ liệu mẫu từ data.js
    let products = JSON.parse(localStorage.getItem('products'));
    if (!products || products.length === 0) {
        products = typeof initialProducts !== 'undefined' ? initialProducts : [];
        if (products.length > 0) {
            localStorage.setItem('products', JSON.stringify(products));
        }
    }

    // Tải dữ liệu ban đầu
    renderProducts();

    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Biến kiểm tra form hợp lệ
        let isValid = true;
        
        // Validate Tên Sản Phẩm: không trống, không quá 30 kí tự
        const nameVal = productName.value.trim();
        if (nameVal === "" || nameVal.length > 30) {
            productName.classList.add("is-invalid");
            isValid = false;
        } else {
            productName.classList.remove("is-invalid");
        }

        // Validate Mô Tả: không trống
        const descVal = productDesc.value.trim();
        if (descVal === "") {
            productDesc.classList.add("is-invalid");
            isValid = false;
        } else {
            productDesc.classList.remove("is-invalid");
        }

        // Validate Giá: không trống, là số >= 0
        const priceVal = parseFloat(productPrice.value);
        if (isNaN(priceVal) || priceVal < 0 || productPrice.value.trim() === "") {
            productPrice.classList.add("is-invalid");
            isValid = false;
        } else {
            productPrice.classList.remove("is-invalid");
        }

        if (!isValid) return;

        // Thêm sản phẩm
        const newProduct = {
            id: Date.now().toString(),
            name: nameVal,
            description: descVal,
            price: priceVal,
            status: productStatus.value
        };

        products.push(newProduct);
        saveAndRender();
        
        // Xóa dữ liệu trên form
        productForm.reset();
        productName.classList.remove("is-invalid");
        productDesc.classList.remove("is-invalid");
        productPrice.classList.remove("is-invalid");
    });

    sortSelect.addEventListener("change", () => {
        renderProducts();
    });

    function renderProducts() {
        productList.innerHTML = "";

        // Clone mảng để sort không ảnh hưởng mảng gốc
        let displayProducts = [...products];
        const sortBy = sortSelect.value;

        // Sắp xếp theo lựa chọn
        if (sortBy === "price_asc") {
            displayProducts.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price_desc") {
            displayProducts.sort((a, b) => b.price - a.price);
        } else if (sortBy === "status_con") {
            displayProducts.sort((a, b) => {
                if (a.status === b.status) return 0;
                return a.status === "con_hang" ? -1 : 1;
            });
        } else if (sortBy === "status_het") {
            displayProducts.sort((a, b) => {
                if (a.status === b.status) return 0;
                return a.status === "het_hang" ? -1 : 1;
            });
        }

        if (displayProducts.length === 0) {
            productList.innerHTML = "<li class='list-group-item text-center text-muted py-4'>Chưa có sản phẩm nào.</li>";
            return;
        }

        displayProducts.forEach(product => {
            const li = document.createElement("li");
            li.className = "list-group-item product-item d-flex justify-content-between align-items-center";
            
            const isConHang = product.status === "con_hang";
            const statusText = isConHang ? "Còn hàng" : "Hết hàng";
            const statusColor = isConHang ? "text-success" : "text-danger";
            const toggleBtnText = isConHang ? "Đánh dấu Hết hàng" : "Đánh dấu Còn hàng";

            li.innerHTML = `
                <div style="flex: 1;">
                    <div class="product-title">${escapeHTML(product.name)}</div>
                    <div class="product-desc">${escapeHTML(product.description)}</div>
                    <div class="product-price"><strong>Giá:</strong> ${product.price.toLocaleString("vi-VN")}đ</div>
                    <div class="product-status">Trạng thái: <span class="${statusColor} fw-semibold">${statusText}</span></div>
                </div>
                <div class="d-flex ms-3">
                    <button class="btn btn-sm btn-toggle-status me-2" onclick="toggleStatus('${product.id}')">${toggleBtnText}</button>
                    <button class="btn btn-sm btn-delete px-3" onclick="deleteProduct('${product.id}')">Xóa</button>
                </div>
            `;
            productList.appendChild(li);
        });
    }

    // Expose functions to global scope (cho thuộc tính onclick)
    window.toggleStatus = function(id) {
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            products[productIndex].status = products[productIndex].status === "con_hang" ? "het_hang" : "con_hang";
            saveAndRender();
        }
    };

    window.deleteProduct = function(id) {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            products = products.filter(p => p.id !== id);
            saveAndRender();
        }
    };

    function saveAndRender() {
        localStorage.setItem("products", JSON.stringify(products));
        renderProducts();
    }

    // Tránh bị lỗi tiêm nhúng XSS
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.innerText = str;
        return div.innerHTML;
    }
});
