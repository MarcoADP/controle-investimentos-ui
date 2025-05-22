import api from './api';
import type { ProventosPeriodo, ProventoHistorico, Provento } from '../types/Carteira';

export async function fetchProventosHistorico(): Promise<ProventoHistorico> {
  const response = await api.get('/dados/provento-historico/5');
  return response.data;
}

export async function fetchProventoAnual(): Promise<ProventosPeriodo[]> {
  const response = await api.get('/dados/provento-anual/5');
  return response.data;
}

export async function fetchProventoMensal(): Promise<ProventosPeriodo[]> {
  const response = await api.get('/dados/provento-mensal/5');
  return response.data;
}

export async function fetchProventos(): Promise<Provento[]> {
  const response = await api.get('/provento');
  return response.data;
}



