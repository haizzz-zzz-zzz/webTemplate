import { useState, useEffect, useMemo, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Summary from './components/Summary'
import FilterBar from './components/FilterBar'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { SAMPLE } from './data'

const STORAGE_KEY = 'expense-tracker-v1'

const defaultFilter = { type: '', category: '', from: '', to: '', search: '' }

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : SAMPLE
    } catch { return SAMPLE }
  })
  const [editTxn, setEditTxn] = useState(null)
  const [filter, setFilter] = useState(defaultFilter)

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  }, [transactions])

  // Summary totals with useMemo
  const { income, expense, balance } = useMemo(() => {
    const income  = transactions.filter(t => t.type === 'thu').reduce((s, t) => s + t.amount, 0)
    const expense = transactions.filter(t => t.type === 'chi').reduce((s, t) => s + t.amount, 0)
    return { income, expense, balance: income - expense }
  }, [transactions])

  // Filtered list with useMemo
  const filtered = useMemo(() => {
    return transactions.filter(t => {
      if (filter.type && t.type !== filter.type) return false
      if (filter.category && t.category !== filter.category) return false
      if (filter.from && t.date < filter.from) return false
      if (filter.to   && t.date > filter.to)   return false
      if (filter.search && !t.name.toLowerCase().includes(filter.search.toLowerCase())) return false
      return true
    }).sort((a, b) => b.date.localeCompare(a.date))
  }, [transactions, filter])

  const handleSave = useCallback((data) => {
    if (editTxn) {
      setTransactions(ts => ts.map(t => t.id === editTxn.id ? { ...t, ...data } : t))
      setEditTxn(null)
    } else {
      setTransactions(ts => [...ts, { id: uuidv4(), ...data }])
    }
  }, [editTxn])

  const handleEdit = useCallback((txn) => setEditTxn(txn), [])

  const handleDelete = useCallback((id) => {
    if (window.confirm('Bạn có chắc muốn xóa giao dịch này?'))
      setTransactions(ts => ts.filter(t => t.id !== id))
  }, [])

  return (
    <div className="container py-5" style={{ maxWidth: 1000 }}>
      {/* Wrapper */}
      <div className="card shadow border-0 rounded-4 overflow-hidden mb-5">
        
        {/* Header Title */}
        <div className="bg-white pt-4 pb-2 border-bottom">
          <h2 className="text-center fw-bold text-dark fs-4 mb-0">
            <i className="bi bi-wallet-fill text-primary me-2"></i>
            Quản lý Chi tiêu Cá nhân
          </h2>
        </div>

        {/* Summary */}
        <div className="bg-white">
          <Summary income={income} expense={expense} balance={balance} />
        </div>

        {/* Filter */}
        <div className="bg-white pb-1">
          <FilterBar filter={filter} onChange={setFilter} />
        </div>

        {/* Main content: form left, list right */}
        <div className="row g-0 bg-white border-top">
          <div className="col-12 col-md-4 border-end-md">
            <TransactionForm
              onSave={handleSave}
              editTxn={editTxn}
              onCancelEdit={() => setEditTxn(null)}
            />
          </div>
          <div className="col-12 col-md-8">
            <div className="p-4 h-100 bg-white">
              <h6 className="fw-bold mb-4 fs-6 text-dark d-flex justify-content-between align-items-center">
                <span>
                  <i className="bi bi-list-ul me-2 text-primary"></i>
                  Danh sách Giao dịch
                </span>
                <span className="badge bg-secondary rounded-pill px-3 py-2 fw-normal shadow-sm">{filtered.length} khoản</span>
              </h6>
              <div style={{ maxHeight: '520px', overflowY: 'auto' }} className="pe-2">
                <TransactionList
                  transactions={filtered}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
