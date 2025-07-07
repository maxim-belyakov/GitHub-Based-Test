import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Match, MatchFormData, ScoreUpdateData } from '../types/Match';

interface MatchState {
  matches: Record<string, Match>;
  nextId: number;
}

const initialState: MatchState = {
  matches: {},
  nextId: 1,
};

const matchSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    startMatch: (state, action: PayloadAction<MatchFormData>) => {
      const { homeTeam, awayTeam } = action.payload;
      
      if (!homeTeam || !awayTeam) {
        throw new Error('Team names cannot be empty');
      }
      
      if (homeTeam === awayTeam) {
        throw new Error('Home and away teams must be different');
      }
      
      const id = `match_${state.nextId}_${Date.now()}`;
      state.matches[id] = {
        id,
        homeTeam,
        awayTeam,
        homeScore: 0,
        awayScore: 0,
        startTime: Date.now(),
      };
      state.nextId += 1;
    },
    
    updateScore: (state, action: PayloadAction<ScoreUpdateData>) => {
      const { matchId, homeScore, awayScore } = action.payload;
      
      if (!state.matches[matchId]) {
        throw new Error('Match not found');
      }
      
      if (homeScore < 0 || awayScore < 0) {
        throw new Error('Scores cannot be negative');
      }
      
      state.matches[matchId].homeScore = homeScore;
      state.matches[matchId].awayScore = awayScore;
    },
    
    finishMatch: (state, action: PayloadAction<string>) => {
      const matchId = action.payload;
      
      if (!state.matches[matchId]) {
        throw new Error('Match not found');
      }
      
      delete state.matches[matchId];
    },
  },
});

export const { startMatch, updateScore, finishMatch } = matchSlice.actions;
export default matchSlice.reducer;