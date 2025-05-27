import React, { useEffect, useState } from 'react';
import type { PatrimonioEvolucao } from '../types/Carteira';
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { fetchEvolucaoPatrimonio } from '@/services/investmentService';


const EvolucaoPatrimonio: React.FC = () => {
    const [meses, setMeses] = useState<number>(12);
    const [evolucaoPatrimonio, setEvolucaoPatrimonio] = useState<PatrimonioEvolucao[]>([]);
    
  useEffect(() => {
    fetchEvolucaoPatrimonio(meses).then(evolucao => setEvolucaoPatrimonio(evolucao)).catch(console.error);
  }, [meses]);

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    const evolucao = evolucaoPatrimonio.filter(ev => ev.periodo == label)
    if (evolucao) {
        return (
        <div className="bg-white border p-2 rounded shadow text-sm">
            <p className="font-semibold">{label}</p>
            <p>Valor Investido: R$ {evolucao[0].valorInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p>Valor Atual: R$ {evolucao[0].valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            <p>Saldo: R$ {evolucao[0].saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
        );
    }
    console.log(evolucao)

  }
}

  return (
    <div className="w-full">
        <div className="mb-4 flex justify-end">
            <select
            className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={meses}
            onChange={(e) => setMeses(Number(e.target.value))}
            >
            <option value="6">6 meses</option>
            <option value="12">1 ano</option>
            <option value="24">2 anos</option>
            <option value="60">5 anos</option>
            </select>
        </div>
        <div className="flex gap-4">
            <Card className="w-full"> 
                <CardContent className="h-[500px]">
                    <ResponsiveContainer className="p-5" width="100%" height="100%">
                        <BarChart data={evolucaoPatrimonio} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}  stackOffset="sign">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="periodo" />
                            <YAxis tickFormatter={(value) => 
                                new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
                            } />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="valorInvestido" stackId="a" fill="#30CA80" radius={[4, 4, 0, 0]}>
                            </Bar>
                            <Bar dataKey="saldo" stackId="a" fill="#AEFDCA" radius={[4, 4, 0, 0]}>
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>  
                </CardContent>
                  
            </Card>
        </div>

    </div>

  );
};

export default EvolucaoPatrimonio;