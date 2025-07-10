import { Match, MatchFormData, ScoreUpdateData } from '../types/Match';

const API_BASE_URL = 'http://localhost:8080/api';

export const matchAPI = {
  getAllMatches: async (): Promise<Match[]> => {
    const response = await fetch(`${API_BASE_URL}/matches`);
    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }
    return response.json();
  },

  getMatch: async (id: string): Promise<Match> => {
    const response = await fetch(`${API_BASE_URL}/matches/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch match');
    }
    return response.json();
  },

  createMatch: async (matchData: MatchFormData): Promise<Match> => {
    const response = await fetch(`${API_BASE_URL}/matches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(matchData),
    });
    if (!response.ok) {
      throw new Error('Failed to create match');
    }
    return response.json();
  },

  updateScore: async (id: string, scoreData: Omit<ScoreUpdateData, 'matchId'>): Promise<Match> => {
    const response = await fetch(`${API_BASE_URL}/matches/${id}/score`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        matchId: id,
        homeScore: scoreData.homeScore,
        awayScore: scoreData.awayScore,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to update score');
    }
    return response.json();
  },

  finishMatch: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/matches/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to finish match');
    }
  },
};