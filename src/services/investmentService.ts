import api from './api';
import type { Investment } from '../types/Investment';

export async function fetchInvestments(): Promise<Investment[]> {
  const response = await api.get('/setor');
  return response.data;
}
