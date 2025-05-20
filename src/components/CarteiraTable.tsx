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

  return (
    <div className="w-full">
        <Card className="w-full">
            <CardContent>
                <ScrollArea className="w-full">
                    <table className="w-full text-sm text-left border">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="p-2">Código</th>
                            <th className="p-2">Tipo</th>
                            <th className="p-2">Qtd Compra</th>
                            <th className="p-2">Valor Compra</th>
                            <th className="p-2">Total Compra</th>
                            <th className="p-2">Qtd Atual</th>
                            <th className="p-2">Valor Atual</th>
                            <th className="p-2">Total Atual</th>
                            <th className="p-2">Saldo</th>
                            <th className="p-2">Variação (%)</th>
                            <th className="p-2">Rentabilidade (%)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((ativo) => (
                            <tr key={ativo.codigo} className="border-t">
                            <td className="p-2">{ativo.codigo}</td>
                            <td className="p-2">{ativo.tipo}</td>
                            <td className="p-2">{ativo.entrada.quantidade}</td>
                            <td className="p-2">R$ {ativo.entrada.valorMedio.toFixed(2)}</td>
                            <td className="p-2">R$ {ativo.entrada.valorTotal.toFixed(2)}</td>
                            <td className="p-2">{ativo.atual.quantidade}</td>
                            <td className="p-2">R$ {ativo.atual.valorMedio.toFixed(2)}</td>
                            <td className="p-2">R$ {ativo.atual.valorTotal.toFixed(2)}</td>
                            <td className="p-2">R$ {ativo.saldo.toFixed(2)}</td>
                            <td className="p-2">{(100 * ativo.variacao).toFixed(2)}%</td>
                            <td className="p-2">{(100 * ativo.rentabilidade).toFixed(2)}%</td>
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