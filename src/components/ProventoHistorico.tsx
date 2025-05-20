import React, { useEffect, useState } from 'react';
import { fetchProventosHistorico } from '../services/proventoService';
import type { ProventoHistoricoCodigo } from '../types/Carteira';
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const ProventoHistorico: React.FC = () => {
  const [data, setData] = useState<ProventoHistoricoCodigo[]>([]);

  useEffect(() => {
    fetchProventosHistorico().then(historico => setData(historico.proventos)).catch(console.error);
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
                            <th className="p-2">Valor</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((ativo) => (
                            <tr key={ativo.codigo} className="border-t">
                            <td className="p-2">{ativo.codigo}</td>
                            <td className="p-2">{ativo.tipo}</td>
                            <td className="p-2">R$ {ativo.valorTotal.toFixed(2)}</td>
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

export default ProventoHistorico;