export default function Summary({ income, expense, balance }) {
  const fmt = (n) => n.toLocaleString('vi-VN') + ' VND'
  return (
    <div className="row g-3 px-3 pt-3 pb-2">
      <div className="col-12 col-md-4">
        <div className="card text-bg-success shadow-sm rounded-4 border-0 p-3 h-100">
          <div className="fs-6 fw-semibold opacity-75 mb-1"><i className="bi bi-arrow-up-circle-fill me-1"></i>Tổng Thu nhập</div>
          <div className="fs-3 fw-bold ps-1">{fmt(income)}</div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="card text-bg-danger shadow-sm rounded-4 border-0 p-3 h-100">
          <div className="fs-6 fw-semibold opacity-75 mb-1"><i className="bi bi-arrow-down-circle-fill me-1"></i>Tổng Chi tiêu</div>
          <div className="fs-3 fw-bold ps-1">{fmt(expense)}</div>
        </div>
      </div>
      <div className="col-12 col-md-4">
        <div className="card text-bg-primary shadow-sm rounded-4 border-0 p-3 h-100">
          <div className="fs-6 fw-semibold opacity-75 mb-1"><i className="bi bi-wallet2 me-1"></i>Số dư</div>
          <div className="fs-3 fw-bold ps-1">{fmt(balance)}</div>
        </div>
      </div>
    </div>
  )
}
