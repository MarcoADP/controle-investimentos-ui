import { http, HttpResponse } from 'msw';
import type { Investment } from '../types/Investment';

const mockData: Investment[] = [
    {date: "Investment 1", value: 10.0},
    {date: "Investment 2", value: 20.0}
]

export const handlers = [

    http.get('http://localhost:8080/setor', () => {
        return HttpResponse.json(mockData);
    }),

];