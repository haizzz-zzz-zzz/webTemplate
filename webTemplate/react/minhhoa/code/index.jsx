import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './bootstrap/css/bootstrap.min.css'; // Assuming bootstrap is in /code/bootstrap

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
