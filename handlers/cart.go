package handlers

import (
	"net/http"
	"shopping-cart/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type CartHandler struct {
	db *gorm.DB
}

func NewCartHandler(db *gorm.DB) *CartHandler {
	return &CartHandler{db: db}
}

type CreateCartRequest struct {
	ItemID uint `json:"item_id" binding:"required"`
}

func (h *CartHandler) CreateCart(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)

	var req CreateCartRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if item exists
	var item models.Item
	if err := h.db.First(&item, req.ItemID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Item not found"})
		return
	}

	// Check if user already has a cart
	var existingCart models.Cart
	if err := h.db.Where("user_id = ?", userID).First(&existingCart).Error; err != nil {
		// Create new cart
		cart := models.Cart{
			UserID: userID,
		}
		if err := h.db.Create(&cart).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create cart"})
			return
		}
		existingCart = cart
	}

	// Add item to cart
	cartItem := models.CartItem{
		CartID: existingCart.ID,
		ItemID: req.ItemID,
	}

	if err := h.db.Create(&cartItem).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to add item to cart"})
		return
	}

	// Return the cart with items
	var cart models.Cart
	h.db.Preload("Items.Item").Where("id = ?", existingCart.ID).First(&cart)

	c.JSON(http.StatusCreated, cart)
}

func (h *CartHandler) ListCarts(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)

	var cart models.Cart
	if err := h.db.Preload("Items.Item").Where("user_id = ?", userID).First(&cart).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusOK, gin.H{"message": "No cart found", "cart": nil})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch cart"})
		return
	}

	c.JSON(http.StatusOK, cart)
}

func (h *CartHandler) RemoveFromCart(c *gin.Context) {
	userID := c.MustGet("user_id").(uint)
	itemID := c.Param("item_id")

	// Get user's cart
	var cart models.Cart
	if err := h.db.Where("user_id = ?", userID).First(&cart).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Cart not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch cart"})
		return
	}

	// Delete the cart item
	if err := h.db.Where("cart_id = ? AND item_id = ?", cart.ID, itemID).Delete(&models.CartItem{}).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to remove item from cart"})
		return
	}

	// Return updated cart
	var updatedCart models.Cart
	if err := h.db.Preload("Items.Item").Where("id = ?", cart.ID).First(&updatedCart).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch updated cart"})
		return
	}

	c.JSON(http.StatusOK, updatedCart)
} 