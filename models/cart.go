package models

import (
	"time"
)

type Cart struct {
	ID        uint       `json:"id" gorm:"primary_key"`
	UserID    uint       `json:"user_id" gorm:"not null;unique"`
	User      User       `json:"user,omitempty"`
	Items     []CartItem `json:"items,omitempty"`
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
}

type CartItem struct {
	ID     uint  `json:"id" gorm:"primary_key"`
	CartID uint  `json:"cart_id" gorm:"not null"`
	ItemID uint  `json:"item_id" gorm:"not null"`
	Item   Item  `json:"item,omitempty"`
	Cart   Cart  `json:"cart,omitempty"`
} 