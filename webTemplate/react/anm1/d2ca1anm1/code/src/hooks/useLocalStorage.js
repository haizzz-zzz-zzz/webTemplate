import { useState, useEffect } from 'react';

// Custom hook để lưu và lấy dữ liệu từ localStorage
export const useLocalStorage = (key, initialValue) => {
  // State để lưu giá trị
  // logic được set cho state mỗi lần component mount
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Lấy từ localStorage theo key
      const item = window.localStorage.getItem(key);
      // Parse JSON hoặc trả về initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Return một version của setCurrValue mà ngoài
  // việc lưu value vào state còn lưu vào localStorage
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
