const INCOME_CATS  = ['Lương','Thưởng','Đầu tư']
const EXPENSE_CATS = ['Ăn uống','Di chuyển','Giải trí','Học tập','Khác']
const ALL_CATS = [...INCOME_CATS, ...EXPENSE_CATS]

export default function FilterBar({ filter, onChange }) {
  const set = (k, v) => onChange({ ...filter, [k]: v })

  return (
    <div className="card bg-light border-0 shadow-sm mx-3 my-3">
      <div className="card-body p-3">
        <div className="row g-2 align-items-center">
          <div className="col-12 col-md-auto">
            <span className="fw-bold text-secondary small text-uppercase d-flex align-items-center mb-1 mb-md-0">
              <i className="bi bi-funnel-fill me-1"></i> Lọc
            </span>
          </div>
          <div className="col-6 col-md-2">
            <select className="form-select form-select-sm" value={filter.type} onChange={e => set('type', e.target.value)}>
              <option value="">Tất cả loại</option>
              <option value="thu">Thu nhập</option>
              <option value="chi">Chi tiêu</option>
            </select>
          </div>
          <div className="col-6 col-md-2">
            <select className="form-select form-select-sm" value={filter.category} onChange={e => set('category', e.target.value)}>
              <option value="">Tất cả danh mục</option>
              {ALL_CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="col-6 col-md-2">
            <input type="date" className="form-control form-control-sm" value={filter.from}
              onChange={e => set('from', e.target.value)} placeholder="Từ ngày" />
          </div>
          <div className="col-6 col-md-2">
            <input type="date" className="form-control form-control-sm" value={filter.to}
              onChange={e => set('to', e.target.value)} placeholder="Đến ngày" />
          </div>
          <div className="col-12 col-md-3 ms-md-auto">
            <input className="form-control form-control-sm" placeholder="🔍 Tìm tên giao dịch..."
              value={filter.search} onChange={e => set('search', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  )
}
