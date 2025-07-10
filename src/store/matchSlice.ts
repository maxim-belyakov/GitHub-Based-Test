import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Match, MatchFormData, ScoreUpdateData } from '../types/Match';
import { fetchMatches, createMatch, updateMatchScore, deleteMatch } from './matchThunks';

interface MatchState {
  matches: Record<string, Match>;
  nextId: number;
  loading: boolean;
  error: string | null;
  useBackend: boolean;
}

const initialState: MatchState = {
  matches: {},
  nextId: 1,
  loading: false,
  error: null,
  useBackend: true,
};

const matchSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    toggleBackend: (state) => {
      state.useBackend = !state.useBackend;
    },
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
  extraReducers: (builder) => {
    builder
      // Fetch matches
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = {};
        action.payload.forEach(match => {
          state.matches[match.id] = match;
        });
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch matches';
      })
      // Create match
      .addCase(createMatch.fulfilled, (state, action) => {
        state.matches[action.payload.id] = action.payload;
      })
      // Update score
      .addCase(updateMatchScore.fulfilled, (state, action) => {
        state.matches[action.payload.id] = action.payload;
      })
      // Delete match
      .addCase(deleteMatch.fulfilled, (state, action) => {
        delete state.matches[action.payload];
      });
  },
});

export const { startMatch, updateScore, finishMatch, toggleBackend } = matchSlice.actions;
export default matchSlice.reducer;