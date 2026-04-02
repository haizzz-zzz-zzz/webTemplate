import React, { useState } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import data from './data';

function App() {
  const [currentTab, setCurrentTab] = useState('manager'); // 'manager' | 'add'
  const [books, setBooks] = useState(data);
  const [editingBook, setEditingBook] = useState(null);

  const handleEdit = (book) => {
    setEditingBook(book);
    setCurrentTab('add');
  };

  const handleDelete = (maSach) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá sách này không?')) {
      setBooks(books.filter(b => b.maSach !== maSach));
    }
  };

  const handleSaveBook = (savedBook) => {
    if (editingBook) {
      setBooks(books.map(b => b.maSach === savedBook.maSach ? savedBook : b));
    } else {
      setBooks([...books, savedBook]);
    }
    setEditingBook(null);
    setCurrentTab('manager');
  };

  return (
    <div className="container mt-4 mb-5" style={{ maxWidth: '1200px' }}>
      <Header currentTab={currentTab} setCurrentTab={(tab) => {
        setCurrentTab(tab);
        if (tab === 'add') setEditingBook(null);
      }} />
      
      <div className="border border-top-0 p-4 bg-white shadow-sm">
        {currentTab === 'manager' ? (
          <BookList books={books} onEdit={handleEdit} onDelete={handleDelete} />
        ) : (
          <BookForm 
            editingBook={editingBook} 
            onSave={handleSaveBook} 
            onCancel={() => { setCurrentTab('manager'); setEditingBook(null); }} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
