import TransactionItem from './TransactionItem'

export default function TransactionList({ transactions, onEdit, onDelete }) {
  if (!transactions.length) return (
    <div className="empty-state">
      <i className="bi bi-inbox" style={{fontSize:'2rem', display:'block', marginBottom:8}}></i>
      <p className="mb-0" style={{fontSize:'0.85rem'}}>Chưa có giao dịch nào</p>
    </div>
  )

  return (
    <div className="txn-list-scroll">
      {transactions.map(t => (
        <TransactionItem key={t.id} txn={t} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
