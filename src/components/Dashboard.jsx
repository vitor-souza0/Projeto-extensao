export default function Dashboard({ totals }) {
  const { income, expense, balance } = totals
  
  const expensePercentage = income > 0 ? Math.min((expense / income) * 100, 100) : 0
  const isOverspent = balance < 0

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  return (
    <section className="dashboard-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div className="dashboard-grid">
        <div className="card card-income">
          <span className="card-icon" aria-hidden="true">💰</span>
          <div>
            <p className="card-title">Dinheiro que entrou</p>
            <p className="card-value" style={{ color: '#065f46' }}>{formatCurrency(income)}</p>
          </div>
        </div>

        <div className="card card-expense">
          <span className="card-icon" aria-hidden="true">💸</span>
          <div>
            <p className="card-title">Dinheiro que saiu</p>
            <p className="card-value" style={{ color: '#991b1b' }}>{formatCurrency(expense)}</p>
          </div>
        </div>

        <div className={`card ${isOverspent ? 'card-expense' : 'card-income'}`}>
          <span className="card-icon" aria-hidden="true">{isOverspent ? '⚠️' : '👛'}</span>
          <div style={{ width: '100%' }}>
            <p className="card-title">O que sobrou para usar</p>
            <p className="card-value">{formatCurrency(balance)}</p>
            
            {income > 0 && (
              <div className="progress-bar-bg" role="progressbar" aria-valuenow={expensePercentage} aria-valuemin="0" aria-valuemax="100">
                <div 
                  className={`progress-bar-fill ${isOverspent ? 'danger' : ''}`} 
                  style={{ width: `${expensePercentage}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOverspent && (
        <div className="alert-box" role="alert">
          <strong>Atenção com as contas deste mês!</strong>
          <p style={{ marginTop: '4px' }}>
            Seus gastos passaram do valor que você recebeu. Que tal dar uma olhadinha no que pode ser adiado para o próximo mês?
          </p>
        </div>
      )}
    </section>
  )
}