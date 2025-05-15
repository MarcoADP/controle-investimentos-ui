import React from 'react';
import InvestmentChart from './components/InvestmentChart';
import ValorMensal from './components/ValorMensal';
import CarteiraTable from './components/CarteiraTable';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carteira</h1>
      <CarteiraTable />
      <h1 className="text-2xl font-bold mb-4">Gráfico de Investimentos</h1>
      <InvestmentChart />
      <h1 className="text-2xl font-bold mb-4">Gráfico de Investimentos</h1>
      <ValorMensal />
    </div>
  );
}

export default App;