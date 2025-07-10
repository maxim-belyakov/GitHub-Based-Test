import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Scoreboard } from './components/Scoreboard';
import { AddMatchForm } from './components/AddMatchForm';
import { RootState, AppDispatch } from './store/store';
import { fetchMatches } from './store/matchThunks';
import { toggleBackend } from './store/matchSlice';
import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { useBackend, loading, error } = useSelector((state: RootState) => state.matches);

  useEffect(() => {
    if (useBackend) {
      dispatch(fetchMatches());
    }
  }, [dispatch, useBackend]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Live Football World Cup Scoreboard</h1>
        <div className="backend-toggle">
          <label>
            <input
              type="checkbox"
              checked={useBackend}
              onChange={() => dispatch(toggleBackend())}
            />
            Use Backend API
          </label>
          {useBackend && error && (
            <span className="backend-error">Backend unavailable</span>
          )}
        </div>
      </header>
      <main className="app-main">
        <section className="add-match-section">
          <h2>Start New Match</h2>
          <AddMatchForm />
        </section>
        <section className="scoreboard-section">
          <h2>Live Matches</h2>
          {loading ? (
            <div className="loading">Loading matches...</div>
          ) : (
            <Scoreboard />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;