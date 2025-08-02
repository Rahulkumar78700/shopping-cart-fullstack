package main

import (
	"log"
	"os"
	"shopping-cart/handlers"
	"shopping-cart/middleware"
	"shopping-cart/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func main() {
	// Set Gin mode based on environment
	if os.Getenv("GIN_MODE") == "release" {
		gin.SetMode(gin.ReleaseMode)
	}

	// Get port from environment variable or default to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Initialize database
	db, err := gorm.Open("sqlite3", "shopping_cart.db")
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Auto migrate the schema
	db.AutoMigrate(&models.User{}, &models.Item{}, &models.Cart{}, &models.CartItem{}, &models.Order{}, &models.OrderItem{})
	
	// Seed the database with initial data
	seedDatabase()

	// Initialize Gin router
	r := gin.Default()

	// Add CORS middleware
	r.Use(middleware.CORS())

	// Initialize handlers with database
	userHandler := handlers.NewUserHandler(db)
	itemHandler := handlers.NewItemHandler(db)
	cartHandler := handlers.NewCartHandler(db)
	orderHandler := handlers.NewOrderHandler(db)

	// Public routes
	r.POST("/users", userHandler.CreateUser)
	r.POST("/users/login", userHandler.Login)
	r.GET("/items", itemHandler.ListItems)
	r.GET("/categories", itemHandler.GetCategories)
	r.POST("/items", itemHandler.CreateItem)

	// Protected routes
	protected := r.Group("/")
	protected.Use(func(c *gin.Context) {
		c.Set("db", db)
		c.Next()
	})
	protected.Use(middleware.AuthMiddleware())
	{
		protected.GET("/users", userHandler.ListUsers)
		protected.POST("/carts", cartHandler.CreateCart)
		protected.GET("/carts", cartHandler.ListCarts)
		protected.DELETE("/carts/:item_id", cartHandler.RemoveFromCart)
		protected.POST("/orders", orderHandler.CreateOrder)
		protected.GET("/orders", orderHandler.ListOrders)
	}

	// Start server
	log.Printf("Server starting on port %s...", port)
	r.Run(":" + port)
} 