package main

import (
	"log"
	"shopping-cart/models"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
)

func seedDatabase() {
	// Initialize database
	db, err := gorm.Open("sqlite3", "shopping_cart.db")
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer db.Close()

	// Auto migrate the schema
	db.AutoMigrate(&models.User{}, &models.Item{}, &models.Cart{}, &models.CartItem{}, &models.Order{}, &models.OrderItem{})

	// Seed items
	items := []models.Item{
		// Electronics
		{
			Name:        "MacBook Pro 16\"",
			Description: "High-performance laptop with M2 Pro chip, perfect for professionals and creatives",
			Price:       2499.99,
			ImageURL:    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
			Category:    "Electronics",
			Stock:       15,
		},
		{
			Name:        "iPhone 15 Pro",
			Description: "Latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
			Price:       999.99,
			ImageURL:    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
			Category:    "Electronics",
			Stock:       25,
		},
		{
			Name:        "Sony WH-1000XM5",
			Description: "Premium wireless noise-canceling headphones with exceptional sound quality",
			Price:       349.99,
			ImageURL:    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
			Category:    "Electronics",
			Stock:       20,
		},
		{
			Name:        "iPad Air",
			Description: "10.9-inch tablet with M1 chip, perfect for work and entertainment",
			Price:       599.99,
			ImageURL:    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop",
			Category:    "Electronics",
			Stock:       18,
		},
		{
			Name:        "Apple Watch Series 9",
			Description: "Advanced smartwatch with health monitoring and fitness tracking",
			Price:       399.99,
			ImageURL:    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
			Category:    "Electronics",
			Stock:       30,
		},
		{
			Name:        "Canon EOS R6",
			Description: "Professional mirrorless camera with 20MP sensor and 4K video",
			Price:       2499.99,
			ImageURL:    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
			Category:    "Electronics",
			Stock:       8,
		},
		// Fashion
		{
			Name:        "Nike Air Max 270",
			Description: "Comfortable running shoes with Air Max technology",
			Price:       129.99,
			ImageURL:    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
			Category:    "Fashion",
			Stock:       45,
		},
		{
			Name:        "Levi's 501 Jeans",
			Description: "Classic straight-fit jeans in dark wash denim",
			Price:       89.99,
			ImageURL:    "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop",
			Category:    "Fashion",
			Stock:       60,
		},
		{
			Name:        "Ray-Ban Aviator",
			Description: "Iconic aviator sunglasses with UV protection",
			Price:       159.99,
			ImageURL:    "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
			Category:    "Fashion",
			Stock:       35,
		},
		// Home & Garden
		{
			Name:        "Philips Hue Starter Kit",
			Description: "Smart lighting system with 3 bulbs and bridge",
			Price:       199.99,
			ImageURL:    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
			Category:    "Home & Garden",
			Stock:       22,
		},
		{
			Name:        "Dyson V15 Detect",
			Description: "Cordless vacuum with laser dust detection",
			Price:       699.99,
			ImageURL:    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
			Category:    "Home & Garden",
			Stock:       12,
		},
		{
			Name:        "Instant Pot Duo",
			Description: "7-in-1 electric pressure cooker for quick meals",
			Price:       89.99,
			ImageURL:    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
			Category:    "Home & Garden",
			Stock:       28,
		},
		// Books
		{
			Name:        "The Psychology of Money",
			Description: "Timeless lessons on wealth, greed, and happiness",
			Price:       24.99,
			ImageURL:    "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop",
			Category:    "Books",
			Stock:       50,
		},
		{
			Name:        "Atomic Habits",
			Description: "An easy way to build good habits and break bad ones",
			Price:       19.99,
			ImageURL:    "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
			Category:    "Books",
			Stock:       40,
		},
		{
			Name:        "Rich Dad Poor Dad",
			Description: "What the rich teach their kids about money",
			Price:       16.99,
			ImageURL:    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop",
			Category:    "Books",
			Stock:       35,
		},
	}

	for _, item := range items {
		if err := db.Create(&item).Error; err != nil {
			log.Printf("Failed to create item %s: %v", item.Name, err)
		} else {
			log.Printf("Created item: %s - $%.2f", item.Name, item.Price)
		}
	}

	log.Println("Database seeding completed!")
} 