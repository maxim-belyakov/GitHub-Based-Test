import React, { useState, useEffect } from 'react';
import './App.css';
import { Match } from './types/Match';
import { matchAPI } from './services/api';
import MatchCard from './components/MatchCard';
import AddMatchForm from './components/AddMatchForm';

function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const data = await matchAPI.getAllMatches();
      setMatches(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch matches. Please make sure the backend is running.');
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMatch = async (match: Match) => {
    try {
      const newMatch = await matchAPI.createMatch(match);
      setMatches(prev => [newMatch, ...prev]);
      setError(null);
    } catch (err) {
      setError('Failed to add match. Please try again.');
      console.error('Error adding match:', err);
    }
  };

  const handleDeleteMatch = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this match?')) {
      try {
        await matchAPI.deleteMatch(id);
        setMatches(prev => prev.filter(match => match.id !== id));
        setError(null);
      } catch (err) {
        setError('Failed to delete match. Please try again.');
        console.error('Error deleting match:', err);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Match Tracker</h1>
      </header>
      
      <main className="App-main">
        <AddMatchForm onSubmit={handleAddMatch} />
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {loading ? (
          <div className="loading">Loading matches...</div>
        ) : (
          <div className="matches-container">
            <h2>Recent Matches</h2>
            {matches.length === 0 ? (
              <p className="no-matches">No matches yet. Add your first match above!</p>
            ) : (
              <div className="matches-grid">
                {matches.map(match => (
                  <MatchCard
                    key={match.id}
                    match={match}
                    onDelete={handleDeleteMatch}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
