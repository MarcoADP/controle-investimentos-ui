import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { fetchCarteira } from '../services/investmentService';
import type { CarteiraAtivo } from '../types/Carteira';

const InvestmentChart: React.FC = () => {
  const [data, setData] = useState<CarteiraAtivo[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    fetchCarteira().then(carteira => setData(carteira.ativos)).catch(console.error);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const onPieEnter = (_, index) => {
      setActiveIndex(index);
  };

  return (
    <div className="w-full h-[700px]">

      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
              <Pie
                  activeIndex={activeIndex}
                  data={data}
                  dataKey="totalAtual"
                  nameKey="codigo"
                  outerRadius={250}
                  fill="green"
                  onMouseEnter={onPieEnter}
                  style={{ cursor: 'pointer', outline: 'none', marginLeft: 100 }}
              >
                <LabelList dataKey="codigo" position="right" style={{ fontSize: "14px" }} />
                {data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
          </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentChart;