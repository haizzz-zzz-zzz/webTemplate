import React from 'react';

function Header({ currentTab, setCurrentTab }) {
  return (
    <div className="d-flex flex-column gap-1 mb-4">
      <button 
        className={`btn w-100 rounded-1 shadow-sm ${currentTab === 'add' ? 'btn-success' : 'btn-outline-success'}`}
        style={{ padding: '12px 0', fontSize: '1.1rem', backgroundColor: currentTab === 'add' ? '#4CAF50' : '#4CAF50', color: 'white', border: 'none' }}
        onClick={() => setCurrentTab('add')}
      >
        Thêm sách
      </button>
      <button 
        className={`btn w-100 rounded-1 shadow-sm ${currentTab === 'manager' ? 'btn-success' : 'btn-outline-success'}`}
        style={{ padding: '12px 0', fontSize: '1.1rem', backgroundColor: currentTab === 'manager' ? '#4CAF50' : '#4CAF50', color: 'white', border: 'none' }}
        onClick={() => setCurrentTab('manager')}
      >
        Quản lý thư viện
      </button>
    </div>
  );
}

export default Header;
