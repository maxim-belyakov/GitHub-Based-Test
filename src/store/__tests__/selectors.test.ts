import { selectMatchesArray, selectMatchesSorted } from '../selectors';
import { RootState } from '../store';
import { Match } from '../../types/Match';

describe('selectors', () => {
  const createMatch = (id: string, homeTeam: string, awayTeam: string, homeScore: number, awayScore: number, startTime: number): Match => ({
    id,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    startTime,
  });

  describe('selectMatchesArray', () => {
    it('should return an array of matches', () => {
      const state: RootState = {
        matches: {
          matches: {
            'match1': createMatch('match1', 'Spain', 'Brazil', 10, 2, 1000),
            'match2': createMatch('match2', 'Mexico', 'Canada', 0, 5, 2000),
          },
          nextId: 3,
        },
      };

      const result = selectMatchesArray(state);
      expect(result).toHaveLength(2);
      expect(result.map(m => m.id)).toContain('match1');
      expect(result.map(m => m.id)).toContain('match2');
    });
  });

  describe('selectMatchesSorted', () => {
    it('should sort matches by total score (highest first)', () => {
      const state: RootState = {
        matches: {
          matches: {
            'match1': createMatch('match1', 'Mexico', 'Canada', 0, 5, 1000), // total: 5
            'match2': createMatch('match2', 'Spain', 'Brazil', 10, 2, 2000), // total: 12
            'match3': createMatch('match3', 'Germany', 'France', 2, 2, 3000), // total: 4
          },
          nextId: 4,
        },
      };

      const result = selectMatchesSorted(state);
      expect(result[0].id).toBe('match2'); // Spain vs Brazil (12)
      expect(result[1].id).toBe('match1'); // Mexico vs Canada (5)
      expect(result[2].id).toBe('match3'); // Germany vs France (4)
    });

    it('should sort matches with same total score by most recently started', () => {
      const state: RootState = {
        matches: {
          matches: {
            'match1': createMatch('match1', 'Spain', 'Brazil', 10, 2, 1000), // total: 12
            'match2': createMatch('match2', 'Uruguay', 'Italy', 6, 6, 2000), // total: 12
            'match3': createMatch('match3', 'Germany', 'France', 2, 2, 3000), // total: 4
            'match4': createMatch('match4', 'Argentina', 'Australia', 3, 1, 4000), // total: 4
          },
          nextId: 5,
        },
      };

      const result = selectMatchesSorted(state);
      expect(result[0].id).toBe('match2'); // Uruguay vs Italy (12, started later)
      expect(result[1].id).toBe('match1'); // Spain vs Brazil (12, started earlier)
      expect(result[2].id).toBe('match4'); // Argentina vs Australia (4, started later)
      expect(result[3].id).toBe('match3'); // Germany vs France (4, started earlier)
    });
  });
});