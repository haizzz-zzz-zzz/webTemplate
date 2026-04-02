import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Import Bootstrap CSS local
import '../bootstrap/css/bootstrap.min.css'

// Khởi tạo dữ liệu mẫu nếu chưa có
import { initialData } from '../data.js'

if (!localStorage.getItem('students')) {
  localStorage.setItem('students', JSON.stringify(initialData));
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
