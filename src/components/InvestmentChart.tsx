import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { Investment } from '../types/Investment';
import { fetchInvestments } from '../services/investmentService';

const InvestmentChart: React.FC = () => {
  const [data, setData] = useState<Investment[]>([]);

  useEffect(() => {
    fetchInvestments().then(setData).catch(console.error);
  }, []);

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InvestmentChart;