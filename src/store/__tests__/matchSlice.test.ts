import matchReducer, { startMatch, updateScore, finishMatch } from '../matchSlice';

describe('matchSlice', () => {
  const initialState = {
    matches: {},
    nextId: 1,
  };

  describe('startMatch', () => {
    it('should add a new match with initial score 0-0', () => {
      const action = startMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' });
      const state = matchReducer(initialState, action);
      
      const matches = Object.values(state.matches);
      expect(matches).toHaveLength(1);
      expect(matches[0]).toMatchObject({
        homeTeam: 'Mexico',
        awayTeam: 'Canada',
        homeScore: 0,
        awayScore: 0,
      });
      expect(state.nextId).toBe(2);
    });

    it('should generate unique match IDs', () => {
      let state = initialState;
      state = matchReducer(state, startMatch({ homeTeam: 'Spain', awayTeam: 'Brazil' }));
      state = matchReducer(state, startMatch({ homeTeam: 'Germany', awayTeam: 'France' }));
      
      const matchIds = Object.keys(state.matches);
      expect(matchIds).toHaveLength(2);
      expect(matchIds[0]).not.toBe(matchIds[1]);
    });
  });

  describe('updateScore', () => {
    it('should update the score of an existing match', () => {
      let state = matchReducer(initialState, startMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' }));
      const matchId = Object.keys(state.matches)[0];
      
      state = matchReducer(state, updateScore({ matchId, homeScore: 2, awayScore: 3 }));
      
      expect(state.matches[matchId]).toMatchObject({
        homeScore: 2,
        awayScore: 3,
      });
    });
  });

  describe('finishMatch', () => {
    it('should remove a match from state', () => {
      let state = matchReducer(initialState, startMatch({ homeTeam: 'Mexico', awayTeam: 'Canada' }));
      const matchId = Object.keys(state.matches)[0];
      
      state = matchReducer(state, finishMatch(matchId));
      
      expect(state.matches[matchId]).toBeUndefined();
      expect(Object.keys(state.matches)).toHaveLength(0);
    });
  });
});