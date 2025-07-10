import React from 'react';
import { Match } from '../types/Match';
import './MatchCard.css';

interface MatchCardProps {
  match: Match;
  onDelete: (id: number) => void;
}

const MatchCard: React.FC<MatchCardProps> = ({ match, onDelete }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="match-card">
      <div className="match-header">
        <h3>{match.homeTeam} vs {match.awayTeam}</h3>
        <button 
          className="delete-button"
          onClick={() => match.id && onDelete(match.id)}
          aria-label="Delete match"
        >
          ×
        </button>
      </div>
      <div className="match-score">
        <span className="score">{match.homeScore}</span>
        <span className="separator">-</span>
        <span className="score">{match.awayScore}</span>
      </div>
      <div className="match-date">
        {formatDate(match.matchDate)}
      </div>
    </div>
  );
};

export default MatchCard;