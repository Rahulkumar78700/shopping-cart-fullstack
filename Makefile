.PHONY: help build run test seed clean frontend-install frontend-start frontend-build

# Default target
help:
	@echo "Available commands:"
	@echo "  build           - Build the Go application"
	@echo "  run             - Run the backend server"
	@echo "  test            - Run tests"
	@echo "  seed            - Seed the database with sample data"
	@echo "  clean           - Clean build artifacts"
	@echo "  frontend-install - Install frontend dependencies"
	@echo "  frontend-start  - Start the React development server"
	@echo "  frontend-build  - Build the React application for production"
	@echo "  setup           - Complete setup (install deps, seed DB, start backend)"

# Build the Go application
build:
	go build -o shopping-cart main.go

# Run the backend server
run:
	go run main.go

# Run tests
test:
	go test ./tests/...

# Seed the database with sample data
seed:
	go run seed.go

# Clean build artifacts
clean:
	rm -f shopping-cart
	rm -f shopping_cart.db

# Install frontend dependencies
frontend-install:
	cd frontend && npm install

# Start the React development server
frontend-start:
	cd frontend && npm start

# Build the React application for production
frontend-build:
	cd frontend && npm run build

# Complete setup
setup: frontend-install seed
	@echo "Setup complete! Run 'make run' to start the backend server"
	@echo "Run 'make frontend-start' in another terminal to start the frontend" 