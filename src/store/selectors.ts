import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

export const selectMatches = (state: RootState) => state.matches.matches;

export const selectMatchesArray = createSelector(
  [selectMatches],
  (matches) => Object.values(matches)
);

export const selectMatchesSorted = createSelector(
  [selectMatchesArray],
  (matches) => {
    return [...matches].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;
      
      if (totalScoreA !== totalScoreB) {
        return totalScoreB - totalScoreA; // higher total score first
      }
      
      // if total scores are equal, most recently started match first
      return b.startTime - a.startTime;
    });
  }
);