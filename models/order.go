package models

import (
	"time"
)

type Order struct {
	ID        uint        `json:"id" gorm:"primary_key"`
	UserID    uint        `json:"user_id" gorm:"not null"`
	User      User        `json:"user,omitempty"`
	Items     []OrderItem `json:"items,omitempty"`
	Status    string      `json:"status" gorm:"default:'pending'"`
	CreatedAt time.Time   `json:"created_at"`
	UpdatedAt time.Time   `json:"updated_at"`
}

type OrderItem struct {
	ID      uint  `json:"id" gorm:"primary_key"`
	OrderID uint  `json:"order_id" gorm:"not null"`
	ItemID  uint  `json:"item_id" gorm:"not null"`
	Item    Item  `json:"item,omitempty"`
	Order   Order `json:"order,omitempty"`
} 