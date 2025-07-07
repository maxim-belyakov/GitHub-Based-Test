import { useSelector } from 'react-redux';
import { selectMatchesSorted } from '../store/selectors';
import { MatchCard } from './MatchCard';
import './Scoreboard.css';

export function Scoreboard() {
  const matches = useSelector(selectMatchesSorted);

  if (matches.length === 0) {
    return (
      <div className="scoreboard empty">
        <p>No matches in progress</p>
      </div>
    );
  }

  return (
    <div className="scoreboard">
      {matches.map((match, index) => (
        <MatchCard key={match.id} match={match} rank={index + 1} />
      ))}
    </div>
  );
}