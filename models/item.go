package models

import (
	"time"
)

type Item struct {
	ID          uint      `json:"id" gorm:"primary_key"`
	Name        string    `json:"name" gorm:"not null"`
	Description string    `json:"description"`
	Price       float64   `json:"price" gorm:"not null"`
	ImageURL    string    `json:"image_url"`
	Category    string    `json:"category" gorm:"not null"`
	Stock       int       `json:"stock" gorm:"default:10"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
} 