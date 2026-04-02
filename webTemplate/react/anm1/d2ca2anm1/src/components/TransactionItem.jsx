export default function TransactionItem({ txn, onEdit, onDelete }) {
  const fmt = (n) => Number(n).toLocaleString('vi-VN') + ' VND'
  const isIncome = txn.type === 'thu'
  const colorClass = isIncome ? 'success' : 'danger'

  return (
    <div className={`card mb-2 shadow-sm border-0 border-start border-4 border-${colorClass}`}>
      <div className="card-body p-3 d-flex align-items-center justify-content-between">
        <div>
          <div className="fw-bold text-dark fs-6 mb-1">{txn.name}</div>
          <div className="small text-secondary fw-semibold">
            {txn.category} <span className="mx-1">&middot;</span> {txn.date}
            <span className={`ms-2 badge bg-${colorClass}`} style={{fontSize:'0.65rem'}}>
              {isIncome ? 'Thu' : 'Chi'}
            </span>
          </div>
        </div>
        <div className="d-flex flex-column align-items-end gap-2">
          <div className={`fw-bold text-${colorClass} fs-5`}>
            {isIncome ? '+' : '-'}{fmt(txn.amount)}
          </div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-warning btn-sm py-0 px-2" style={{fontSize:'0.75rem'}} onClick={() => onEdit(txn)}>
              <i className="bi bi-pencil me-1"></i>Sửa
            </button>
            <button className="btn btn-outline-danger btn-sm py-0 px-2" style={{fontSize:'0.75rem'}} onClick={() => onDelete(txn.id)}>
              <i className="bi bi-trash me-1"></i>Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
