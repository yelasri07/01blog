#!/bin/bash

echo "Starting PostgreSQL with Docker..."
docker compose up -d

echo "Starting Backend (Spring Boot)..."
cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!
cd ..

echo "Starting Frontend (Angular)..."
cd frontend
npm install
npm start &
FRONTEND_PID=$!
cd ..

echo "Application is running."
echo "Press CTRL+C to stop everything."

wait