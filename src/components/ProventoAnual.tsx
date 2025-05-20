import React, { useEffect, useState } from 'react';
import { fetchProventoAnual } from '../services/proventoService';
import type { ProventosAnual } from '../types/Carteira';
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const ProventoAnual: React.FC = () => {
  const [data, setData] = useState<ProventosAnual[]>([]);

  useEffect(() => {
    fetchProventoAnual().then(proventos => setData(proventos)).catch(console.error);
  }, []);

  return (
    <div className="flex gap-4">
        <Card className="w-[15%]">
            <CardContent>
                <ScrollArea className="w-full">
                    <table className="w-full text-sm text-left border">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                        <tr>
                            <th className="p-2">Ano</th>
                            <th className="p-2" style={{textAlign:'right'}}>Valor</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((ativo) => (
                            <tr key={ativo.ano} className="border-t">
                            <td className="p-2">{ativo.ano}</td>
                            <td className="p-2" style={{textAlign:'right'}}>R$ {ativo.valor.toFixed(2)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </ScrollArea>
            </CardContent>
        </Card>
        <Card className="w-[85%]">

        </Card>
    </div>

  );
};

export default ProventoAnual;