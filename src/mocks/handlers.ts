import { http, HttpResponse } from 'msw';
import type { Investment } from '../types/Investment';
import type { Carteira, CarteiraAtivo, ValorData, CarteiraInformacao } from '../types/Carteira';

const investmentMock: Investment[] = [
    {date: "Investment 1", value: 10.0},
    {date: "Investment 2", value: 20.0}
]

const carteiraAtivosMock: CarteiraAtivo[] = [
    { codigo: 'ITSA4',  quantidade: 110, valorMedio: 11.6, valorAtual: 10.96, totalCompra: 1227.23, totalAtual: 1205.60},
    { codigo: 'SOJA3',  quantidade: 10, valorMedio: 16.80, valorAtual: 11.32, totalCompra: 168.0, totalAtual: 113.2},
    { codigo: 'SUZB3',  quantidade: 20, valorMedio: 31.21, valorAtual: 53.55, totalCompra: 624.12, totalAtual: 1071.0},
]

const carteiraMock: Carteira = {
    valorInvestido: 1000,
    valorAtual: 1500,
    ativos: carteiraAtivosMock
}

const valorMensalMock: ValorData[] = [
    {data: '2025-01-01', valor: 10000},
    {data: '2025-02-01', valor: 15000},
    {data: '2025-03-01', valor: 10000},
    {data: '2025-04-01', valor: 12000},
    {data: '2025-05-01', valor: 20000},
]

const carteiraSimplificadaMock: CarteiraInformacao = {
  ativos: [
    {
      codigo: 'ITSA4',
      tipo: 'Financeiro',
      entrada: { quantidade: 100, valorMedio: 9.5, valorTotal: 950 },
      saida: { quantidade: 0, valorMedio: 0, valorTotal: 0 },
      atual: { quantidade: 100, valorMedio: 10.2, valorTotal: 1020 },
      saldo: 70,
      variacao: 7.37,
      rentabilidade: 7.37,
    },
    {
      codigo: 'PETR4',
      tipo: 'Petróleo',
      entrada: { quantidade: 50, valorMedio: 32, valorTotal: 1600 },
      saida: { quantidade: 0, valorMedio: 0, valorTotal: 0 },
      atual: { quantidade: 50, valorMedio: 30.5, valorTotal: 1525 },
      saldo: -75,
      variacao: -4.69,
      rentabilidade: -4.69,
    },
    {
      codigo: 'WEGE3',
      tipo: 'Industrial',
      entrada: { quantidade: 30, valorMedio: 36, valorTotal: 1080 },
      saida: { quantidade: 0, valorMedio: 0, valorTotal: 0 },
      atual: { quantidade: 30, valorMedio: 39, valorTotal: 1170 },
      saldo: 90,
      variacao: 8.33,
      rentabilidade: 8.33,
    },
    {
      codigo: 'VIVT3',
      tipo: 'Telecomunicações',
      entrada: { quantidade: 40, valorMedio: 42.5, valorTotal: 1700 },
      saida: { quantidade: 0, valorMedio: 0, valorTotal: 0 },
      atual: { quantidade: 40, valorMedio: 41, valorTotal: 1640 },
      saldo: -60,
      variacao: -3.53,
      rentabilidade: -3.53,
    },
  ],
};

export const handlers = [

    http.get('http://localhost:8080/setor', () => {
        return HttpResponse.json(investmentMock);
    }),

    http.get('http://localhost:8080/carteira', () => {
        return HttpResponse.json(carteiraMock);
    }),

    http.get('http://localhost:8080/valor-mensal', () => {
        return HttpResponse.json(valorMensalMock);
    }),

    http.get('http://localhost:8080/dados/carteira-simplificada/5', () => {
        return HttpResponse.json(carteiraSimplificadaMock);
    }),

];