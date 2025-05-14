import React from 'react';
import InvestmentChart from './components/InvestmentChart';

function App() {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gráfico de Investimentos</h1>
      <InvestmentChart />
    </div>
  );
}

export default App;