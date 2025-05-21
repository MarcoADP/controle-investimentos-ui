import React, { useEffect, useState } from 'react';
import { fetchProventoAnual, fetchProventoMensal } from '../services/proventoService';
import type { ProventosPeriodo } from '../types/Carteira';
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';


const ProventoGrafico: React.FC = () => {
    const [modo, setModo] = useState<'ano' | 'mes'>('ano');
    const [proventosAnual, setProventosAnual] = useState<ProventosPeriodo[]>([]);
    const [proventosMensal, setProventosMensal] = useState<ProventosPeriodo[]>([]);

    const proventos = modo === 'ano' ? proventosAnual : proventosMensal;

  useEffect(() => {
    fetchProventoAnual().then(proventos => setProventosAnual(proventos)).catch(console.error);
    fetchProventoMensal().then(proventos => setProventosMensal(proventos)).catch(console.error);
  }, []);

  return (
    <div className="w-full">
        <div className="mb-4 flex justify-end">
            <ToggleGroup
            type="single"
            value={modo}
            onValueChange={(val) => val && setModo(val as 'ano' | 'mes')}
            >
            <ToggleGroupItem value="ano">Ano</ToggleGroupItem>
            <ToggleGroupItem value="mes">Mês</ToggleGroupItem>
            </ToggleGroup>
        </div>
        <div className="flex gap-4">
            <Card className="w-[15%]">
                <CardContent className="h-[500px]">
                    <ScrollArea className="w-full">
                        <table className="w-full text-sm text-left border">
                            <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="p-2">Período</th>
                                <th className="p-2" style={{textAlign:'right'}}>Valor</th>
                            </tr>
                            </thead>
                            <tbody>
                            {proventos.map((ativo) => (
                                <tr key={ativo.periodo} className="border-t">
                                <td className="p-2">{ativo.periodo}</td>
                                <td className="p-2" style={{textAlign:'right'}}>R$ {ativo.valor.toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </ScrollArea>
                </CardContent>
            </Card>
            <Card className="w-[85%]">
                <ResponsiveContainer className="p-5" width="100%" height="100%">
                    <BarChart data={proventos} margin={{ top: 20, right: 30, left: 30, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="periodo" />
                        <YAxis tickFormatter={(value) => 
                            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
                        } />
                        <Tooltip formatter={(value: number) =>
                            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
                        } />
                        <Bar dataKey="valor" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                            <LabelList
                                dataKey="valor"
                                position="top"
                                dy={-2}
                                formatter={(value: number) =>
                                new Intl.NumberFormat('pt-BR', {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(value)
                                }
                            />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>                    
            </Card>
        </div>

    </div>

  );
};

export default ProventoGrafico;