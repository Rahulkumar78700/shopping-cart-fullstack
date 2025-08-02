#!/bin/bash

echo "🚀 Setting up Shopping Cart Application..."

# Check if Go is installed
if ! command -v go &> /dev/null; then
    echo "❌ Go is not installed. Please install Go first:"
    echo "   macOS: brew install go"
    echo "   Ubuntu: sudo apt install golang-go"
    echo "   Windows: Download from https://golang.org/dl/"
    exit 1
fi

echo "✅ Go is installed: $(go version)"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   macOS: brew install node"
    echo "   Ubuntu: sudo apt install nodejs npm"
    echo "   Windows: Download from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js is installed: $(node --version)"

# Install Go dependencies
echo "📦 Installing Go dependencies..."
go mod tidy

# Seed the database
echo "🌱 Seeding database with sample items..."
go run seed.go

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Start the backend server:"
echo "   go run main.go"
echo ""
echo "2. In a new terminal, start the frontend:"
echo "   cd frontend && npm start"
echo ""
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "Happy shopping! 🛒" 