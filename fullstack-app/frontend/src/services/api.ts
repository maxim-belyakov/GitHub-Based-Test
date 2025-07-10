import axios from 'axios';
import { Match } from '../types/Match';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const matchAPI = {
  getAllMatches: async (): Promise<Match[]> => {
    const response = await api.get('/matches');
    return response.data;
  },

  getMatch: async (id: number): Promise<Match> => {
    const response = await api.get(`/matches/${id}`);
    return response.data;
  },

  createMatch: async (match: Match): Promise<Match> => {
    const response = await api.post('/matches', match);
    return response.data;
  },

  updateMatch: async (id: number, match: Match): Promise<Match> => {
    const response = await api.put(`/matches/${id}`, match);
    return response.data;
  },

  deleteMatch: async (id: number): Promise<void> => {
    await api.delete(`/matches/${id}`);
  },

  searchMatches: async (team: string): Promise<Match[]> => {
    const response = await api.get('/matches/search', { params: { team } });
    return response.data;
  },
};