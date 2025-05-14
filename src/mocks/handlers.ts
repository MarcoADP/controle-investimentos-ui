import { http, HttpResponse } from 'msw';
import type { Investment } from '../types/Investment';
import type { Carteira, CarteiraAtivo, ValorData } from '../types/Carteira';

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

];