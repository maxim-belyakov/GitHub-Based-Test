# Live Football World Cup Scoreboard

A full-stack application with React TypeScript frontend and Java Spring Boot backend for managing live football match scores.

## Features

- Start new matches with initial score 0-0
- Update match scores with absolute values
- Finish matches and remove them from the scoreboard
- Get a summary of all matches in progress, ordered by:
  - Total score (descending)
  - Most recently started match (for matches with same total score)
- Toggle between local Redux state and backend API
- Input sanitization on both frontend and backend
- RESTful API with H2 in-memory database

## Tech Stack

### Frontend
- **React** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Vite** - Build tool
- **Jest** - Testing framework
- **Testing Library** - React testing utilities

### Backend
- **Java 17** - Programming language
- **Spring Boot 3.2.0** - Framework
- **Spring Data JPA** - Data persistence
- **H2 Database** - In-memory database
- **Apache Commons Text** - Input sanitization
- **Bean Validation** - Input validation

## Prerequisites

- Node.js 16 or higher
- Java 17 or higher
- Maven 3.6 or higher

## Installation

```bash
# Clone the repository
git clone https://github.com/maxim-belyakov/sportradar.git
cd sportradar

# Install frontend dependencies with Yarn
yarn install
```

## Running the Application

### Option 1: Frontend Only (with local Redux state)

```bash
# Start the development server
yarn start

# The application will be available at http://localhost:5173
```

### Option 2: Full Stack (with Java backend)

#### Start the Backend:
```bash
cd backend
mvn spring-boot:run

# The backend will be available at http://localhost:8080
# H2 Console: http://localhost:8080/h2-console (username: sa, no password)
```

#### Start the Frontend:
```bash
# In the root directory
yarn start

# The application will be available at http://localhost:5173
# Toggle "Use Backend API" checkbox to switch between local and backend storage
```

## Usage

1. **Start a New Match**: Enter the home and away team names in the form and click "Start Match"
2. **Update Score**: Click "Update Score" on any match card, enter the new scores, and click "Save"
3. **Finish Match**: Click "Finish Match" to remove the match from the scoreboard
4. **View Summary**: Matches are automatically sorted by total score (highest first), with ties sorted by most recently started

## Project Structure

```
.
├── backend/                    # Java Spring Boot backend
│   └── src/main/java/com/sportradar/matchtracker/
│       ├── controller/        # REST controllers
│       ├── dto/              # Data transfer objects
│       ├── entity/           # JPA entities
│       ├── repository/       # Data repositories
│       ├── service/          # Business logic
│       ├── util/            # Utilities (sanitizer)
│       └── config/          # Configuration classes
├── src/                      # React TypeScript frontend
│   ├── components/          # React components
│   │   ├── AddMatchForm.tsx    # Form to add new matches
│   │   ├── MatchCard.tsx       # Individual match display
│   │   └── Scoreboard.tsx      # Main scoreboard container
│   ├── store/              # Redux store configuration
│   │   ├── matchSlice.ts      # Match state and actions
│   │   ├── matchThunks.ts     # Async actions for API
│   │   ├── selectors.ts       # Memoized selectors
│   │   └── store.ts           # Store configuration
│   ├── services/           # API services
│   │   └── api.ts            # Backend API integration
│   ├── types/              # TypeScript type definitions
│   │   └── Match.ts           # Match interfaces
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── *.css               # Styling files
└── README.md              # This file
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

## API Endpoints

- `GET /api/matches` - Get all matches
- `GET /api/matches/{id}` - Get a specific match
- `POST /api/matches` - Create a new match
- `PUT /api/matches/{id}/score` - Update match score
- `DELETE /api/matches/{id}` - Finish/delete a match

## Design Decisions

1. **Redux Toolkit**: Used for simplified Redux setup with built-in best practices
2. **Dual Storage**: Support for both local Redux state and backend API storage
3. **In-Memory Database**: H2 for quick development without external dependencies
4. **Input Sanitization**: Protection against XSS on both frontend and backend
5. **Memoized Selectors**: Used `createSelector` for efficient sorting and filtering
6. **Component Architecture**: Separated concerns with container and presentational components
7. **TypeScript**: Strong typing throughout the application for better developer experience
8. **Vite**: Modern build tool for fast development and optimized production builds
9. **Responsive Design**: Mobile-friendly layout that adapts to different screen sizes
10. **Spring Boot**: Rapid backend development with embedded server

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
