# Setup Guide for Shopping Cart Application

This guide will help you set up and run the Shopping Cart application on your system.

## Prerequisites

### 1. Install Go (Required for Backend)

#### On macOS:
```bash
# Using Homebrew
brew install go

# Or download from https://golang.org/dl/
```

#### On Ubuntu/Debian:
```bash
sudo apt update
sudo apt install golang-go
```

#### On Windows:
Download and install from https://golang.org/dl/

#### Verify Go installation:
```bash
go version
```

### 2. Install Node.js (Required for Frontend)

#### On macOS:
```bash
# Using Homebrew
brew install node

# Or download from https://nodejs.org/
```

#### On Ubuntu/Debian:
```bash
sudo apt update
sudo apt install nodejs npm
```

#### On Windows:
Download and install from https://nodejs.org/

#### Verify Node.js installation:
```bash
node --version
npm --version
```

## Quick Setup

### Option 1: Using Makefile (Recommended)

1. **Install Go dependencies and seed database:**
   ```bash
   make setup
   ```

2. **Start the backend server:**
   ```bash
   make run
   ```

3. **In a new terminal, start the frontend:**
   ```bash
   make frontend-start
   ```

### Option 2: Manual Setup

1. **Install Go dependencies:**
   ```bash
   go mod tidy
   ```

2. **Seed the database with sample items:**
   ```bash
   go run seed.go
   ```

3. **Start the backend server:**
   ```bash
   go run main.go
   ```

4. **In a new terminal, install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

5. **Start the frontend development server:**
   ```bash
   npm start
   ```

## Accessing the Application

- **Frontend (React App):** http://localhost:3000
- **Backend API:** http://localhost:8080

## Testing the Application

### 1. User Registration/Login
1. Open http://localhost:3000 in your browser
2. Register a new account or login with existing credentials
3. You'll be redirected to the items page upon successful authentication

### 2. Shopping Flow
1. Browse available items on the main page
2. Click "Add to Cart" to add items to your shopping cart
3. Use the "Cart" button to view your current cart items
4. Use the "Order History" button to view your previous orders
5. Click "Checkout" to convert your cart into an order

### 3. API Testing with Postman
1. Import the `Shopping_Cart_API.postman_collection.json` file into Postman
2. Set the `base_url` variable to `http://localhost:8080`
3. Use the collection to test all API endpoints

## Troubleshooting

### Common Issues

1. **"command not found: go"**
   - Install Go following the instructions above
   - Make sure Go is added to your PATH

2. **"command not found: node"**
   - Install Node.js following the instructions above
   - Make sure Node.js is added to your PATH

3. **Port already in use**
   - Backend: Change the port in `main.go` (line 58)
   - Frontend: The React dev server will automatically suggest an alternative port

4. **Database connection issues**
   - Make sure you have write permissions in the project directory
   - The SQLite database file will be created automatically

5. **CORS issues**
   - The backend includes CORS middleware
   - Make sure the frontend is running on the correct port (3000)

### Running Tests

```bash
# Run all tests
make test

# Or manually
go test ./tests/...
```

### Building for Production

```bash
# Build backend
make build

# Build frontend
make frontend-build
```

## Project Structure

```
shopping-cart/
├── main.go                 # Main application entry point
├── seed.go                 # Database seeding script
├── go.mod                  # Go module dependencies
├── models/                 # Database models
├── handlers/               # HTTP request handlers
├── middleware/             # HTTP middleware
├── tests/                  # Test files
├── frontend/              # React frontend
├── README.md              # Main documentation
├── SETUP.md               # This setup guide
├── Makefile               # Build automation
└── Shopping_Cart_API.postman_collection.json  # API testing collection
```

## Support

If you encounter any issues during setup, please:

1. Check that all prerequisites are installed correctly
2. Verify that the required ports (3000, 8080) are available
3. Check the console output for error messages
4. Ensure you have proper permissions in the project directory

For additional help, refer to the main README.md file or check the project documentation. 