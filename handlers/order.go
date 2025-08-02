package handlers

import (
	"net/http"
	"shopping-cart/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type OrderHandler struct {
	db *gorm.DB
}

func NewOrderHandler(db *gorm.DB) *OrderHandler {
	return &OrderHandler{db: db}
}

func (h *OrderHandler) CreateOrder(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)

	// Get user's cart
	var cart models.Cart
	if err := h.db.Preload("Items.Item").Where("user_id = ?", userID).First(&cart).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusBadRequest, gin.H{"error": "No cart found for user"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch cart"})
		return
	}

	if len(cart.Items) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cart is empty"})
		return
	}

	// Create order
	order := models.Order{
		UserID: userID,
		Status: "pending",
	}

	if err := h.db.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	// Add cart items to order
	for _, cartItem := range cart.Items {
		orderItem := models.OrderItem{
			OrderID: order.ID,
			ItemID:  cartItem.ItemID,
		}
		if err := h.db.Create(&orderItem).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add items to order"})
			return
		}
	}

	// Clear the cart
	h.db.Where("cart_id = ?", cart.ID).Delete(&models.CartItem{})
	h.db.Delete(&cart)

	// Return the order with items
	var createdOrder models.Order
	h.db.Preload("Items.Item").Where("id = ?", order.ID).First(&createdOrder)

	c.JSON(http.StatusCreated, createdOrder)
}

func (h *OrderHandler) ListOrders(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)

	var orders []models.Order
	if err := h.db.Preload("Items.Item").Where("user_id = ?", userID).Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch orders"})
		return
	}

	c.JSON(http.StatusOK, orders)
} 