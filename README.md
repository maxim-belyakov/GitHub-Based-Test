# Live Football World Cup Scoreboard

A React application with TypeScript and Redux for managing live football match scores.

## Features

- Start new matches with initial score 0-0
- Update match scores with absolute values
- Finish matches and remove them from the scoreboard
- Get a summary of all matches in progress, ordered by:
  - Total score (descending)
  - Most recently started match (for matches with same total score)

## Tech Stack

- **React** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Vite** - Build tool
- **Jest** - Testing framework
- **Testing Library** - React testing utilities

## Installation

```bash
# Clone the repository
git clone https://github.com/maxim-belyakov/sportradar.git
cd sportradar

# Install dependencies with Yarn
yarn install
```

## Running the Application

```bash
# Start the development server
yarn start

# The application will be available at http://localhost:5173
```

## Usage

1. **Start a New Match**: Enter the home and away team names in the form and click "Start Match"
2. **Update Score**: Click "Update Score" on any match card, enter the new scores, and click "Save"
3. **Finish Match**: Click "Finish Match" to remove the match from the scoreboard
4. **View Summary**: Matches are automatically sorted by total score (highest first), with ties sorted by most recently started

## Project Structure

```
src/
├── components/          # React components
│   ├── AddMatchForm.tsx    # Form to add new matches
│   ├── MatchCard.tsx       # Individual match display
│   └── Scoreboard.tsx      # Main scoreboard container
├── store/              # Redux store configuration
│   ├── matchSlice.ts      # Match state and actions
│   ├── selectors.ts       # Memoized selectors
│   └── store.ts           # Store configuration
├── types/              # TypeScript type definitions
│   └── Match.ts           # Match interfaces
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── *.css               # Styling files
```

## Development

### Available Scripts

```bash
# Start development server
yarn start

# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Build for production
yarn build

# Preview production build
yarn preview

# Run linter
yarn lint
```

## Design Decisions

1. **Redux Toolkit**: Used for simplified Redux setup with built-in best practices
2. **In-Memory Storage**: Matches stored in Redux state with unique ID generation
3. **Memoized Selectors**: Used `createSelector` for efficient sorting and filtering
4. **Component Architecture**: Separated concerns with container and presentational components
5. **TypeScript**: Strong typing throughout the application for better developer experience
6. **Vite**: Modern build tool for fast development and optimized production builds
7. **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes

## Assumptions

1. Match IDs are generated internally and not provided by the user
2. Scores are always absolute values (not incremental updates)
3. A team can play in multiple matches simultaneously
4. No persistence is required between application restarts
5. Thread safety is not required for this implementation

## Future Enhancements

1. Add match events (goals, cards, substitutions)
2. Add team statistics tracking
3. Implement match status (not started, in progress, half-time, finished)
4. Add data persistence layer
5. Implement WebSocket support for real-time updates
6. Add match duration tracking
7. Support for tournament/competition grouping
