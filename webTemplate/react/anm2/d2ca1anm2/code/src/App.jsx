import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const initialData = [
      { id: '1', name: 'Áo Thun Nam', description: 'Áo thun chất liệu cotton, thời trang.', price: 250000, status: 'Còn hàng' },
      { id: '2', name: 'Giày Thể Thao', description: 'Giày thể thao cao cấp, phù hợp mọi hoạt động.', price: 850000, status: 'Hết hàng' },
    ];
    setProducts(initialData);
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setShowForm(false); // Quay về màn hình list sau khi thêm
  };

  const handleUpdateStatus = (id, newStatus) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        return { ...product, status: newStatus };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
  };

  return (
    <>
      <div className="container py-5 bg-white min-vh-100" style={{ maxWidth: '960px' }}>
        <h2 className="text-center fw-bold text-dark mb-4">Quản Lý Sản Phẩm</h2>

        {showForm ? (
          <div>
            <button
              className="btn btn-outline-secondary mb-3"
              onClick={() => setShowForm(false)}
            >
              ← Quay Lại
            </button>
            <ProductForm onAddProduct={handleAddProduct} />
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-start mb-3">
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                + Thêm Mới
              </button>
            </div>
            <ProductList
              products={products}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDeleteProduct}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
