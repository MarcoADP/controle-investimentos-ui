import React, { useEffect, useState } from 'react';
import type { CarteiraProporcao, PatrimonioEvolucao } from '../types/Carteira';
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';
import { fetchCarteiraProporcao, fetchEvolucaoPatrimonio } from '@/services/investmentService';


const EvolucaoPatrimonio: React.FC = () => {
    const [meses, setMeses] = useState<number>(12);
    const [evolucaoPatrimonio, setEvolucaoPatrimonio] = useState<PatrimonioEvolucao[]>([]);
    const [carteiraProporcao, setCarteiraProporcao] = useState<CarteiraProporcao[]>([]);
    
  useEffect(() => {
    fetchEvolucaoPatrimonio(meses).then(evolucao => setEvolucaoPatrimonio(evolucao)).catch(console.error);
    fetchCarteiraProporcao().then(carteiraProporcao => setCarteiraProporcao(carteiraProporcao)).catch(console.error);
  }, [meses]);

  function BarChartTooltip({ active, payload, label }: any) {
    if (active && payload && payload.length) {
      const evolucao = evolucaoPatrimonio.filter(ev => ev.periodo == label)
      if (evolucao) {
          return (
          <div className="bg-white border p-2 rounded shadow text-sm w-30">
              <p className="font-semibold">{label}</p>
              <p style={{paddingTop: '10px'}}>Investido:</p>
              <p>R$ {evolucao[0].valorInvestido.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p style={{paddingTop: '5px'}}>Saldo:</p>
              <p>R$ {evolucao[0].saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="font-semibold" style={{paddingTop: '5px'}}>Patrimônio: </p>
              <p className="font-semibold">R$ {evolucao[0].valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          );
      }

    }
  }

  function PieChartTooltip({ active, payload }: any) {
    if (active && payload && payload.length > 0) {
      const { name } = payload[0];
      const elements = carteiraProporcao.filter(ev => ev.descricao == name)
      if (elements) {
          return (
          <div className="bg-white border p-2 rounded shadow text-sm">
              <p className="font-semibold">{name}</p>
              <p>Valor: R$ {elements[0].valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p>Proporção: {(100*elements[0].proporcao).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</p>
          </div>
          );
      }
    }

    return null;
  }

  const cores = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
  return (
    <div className="w-full">
        <div className="mb-4 flex w-[65%]">
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
          <Card className="w-[65%]"> 
            <CardContent className="h-[500px]">
                <ResponsiveContainer className="p-5" width="100%" height="100%">
                    <BarChart data={evolucaoPatrimonio} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}  stackOffset="sign">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="periodo" />
                        <YAxis tickFormatter={(value) => 
                            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
                        } />
                        <Tooltip content={<BarChartTooltip />} />
                        <Bar dataKey="valorInvestido" stackId="a" fill="#30CA80" radius={[4, 4, 0, 0]}>
                        </Bar>
                        <Bar dataKey="saldo" stackId="a" fill="#AEFDCA" radius={[4, 4, 0, 0]}>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>  
            </CardContent>  
          </Card>
          <Card className="w-[35%]"> 
            <CardContent className="h-[500px]">
              <div className="w-full h-full p-6" style={{ paddingBottom: '50px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={carteiraProporcao}
                      dataKey="proporcao"
                      nameKey="descricao"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={5}
                      label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                        const RADIAN = Math.PI / 180;
                        const radius = innerRadius + (outerRadius - innerRadius) * 2.25;
                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                        const name = `${carteiraProporcao[index].descricao}: ${(percent * 100).toFixed(2)}%`;

                        // Quebra o texto manualmente
                        const [linha1, linha2, linha3] = name.split(" ", 3);

                        return (
                          <text
                            x={x}
                            y={y}
                            fill="black"
                            textAnchor={x > cx ? "start" : "end"}
                            dominantBaseline="central"
                          >
                            <tspan x={x} dy="-0.6em">{linha1}</tspan>
                            {linha2 && <tspan x={x} dy="1.2em">{linha2}</tspan>}
                            {linha3 && <tspan x={x} dy="1.2em">{linha3}</tspan>}
                          </text>
                        );
                      }}
                    >
                      {carteiraProporcao.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieChartTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

            </CardContent>
          </Card>
          </div>

    </div>

  );
};

export default EvolucaoPatrimonio;