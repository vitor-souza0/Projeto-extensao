import { useMemo } from 'react'

const TIPS = [
  { id: 1, title: 'A Regra dos Envelopes', content: 'Tente separar o dinheiro das contas essenciais (luz, água) assim que receber. Isso evita gastar o dinheiro por engano.' },
  { id: 2, title: 'Pequenos gastos importam', content: 'Aquela comprinha de poucos reais todo dia pode somar um valor muito alto no fim do mês. Anote tudo!' },
  { id: 3, title: 'Faça uma reserva de paz', content: 'Guardar mesmo que seja R$ 5 ou R$ 10 por mês ajuda você a não passar sufoco se um eletrodoméstico quebrar.' }
]

export default function FinancialTips({ balance, month }) {
  const tip = useMemo(() => {
    if (balance < 0) {
      return { 
        title: 'Calma, vamos dar um jeito!', 
        content: 'Quando as contas apertam, priorize o básico: moradia e alimentação. Evite fazer novas compras parceladas.' 
      }
    }
    // Sorteio estável atrelado unicamente à string do mês selecionado
    const index = month.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % TIPS.length
    return TIPS[index]
  }, [balance < 0, month])

  return (
    <aside className="tips-box" aria-label="Dica de educação financeira">
      <span style={{ fontSize: '2rem' }} aria-hidden="true">💡</span>
      <div>
        <h4 style={{ color: '#92400e', fontSize: '0.9rem', fontWeight: 'bold' }}>Dica do Dia: {tip.title}</h4>
        <p style={{ color: '#b45309', fontSize: '0.8rem', marginTop: '4px', lineHeight: '1.4' }}>{tip.content}</p>
      </div>
    </aside>
  )
}