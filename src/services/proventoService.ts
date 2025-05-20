import api from './api';
import type { ProventosAnual, ProventoHistorico } from '../types/Carteira';

export async function fetchProventosHistorico(): Promise<ProventoHistorico> {
  const response = await api.get('/dados/provento-historico/5');
  return response.data;
}

export async function fetchProventoAnual(): Promise<ProventosAnual[]> {
  const response = await api.get('/dados/provento-anual/5');
  return response.data;
}



