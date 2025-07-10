import { createAsyncThunk } from '@reduxjs/toolkit';
import { Match, MatchFormData, ScoreUpdateData } from '../types/Match';
import { matchAPI } from '../services/api';

export const fetchMatches = createAsyncThunk(
  'matches/fetchMatches',
  async () => {
    return await matchAPI.getAllMatches();
  }
);

export const createMatch = createAsyncThunk(
  'matches/createMatch',
  async (matchData: MatchFormData) => {
    return await matchAPI.createMatch(matchData);
  }
);

export const updateMatchScore = createAsyncThunk(
  'matches/updateScore',
  async ({ matchId, homeScore, awayScore }: ScoreUpdateData) => {
    return await matchAPI.updateScore(matchId, { homeScore, awayScore });
  }
);

export const deleteMatch = createAsyncThunk(
  'matches/deleteMatch',
  async (matchId: string) => {
    await matchAPI.finishMatch(matchId);
    return matchId;
  }
);