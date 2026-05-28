export default function HistoryList({ transactions, onDelete }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  return (
    <section className="panel" aria-labelledby="list-title">
      <h3 id="list-title">Lista de registros deste mês</h3>
      
      {transactions.length === 0 ? (
        <div className="empty-state">
          Nenhum registro anotado para este mês ainda. Use o formulário ao lado para começar!
        </div>
      ) : (
        <ul className="transaction-list">
          {transactions.map((item) => (
            <li key={item.id} className="transaction-item">
              <div className="item-info">
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{item.description}</span>
                <span className="item-category">{item.category}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span className={`item-amount ${item.type === 'income' ? 'income' : 'expense'}`}>
                  {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                </span>
                <button 
                  className="btn-delete"
                  onClick={() => onDelete(item.id)}
                  aria-label={`Apagar registro de ${item.description}`}
                  title="Apagar anotação"
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}