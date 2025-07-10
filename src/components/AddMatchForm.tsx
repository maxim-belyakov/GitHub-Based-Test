import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startMatch } from '../store/matchSlice';
import { createMatch } from '../store/matchThunks';
import { RootState, AppDispatch } from '../store/store';
import './AddMatchForm.css';

export function AddMatchForm() {
  const dispatch = useDispatch<AppDispatch>();
  const useBackend = useSelector((state: RootState) => state.matches.useBackend);
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!homeTeam.trim() || !awayTeam.trim()) {
      alert('Please enter both team names');
      return;
    }

    if (homeTeam.trim() === awayTeam.trim()) {
      alert('Home and away teams must be different');
      return;
    }

    try {
      const matchData = {
        homeTeam: homeTeam.trim(),
        awayTeam: awayTeam.trim(),
      };

      if (useBackend) {
        await dispatch(createMatch(matchData)).unwrap();
      } else {
        dispatch(startMatch(matchData));
      }
      
      setHomeTeam('');
      setAwayTeam('');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to start match');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-match-form">
      <div className="form-group">
        <label htmlFor="home-team">Home Team</label>
        <input
          id="home-team"
          type="text"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          placeholder="Enter home team name"
          className="form-input"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="away-team">Away Team</label>
        <input
          id="away-team"
          type="text"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          placeholder="Enter away team name"
          className="form-input"
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        Start Match
      </button>
    </form>
  );
}