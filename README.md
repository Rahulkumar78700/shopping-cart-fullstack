# Shopping Cart Application

A complete e-commerce shopping cart application built with Go (backend) and React (frontend).

## Features

- User registration and authentication with JWT tokens
- Product catalog with items listing
- Shopping cart functionality
- Order management
- Modern React UI with toast notifications
- RESTful API with proper error handling
- SQLite database with GORM ORM
- Comprehensive test suite with Ginkgo

## Tech Stack

### Backend
- **Go** - Programming language
- **Gin** - Web framework
- **GORM** - ORM for database operations
- **JWT** - Authentication tokens
- **SQLite** - Database
- **Ginkgo** - Testing framework

### Frontend
- **React** - Frontend framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Toastify** - Toast notifications
- **CSS3** - Styling

## Project Structure

```
shopping-cart/
├── main.go                 # Main application entry point
├── seed.go                 # Database seeding script
├── go.mod                  # Go module dependencies
├── models/                 # Database models
│   ├── user.go
│   ├── item.go
│   ├── cart.go
│   └── order.go
├── handlers/               # HTTP request handlers
│   ├── user.go
│   ├── item.go
│   ├── cart.go
│   └── order.go
├── middleware/             # HTTP middleware
│   ├── auth.go
│   └── cors.go
├── tests/                  # Test files
│   └── user_test.go
└── frontend/              # React frontend
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js
        ├── index.js
        ├── components/
        │   ├── Login.js
        │   └── ItemsList.js
        └── index.css
```

## API Endpoints

### Public Endpoints
- `POST /users` - Create a new user account
- `POST /users/login` - User login
- `GET /items` - List all available items
- `POST /items` - Create a new item (admin)

### Protected Endpoints (Require JWT Token)
- `GET /users` - List all users
- `POST /carts` - Add item to cart
- `GET /carts` - Get user's cart
- `POST /orders` - Create order from cart
- `GET /orders` - List user's orders

## Setup Instructions

### Prerequisites
- Go 1.21 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. **Install Go dependencies:**
   ```bash
   go mod tidy
   ```

2. **Seed the database with sample items:**
   ```bash
   go run seed.go
   ```

3. **Run the backend server:**
   ```bash
   go run main.go
   ```
   The server will start on `http://localhost:8080`

4. **Run tests (optional):**
   ```bash
   go test ./tests/...
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The React app will start on `http://localhost:3000`

## Usage Guide

### User Flow

1. **Registration/Login:**
   - Visit the application
   - Register a new account or login with existing credentials
   - Upon successful authentication, you'll be redirected to the items page

2. **Shopping:**
   - Browse available items on the main page
   - Click "Add to Cart" to add items to your shopping cart
   - Use the "Cart" button to view your current cart items
   - Use the "Order History" button to view your previous orders

3. **Checkout:**
   - Click the "Checkout" button to convert your cart into an order
   - The cart will be cleared and a new order will be created
   - You'll see a success message confirming the order

### API Examples

#### Create User
```bash
curl -X POST http://localhost:8080/users \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'
```

#### Login
```bash
curl -X POST http://localhost:8080/users/login \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "testpass"}'
```

#### Add Item to Cart (requires token)
```bash
curl -X POST http://localhost:8080/carts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"item_id": 1}'
```

#### Create Order (requires token)
```bash
curl -X POST http://localhost:8080/orders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Database Schema

### Users
- `id` (Primary Key)
- `username` (Unique)
- `password` (Hashed)
- `created_at`
- `updated_at`

### Items
- `id` (Primary Key)
- `name`
- `description`
- `price`
- `created_at`
- `updated_at`

### Carts
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `created_at`
- `updated_at`

### Cart Items
- `id` (Primary Key)
- `cart_id` (Foreign Key)
- `item_id` (Foreign Key)

### Orders
- `id` (Primary Key)
- `user_id` (Foreign Key)
- `status`
- `created_at`
- `updated_at`

### Order Items
- `id` (Primary Key)
- `order_id` (Foreign Key)
- `item_id` (Foreign Key)

## Testing

The application includes comprehensive tests using Ginkgo:

```bash
# Run all tests
go test ./tests/...

# Run specific test file
go test ./tests/user_test.go
```

## Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- CORS middleware for cross-origin requests
- Input validation and sanitization
- SQL injection protection through GORM

## Error Handling

The application includes comprehensive error handling:
- HTTP status codes for different error types
- Descriptive error messages
- Frontend toast notifications for user feedback
- Proper validation of input data

## Future Enhancements

- Inventory management
- Payment integration
- Order status tracking
- User roles and permissions
- Product categories and search
- Shopping cart persistence
- Email notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is open source and available under the MIT License. 