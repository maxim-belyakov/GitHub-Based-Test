#!/bin/bash

echo "Starting Full-Stack Match Tracker Application..."
echo "=============================================="

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "Error: Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Check if Maven is installed
if ! command -v mvn &> /dev/null; then
    echo "Warning: Maven is not installed. You'll need to install Maven to build the backend."
    echo "Visit: https://maven.apache.org/install.html"
else
    echo "Building backend..."
    cd backend
    mvn clean compile
    cd ..
fi

echo ""
echo "To run the application:"
echo "1. Backend: cd backend && mvn spring-boot:run"
echo "2. Frontend: cd frontend && npm start"
echo ""
echo "The backend will run on http://localhost:8080"
echo "The frontend will run on http://localhost:3000"