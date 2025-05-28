import React, { useEffect, useState } from 'react';
import { fetchCarteiraSimplificada } from '../services/investmentService';
import type { AtivoInformacao } from '../types/Carteira';
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const CarteiraTable: React.FC = () => {
  const [data, setData] = useState<AtivoInformacao[]>([]);

  useEffect(() => {
    fetchCarteiraSimplificada().then(carteira => setData(carteira.ativos)).catch(console.error);
  }, []);

  const formatarReais = (valor: number) => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="overflow-x-auto">
        <Card className="w-full">
            <CardContent>
                <ScrollArea className="w-full">
                    <table className="w-full text-sm text-left border">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="p-2">Código</th>
                            <th className="p-2">Tipo</th>
                            <th className="p-2 text-right">Qtd Compra</th>
                            <th className="p-2 text-right">Valor Compra</th>
                            <th className="p-2 text-right">Total Compra</th>
                            <th className="p-2 text-right">Qtd Atual</th>
                            <th className="p-2 text-right">Valor Atual</th>
                            <th className="p-2 text-right">Total Atual</th>
                            <th className="p-2 text-right">Saldo</th>
                            <th className="p-2 text-right">Variação (%)</th>
                            <th className="p-2 text-right">Rentabilidade (%)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((ativo) => (
                            <tr key={ativo.codigo} className="border-t">
                            <td className="p-2">{ativo.codigo}</td>
                            <td className="p-2">{ativo.tipo}</td>
                            <td className="p-2 text-right">{ativo.entrada.quantidade}</td>
                            <td className="p-2 text-right">{formatarReais(ativo.entrada.valorMedio)}</td>
                            <td className="p-2 text-right">{formatarReais(ativo.entrada.valorTotal)}</td>
                            <td className="p-2 text-right">{ativo.atual.quantidade}</td>
                            <td className="p-2 text-right">{formatarReais(ativo.atual.valorMedio)}</td>
                            <td className="p-2 text-right">{formatarReais(ativo.atual.valorTotal)}</td>
                            <td className="p-2 text-right">{formatarReais(ativo.saldo)}</td>
                            <td className="p-2 text-right">{(100 * ativo.variacao).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</td>
                            <td className="p-2 text-right">{(100 * ativo.rentabilidade).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </ScrollArea>
            </CardContent>
        </Card>
    </div>

  );
};

export default CarteiraTable;