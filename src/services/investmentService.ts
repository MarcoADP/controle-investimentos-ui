import api from './api';
import type { Investment } from '../types/Investment';
import type { Carteira, CarteiraInformacao, ValorData, InvestimentoResumo, PatrimonioEvolucao, AtivoProporcao } from '../types/Carteira';
import qs from 'qs';

export async function fetchInvestments(): Promise<Investment[]> {
  const response = await api.get('/setor');
  return response.data;
}

export async function fetchCarteira(): Promise<Carteira> {
  const response = await api.get('/carteira');
  return response.data;
}

export async function fetchValorMensal(): Promise<ValorData[]> {
  const response = await api.get('/valor-mensal');
  return response.data;
}

export async function fetchResumo(): Promise<InvestimentoResumo> {
  const response = await api.get('/dados/resumo/5');
  return response.data;
}

export async function fetchCarteiraSimplificada(): Promise<CarteiraInformacao> {
  const response = await api.get('/dados/carteira-simplificada/5');
  return response.data;
}

export async function fetchEvolucaoPatrimonio(meses: number): Promise<PatrimonioEvolucao[]> {
    const response = await api.get('/dados/patrimonio/evolucao/5', {
    params: {
      meses
    }
  });
  return response.data;
}

export async function fetchCarteiraProporcao(): Promise<AtivoProporcao[]> {
  const response = await api.get('/dados/carteira/proporcao/5');
  return response.data;
}

export async function fetchAtivoProporcao(tipos: string[]): Promise<AtivoProporcao[]> {
  const response = await api.get('/dados/carteira/ativos/proporcao/5', {
    params: {
      'tipos': tipos
    },
    paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat" })
  });
  return response.data;
}



