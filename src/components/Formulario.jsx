import { useState } from 'react'

const CATEGORIES = [
  'Alimentação / Mercado',
  'Moradia (Aluguel, Luz, Água)',
  'Transporte / Ônibus / Moto',
  'Saúde / Farmácia',
  'Lazer / Família',
  'Salário / Diária / Bônus',
  'Outros'
]

export default function Formulario({ onAddTransaction }) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState(CATEGORIES[0])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!description.trim() || !amount) return

    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount) || numericAmount <= 0) return

    onAddTransaction(description.trim(), numericAmount, type, category)
    
    setDescription('')
    setAmount('')
  }

  return (
    <section className="panel" aria-labelledby="form-title">
      <h3 id="form-title">Adicionar nova movimentação</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="type-buttons" role="group" aria-label="Tipo de movimentação">
          <button
            type="button"
            className={`btn-type ${type === 'expense' ? 'active-expense' : ''}`}
            onClick={() => { setType('expense'); setCategory('Alimentação / Mercado') }}
          >
            📉 É um Gasto (Saída)
          </button>
          <button
            type="button"
            className={`btn-type ${type === 'income' ? 'active-income' : ''}`}
            onClick={() => { setType('income'); setCategory('Salário / Diária / Bônus') }}
          >
            📈 É um Ganho (Entrada)
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="description">Nome do gasto ou ganho (Ex: Mercado, Luz, Faxina)</label>
          <input
            id="description"
            type="text"
            placeholder="Digite o nome aqui..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Valor em Dinheiro (R$)</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-submit">
          💾 Salvar no Caderno Digital
        </button>
      </form>
    </section>
  )
}