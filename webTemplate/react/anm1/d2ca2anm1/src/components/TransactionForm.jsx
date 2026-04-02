import { useState, useEffect } from 'react'

const INCOME_CATS  = ['Lương','Thưởng','Đầu tư']
const EXPENSE_CATS = ['Ăn uống','Di chuyển','Giải trí','Học tập','Khác']
const empty = { name: '', type: '', amount: '', category: '', date: '' }

export default function TransactionForm({ onSave, editTxn, onCancelEdit }) {
  const [form, setForm] = useState(empty)
  const [errors, setErrors] = useState({})

  // Fill form when editing
  useEffect(() => {
    if (editTxn) setForm({ name: editTxn.name, type: editTxn.type, amount: String(editTxn.amount), category: editTxn.category, date: editTxn.date })
    else setForm(empty)
  }, [editTxn])

  const cats = form.type === 'thu' ? INCOME_CATS : form.type === 'chi' ? EXPENSE_CATS : []
  const today = new Date().toISOString().split('T')[0]

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Không được để trống'
    else if (form.name.trim().length < 3 || form.name.trim().length > 100) e.name = 'Từ 3 đến 100 ký tự'
    if (!form.type) e.type = 'Vui lòng chọn loại'
    if (!form.amount) e.amount = 'Không được để trống'
    else {
      const n = Number(form.amount)
      if (isNaN(n) || n <= 0) e.amount = 'Phải là số dương'
      else if (n >= 1_000_000_000) e.amount = 'Nhỏ hơn 1,000,000,000'
    }
    if (!form.category) e.category = 'Vui lòng chọn danh mục'
    if (!form.date) e.date = 'Không được để trống'
    else if (form.date > today) e.date = 'Không được là ngày tương lai'
    return e
  }

  const set = (k, v) => {
    const updated = { ...form, [k]: v }
    // Reset category when type changes
    if (k === 'type') updated.category = ''
    setForm(updated)
    setErrors(e => ({ ...e, [k]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave({ ...form, name: form.name.trim(), amount: Number(form.amount) })
    setForm(empty)
    setErrors({})
  }

  const handleCancel = () => {
    setForm(empty); setErrors({})
    if (onCancelEdit) onCancelEdit()
  }

  return (
    <div className="card shadow-none border-0 h-100 bg-light bg-opacity-50">
      <div className="card-body p-4 border-end-0 border-md-end border-light">
        <h6 className="fw-bold mb-4 text-dark fs-6 d-flex align-items-center">
          <i className="bi bi-plus-circle-fill me-2 text-primary"></i>
          {editTxn ? 'Chỉnh sửa giao dịch' : 'Thêm Giao dịch'}
        </h6>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-secondary mb-1">Tên giao dịch</label>
            <input className={`form-control form-control-sm ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Nhập tên..." value={form.name} onChange={e => set('name', e.target.value)} />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Type */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-secondary mb-1">Loại</label>
            <select className={`form-select form-select-sm ${errors.type ? 'is-invalid' : ''}`}
              value={form.type} onChange={e => set('type', e.target.value)}>
              <option value="">Chọn loại</option>
              <option value="thu">Thu nhập</option>
              <option value="chi">Chi tiêu</option>
            </select>
            {errors.type && <div className="invalid-feedback">{errors.type}</div>}
          </div>

          {/* Amount */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-secondary mb-1">Số tiền (VND)</label>
            <input type="number" className={`form-control form-control-sm ${errors.amount ? 'is-invalid' : ''}`}
              placeholder="VD: 50000" value={form.amount} onChange={e => set('amount', e.target.value)} min="1" />
            {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-secondary mb-1">Danh mục</label>
            <select className={`form-select form-select-sm ${errors.category ? 'is-invalid' : ''}`}
              value={form.category} onChange={e => set('category', e.target.value)} disabled={!form.type}>
              <option value="">Chọn danh mục</option>
              {cats.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
          </div>

          {/* Date */}
          <div className="mb-4">
            <label className="form-label fw-semibold small text-secondary mb-1">Ngày giao dịch</label>
            <input type="date" className={`form-control form-control-sm ${errors.date ? 'is-invalid' : ''}`}
              value={form.date} max={today} onChange={e => set('date', e.target.value)} />
            {errors.date && <div className="invalid-feedback">{errors.date}</div>}
          </div>

          <div className="d-flex gap-2 mt-2">
            <button type="submit" className="btn btn-primary btn-sm flex-grow-1 fw-semibold py-2">
              <i className={`bi bi-${editTxn ? 'floppy' : 'plus-lg'} me-1`}></i>
              {editTxn ? 'Cập nhật' : 'Thêm'}
            </button>
            {editTxn && (
              <button type="button" className="btn btn-outline-secondary btn-sm px-3 fw-semibold py-2" onClick={handleCancel}>Hủy</button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
