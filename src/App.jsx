import { useState, useEffect, useMemo } from 'react'
import Dashboard from './components/Dashboard.jsx'
import FinancialForm from './components/FinancialForm.jsx'
import HistoryList from './components/HistoryList.jsx'
import FinancialTips from './components/FinancialTips.jsx'
import './App.css'

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  })

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('@meu_caderno_financeiro:dados')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('@meu_caderno_financeiro:dados', JSON.stringify(history))
  }, [history])

  const currentMonthData = useMemo(() => {
    return history.find(h => h.monthYear === currentMonth) || {
      monthYear: currentMonth,
      transactions: []
    }
  }, [history, currentMonth])

  const totals = useMemo(() => {
    return currentMonthData.transactions.reduce((acc, current) => {
      if (current.type === 'income') {
        acc.income += current.amount
      } else {
        acc.expense += current.amount
      }
      acc.balance = acc.income - acc.expense
      return acc
    }, { income: 0, expense: 0, balance: 0 })
  }, [currentMonthData.transactions])

  const handleAddTransaction = (description, amount, type, category) => {
    const newTransaction = {
      id: crypto.randomUUID(),
      description,
      amount,
      type,
      category
    }

    setHistory(prevHistory => {
      const monthIndex = prevHistory.findIndex(h => h.monthYear === currentMonth)

      if (monthIndex >= 0) {
        const updated = [...prevHistory]
        updated[monthIndex] = {
          ...updated[monthIndex],
          transactions: [newTransaction, ...updated[monthIndex].transactions]
        }
        return updated
      } else {
        return [...prevHistory, { monthYear: currentMonth, transactions: [newTransaction] }]
      }
    })
  }

  const handleDeleteTransaction = (id) => {
    setHistory(prevHistory => 
      prevHistory.map(m => 
        m.monthYear === currentMonth 
          ? { ...m, transactions: m.transactions.filter(t => t.id !== id) }
          : m
      )
    )
  }

  return (
    <div>
      <header className="header">
        <div className="header-container">
          <div>
            <h1>🏡 Meu Caderno Financeiro</h1>
            <p>O jeito mais simples de cuidar do seu dinheirinho</p>
          </div>
          
          <nav className="month-selector" aria-label="Seletor de Navegação Mensal">
            <span style={{ fontSize: '0.9rem' }}>📅 Mês ativo:</span>
            <input 
              type="month" 
              value={currentMonth} 
              onChange={(e) => setCurrentMonth(e.target.value)}
              aria-label="Escolha o mês e o ano para visualizar"
            />
          </nav>
        </div>
      </header>

      <main className="main-container">
        <FinancialTips balance={totals.balance} month={currentMonth} />
        
        <Dashboard totals={totals} />

        <div className="content-grid">
          <FinancialForm onAddTransaction={handleAddTransaction} />
          <HistoryList 
            transactions={currentMonthData.transactions} 
            onDelete={handleDeleteTransaction} 
          />
        </div>
      </main>
    </div>
  )
}