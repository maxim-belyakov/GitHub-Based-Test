import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateScore, finishMatch } from '../store/matchSlice';
import { Match } from '../types/Match';
import './MatchCard.css';

interface MatchCardProps {
  match: Match;
  rank: number;
}

export function MatchCard({ match, rank }: MatchCardProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [homeScore, setHomeScore] = useState(match.homeScore.toString());
  const [awayScore, setAwayScore] = useState(match.awayScore.toString());

  const handleUpdateScore = () => {
    const newHomeScore = parseInt(homeScore);
    const newAwayScore = parseInt(awayScore);

    if (isNaN(newHomeScore) || isNaN(newAwayScore)) {
      alert('Please enter valid numbers for scores');
      return;
    }

    if (newHomeScore < 0 || newAwayScore < 0) {
      alert('Scores cannot be negative');
      return;
    }

    dispatch(updateScore({
      matchId: match.id,
      homeScore: newHomeScore,
      awayScore: newAwayScore,
    }));
    setIsEditing(false);
  };

  const handleFinishMatch = () => {
    if (window.confirm(`Are you sure you want to finish the match between ${match.homeTeam} and ${match.awayTeam}?`)) {
      dispatch(finishMatch(match.id));
    }
  };

  const totalScore = match.homeScore + match.awayScore;

  return (
    <div className="match-card">
      <div className="match-rank">#{rank}</div>
      <div className="match-content">
        <div className="teams">
          <span className="home-team">{match.homeTeam}</span>
          <span className="vs">vs</span>
          <span className="away-team">{match.awayTeam}</span>
        </div>
        
        {isEditing ? (
          <div className="score-edit">
            <input
              type="number"
              value={homeScore}
              onChange={(e) => setHomeScore(e.target.value)}
              min="0"
              className="score-input"
            />
            <span className="score-separator">-</span>
            <input
              type="number"
              value={awayScore}
              onChange={(e) => setAwayScore(e.target.value)}
              min="0"
              className="score-input"
            />
            <button onClick={handleUpdateScore} className="btn btn-save">Save</button>
            <button onClick={() => {
              setIsEditing(false);
              setHomeScore(match.homeScore.toString());
              setAwayScore(match.awayScore.toString());
            }} className="btn btn-cancel">Cancel</button>
          </div>
        ) : (
          <div className="score-display">
            <span className="score">{match.homeScore} - {match.awayScore}</span>
            <span className="total-score">(Total: {totalScore})</span>
          </div>
        )}
      </div>
      
      <div className="match-actions">
        {!isEditing && (
          <>
            <button onClick={() => setIsEditing(true)} className="btn btn-edit">
              Update Score
            </button>
            <button onClick={handleFinishMatch} className="btn btn-finish">
              Finish Match
            </button>
          </>
        )}
      </div>
    </div>
  );
}