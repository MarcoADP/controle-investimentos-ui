import React, { useEffect, useState } from 'react';
import type {PatrimonioEvolucao } from '../types/Carteira';
import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { fetchEvolucaoPatrimonio } from '@/services/investmentService';
import { ChevronDown } from "lucide-react";


const EvolucaoPatrimonio: React.FC = () => {
  const [selected, setSelected] = useState<Option>({ label: "1 ano", value: "12" });
  const [evolucaoPatrimonio, setEvolucaoPatrimonio] = useState<PatrimonioEvolucao[]>([]);
  const [open, setOpen] = useState(false);
  
  type Option = {
    label: string;
    value: string;
  };

  const options: Option[] = [
    { label: "6 meses", value: "6" },
    { label: "1 ano", value: "12" },
    { label: "2 anos", value: "24" },
    { label: "5 anos", value: "60" }
  ];

  const handleSelect = (option: Option) => {
    setSelected(option);
    setOpen(false);
  };

  useEffect(() => {
    const meses = selected == null ? 12 : Number(selected.value) 
    fetchEvolucaoPatrimonio(meses).then(evolucao => setEvolucaoPatrimonio(evolucao)).catch(console.error);
  }, [selected]);

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

  return (
    <div className="w-full">
        <div className="mb-4 flex justify-end">
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm flex justify-between items-center text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {selected ? selected.label : "Selecione uma categoria"}
              <ChevronDown className="w-4 h-4 ml-2" />
            </button>

            {open && (
              <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {options.map((option) => (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option)}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
                  >
                    {option.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
                        <Tooltip content={<BarChartTooltip />} />
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