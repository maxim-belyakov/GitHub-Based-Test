# Full-Stack Match Tracker Application

A full-stack application with React TypeScript frontend and Java Spring Boot backend for tracking sports matches.

## Features

- Add new matches with team names and scores
- View all matches in a responsive card layout
- Delete matches
- Input validation and sanitization
- RESTful API with H2 in-memory database
- Comprehensive error handling

## Tech Stack

### Frontend
- React 18 with TypeScript
- Axios for API calls
- DOMPurify for input sanitization
- Jest & React Testing Library for tests

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- H2 Database (in-memory)
- Apache Commons Text for sanitization
- Bean Validation for input validation

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 16 or higher
- Maven 3.6 or higher

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Build the application:
```bash
mvn clean install
```

3. Run the application:
```bash
mvn spring-boot:run
```

The backend will start on http://localhost:8080

You can access the H2 console at http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:testdb`
- Username: `sa`
- Password: (leave empty)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on http://localhost:3000

## API Endpoints

- `GET /api/matches` - Get all matches
- `GET /api/matches/{id}` - Get a specific match
- `POST /api/matches` - Create a new match
- `PUT /api/matches/{id}` - Update a match
- `DELETE /api/matches/{id}` - Delete a match
- `GET /api/matches/search?team={teamName}` - Search matches by team name

## Running Tests

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
mvn test
```

## Security Features

- Input sanitization on both frontend and backend
- XSS protection through HTML escaping
- CORS configuration for frontend-backend communication
- Bean validation for data integrity

## Project Structure

```
fullstack-app/
├── backend/
│   ├── src/main/java/com/sportradar/fullstack/
│   │   ├── controller/    # REST controllers
│   │   ├── dto/          # Data transfer objects
│   │   ├── entity/       # JPA entities
│   │   ├── repository/   # Data repositories
│   │   ├── service/      # Business logic
│   │   ├── util/         # Utilities (sanitizer)
│   │   └── config/       # Configuration classes
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── services/     # API services
│   │   ├── types/        # TypeScript types
│   │   └── utils/        # Utilities
│   └── public/
└── README.md
```