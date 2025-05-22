import React, { useEffect, useState } from 'react';
import { fetchResumo } from '../services/investmentService';
import type { InvestimentoResumo } from '../types/Carteira';
import { Card } from "@/components/ui/card"

const CarteiraResumo: React.FC = () => {
    const [data, setData] = useState<InvestimentoResumo>();

    const formatarReais = (valor: number|undefined) => valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const formatarPercentual = (valor: number|undefined) => `${(valor?valor:0 * 100).toFixed(2)}%`;

  useEffect(() => {
    fetchResumo().then(resumo => setData(resumo)).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 p-4">
      {/* Card 1 - Investimento */}
        <div className="flex-1 bg-white rounded-xl shadow p-4">
            <Card className="p-8 gap-1 h-[300px]">
                <h3 className="text-lg font-semibold mb-2">Investimento</h3>
                <p className="text-xl text-gray-600 mt-2">Valor Atual</p>
                <p className="text-2xl font-bold text-blue-700">{formatarReais(data?.valorAtual)}</p>

                <div className="flex justify-between mt-4 text-sm text-gray-600" style={{ paddingTop: '10px' }}>
                    <div>
                        <p className="text-sm text-gray-600">Valor investido</p>
                        <p className="text-xl font-bold text-orange-600">{formatarReais(data?.valorInvestido)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Saldo</p>
                        <p className="text-xl font-bold text-green-600">{formatarReais(data?.saldo)}</p>
                    </div>
                </div>
            </Card>
        </div>



      {/* Card 2 - Proventos */}
        <div className="flex-1 bg-white rounded-xl shadow p-4">
            <Card className="p-8 gap-1 h-[300px]">
                <h3 className="text-lg font-semibold mb-2">Proventos</h3>
                <p className="text-xl text-gray-600 mt-2">Proventos no Ano</p>
                <p className="text-4xl font-bold text-indigo-600">{formatarReais(data?.proventosAno)}</p>
                <p className="text-sm text-gray-600" style={{ paddingTop: '20px' }}>Total Recebido</p>
                <p className="text-xl font-bold text-purple-600">{formatarReais(data?.proventos)}</p>
            </Card>
        </div>

      {/* Card 3 - Variação e Rentabilidade */}
        <div className="flex-1 bg-white rounded-xl shadow p-4">
            <Card className="p-8 gap-1 h-[300px]">
                <h3 className="text-lg font-semibold mb-2">Desempenho</h3>
                <p className="text-xl text-gray-600" style={{ paddingTop: '10px' }}>Variação</p>
                <p className="text-2xl font-bold text-orange-600">{formatarPercentual(data?.variacao)}</p>
                <p className="text-xl text-gray-600" style={{ paddingTop: '25px' }}>Rentabilidade</p>
                <p className="text-2xl font-bold text-green-700">{formatarPercentual(data?.rentabilidade)}</p>
            </Card>
        </div>
    </div>

  );
};

export default CarteiraResumo;