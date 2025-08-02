package handlers

import (
	"net/http"
	"shopping-cart/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
)

type ItemHandler struct {
	db *gorm.DB
}

func NewItemHandler(db *gorm.DB) *ItemHandler {
	return &ItemHandler{db: db}
}

type CreateItemRequest struct {
	Name        string  `json:"name" binding:"required"`
	Description string  `json:"description"`
	Price       float64 `json:"price" binding:"required"`
}

func (h *ItemHandler) CreateItem(c *gin.Context) {
	var req CreateItemRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	item := models.Item{
		Name:        req.Name,
		Description: req.Description,
		Price:       req.Price,
	}

	if err := h.db.Create(&item).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create item"})
		return
	}

	c.JSON(http.StatusCreated, item)
}

func (h *ItemHandler) ListItems(c *gin.Context) {
	var items []models.Item
	query := h.db

	// Search functionality
	if search := c.Query("search"); search != "" {
		query = query.Where("name LIKE ? OR description LIKE ?", "%"+search+"%", "%"+search+"%")
	}

	// Category filter
	if category := c.Query("category"); category != "" {
		query = query.Where("category = ?", category)
	}

	// Price range filter
	if minPrice := c.Query("min_price"); minPrice != "" {
		query = query.Where("price >= ?", minPrice)
	}
	if maxPrice := c.Query("max_price"); maxPrice != "" {
		query = query.Where("price <= ?", maxPrice)
	}

	// Sort by price
	if sort := c.Query("sort"); sort != "" {
		switch sort {
		case "price_asc":
			query = query.Order("price ASC")
		case "price_desc":
			query = query.Order("price DESC")
		case "name_asc":
			query = query.Order("name ASC")
		case "name_desc":
			query = query.Order("name DESC")
		}
	} else {
		// Default sort by creation date
		query = query.Order("created_at DESC")
	}

	if err := query.Find(&items).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch items"})
		return
	}

	c.JSON(http.StatusOK, items)
}

func (h *ItemHandler) GetCategories(c *gin.Context) {
	var categories []string
	if err := h.db.Model(&models.Item{}).Select("DISTINCT category").Pluck("category", &categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch categories"})
		return
	}

	c.JSON(http.StatusOK, categories)
} 