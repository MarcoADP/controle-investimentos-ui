import React, { useEffect, useState } from 'react';
import { fetchProventos } from '../services/proventoService';
import type { Provento } from '../types/Carteira';

const ProventoTable: React.FC = () => {
  const [data, setData] = useState<Provento[]>([]);

  useEffect(() => {
    fetchProventos().then(proventos => setData(proventos)).catch(console.error);
  }, []);


const itensPorPagina = 20

const [paginaAtual, setPaginaAtual] = useState(1);
const totalPaginas = Math.ceil(data.length / itensPorPagina);


const dadosPaginados = data.slice(
(paginaAtual - 1) * itensPorPagina,
paginaAtual * itensPorPagina
);

const formatarData = (data: string) =>
new Date(data).toLocaleDateString('pt-BR');

const formatarReais = (valor: number) =>
valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="overflow-x-auto">
      <table className="border-collapse border text-sm mx-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 w-[150px] text-left">Data</th>
            <th className="border p-2 w-[150px] text-left">Código</th>
            <th className="border p-2 w-[200px] text-left">Tipo</th>
            <th className="border p-2 w-[100px] text-right">Quantidade</th>
            <th className="border p-2 w-[150px] text-right">Valor Total</th>
            <th className="border p-2 w-[150px] text-right">Valor Médio</th>
          </tr>
        </thead>
        <tbody>
          {dadosPaginados.map((item, idx) => (
            <tr key={idx} className="even:bg-gray-50">
              <td className="border p-2">{formatarData(item.dataPagamento)}</td>
              <td className="border p-2">{item.codigo}</td>
              <td className="border p-2">{item.tipoProvento}</td>
              <td className="border p-2 text-right">{item.quantidade}</td>
              <td className="border p-2 text-right">{formatarReais(item.valorTotal)}</td>
              <td className="border p-2 text-right">{formatarReais(item.valorMedio)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-evenly items-center mt-4 text-sm">
        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>
        <div className="space-x-2">
          <button
            onClick={() => setPaginaAtual((p) => Math.max(p - 1, 1))}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={paginaAtual === 1}
          >
            Anterior
          </button>
          <button
            onClick={() => setPaginaAtual((p) => Math.min(p + 1, totalPaginas))}
            className="px-3 py-1 border rounded disabled:opacity-50"
            disabled={paginaAtual === totalPaginas}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>

  );
};

export default ProventoTable;