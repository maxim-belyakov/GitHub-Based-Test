import { Scoreboard } from './components/Scoreboard';
import { AddMatchForm } from './components/AddMatchForm';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Live Football World Cup Scoreboard</h1>
      </header>
      <main className="app-main">
        <section className="add-match-section">
          <h2>Start New Match</h2>
          <AddMatchForm />
        </section>
        <section className="scoreboard-section">
          <h2>Live Matches</h2>
          <Scoreboard />
        </section>
      </main>
    </div>
  );
}

export default App;