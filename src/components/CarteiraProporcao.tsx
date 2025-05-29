import React, { useEffect, useState } from 'react';
import type { AtivoProporcao } from '../types/Carteira';
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { fetchAtivoProporcao, fetchCarteiraProporcao } from '@/services/investmentService';
import { ChevronDown, Check } from "lucide-react";


const CarteiraProporcao: React.FC = () => {
  const [tipos, setTipos] = useState<string[]>(["Todos"]);
  const [carteiraProporcao, setCarteiraProporcao] = useState<AtivoProporcao[]>([]);
  const [open, setOpen] = useState(false);

  type Option = {
    label: string;
    value: string;
  };
  
  const options: Option[] = [
    { label: "Todos", value: "Todos" },
    { label: "Ação", value: "Ação" },
    { label: "BDR", value: "BDR" },
    { label: "ETF", value: "ETF" },
    { label: "Fundo Imobiliário", value: "Fundo Imobiliário" },
  ];

  function handleSelect(value: string) {
    if (value == 'Todos') {
      setTipos([value])
    } else {
      setTipos((prev) => 
        prev.includes(value) ? remove(prev, value) : [...remove(prev, 'Todos'), value]
      );
    }
  }

  const remove = (array: string[], value: string) => {
    if (array.includes(value)) {
      array = array.filter((v) => v !== value)
    }
    return array
  };
    
  useEffect(() => {
    if (tipos.length == 0 || tipos[0] == 'Todos') {
      fetchCarteiraProporcao().then(carteiraProporcao => setCarteiraProporcao(carteiraProporcao)).catch(console.error);
    } else {
      fetchAtivoProporcao(tipos).then(carteiraProporcao => setCarteiraProporcao(carteiraProporcao)).catch(console.error);
    }
  }, [tipos]);

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
      <div className="mb-4 flex justify-end">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm flex justify-between items-center text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tipos.length > 0 ? `${tipos.length} selecionado(s)` : "Selecione categorias"}
            <ChevronDown className="w-4 h-4 ml-2" />
          </button>

          {open && (
            <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="flex items-center px-4 py-2 hover:bg-blue-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={tipos.includes(option.value)}
                    readOnly
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{option.label}</span>
                  {tipos.includes(option.value) && (
                    <Check className="ml-auto text-blue-500 w-4 h-4" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <Card className="w-full"> 
          <CardContent className="h-[500px]">
            <div className="w-full h-full p-5" style={{ paddingBottom: '50px' }}>
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

export default CarteiraProporcao;