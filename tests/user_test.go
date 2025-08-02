package tests

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"shopping-cart/handlers"
	"shopping-cart/models"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
)

var _ = Describe("User Tests", func() {
	var (
		router *gin.Engine
		db     *gorm.DB
	)

	BeforeEach(func() {
		gin.SetMode(gin.TestMode)
		router = gin.New()
		
		var err error
		db, err = gorm.Open("sqlite3", ":memory:")
		Expect(err).NotTo(HaveOccurred())
		
		db.AutoMigrate(&models.User{})
		
		userHandler := handlers.NewUserHandler(db)
		router.POST("/users", userHandler.CreateUser)
		router.POST("/users/login", userHandler.Login)
	})

	AfterEach(func() {
		db.Close()
	})

	Describe("User Registration", func() {
		It("should create a new user successfully", func() {
			userData := map[string]interface{}{
				"username": "testuser",
				"password": "testpass",
			}
			
			jsonData, _ := json.Marshal(userData)
			req, _ := http.NewRequest("POST", "/users", bytes.NewBuffer(jsonData))
			req.Header.Set("Content-Type", "application/json")
			
			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)
			
			Expect(w.Code).To(Equal(http.StatusCreated))
			
			var response map[string]interface{}
			json.Unmarshal(w.Body.Bytes(), &response)
			Expect(response["username"]).To(Equal("testuser"))
			Expect(response["token"]).NotTo(BeEmpty())
		})

		It("should return error for duplicate username", func() {
			userData := map[string]interface{}{
				"username": "testuser",
				"password": "testpass",
			}
			
			jsonData, _ := json.Marshal(userData)
			
			// Create first user
			req1, _ := http.NewRequest("POST", "/users", bytes.NewBuffer(jsonData))
			req1.Header.Set("Content-Type", "application/json")
			w1 := httptest.NewRecorder()
			router.ServeHTTP(w1, req1)
			Expect(w1.Code).To(Equal(http.StatusCreated))
			
			// Try to create duplicate user
			req2, _ := http.NewRequest("POST", "/users", bytes.NewBuffer(jsonData))
			req2.Header.Set("Content-Type", "application/json")
			w2 := httptest.NewRecorder()
			router.ServeHTTP(w2, req2)
			Expect(w2.Code).To(Equal(http.StatusConflict))
		})
	})

	Describe("User Login", func() {
		BeforeEach(func() {
			userData := map[string]interface{}{
				"username": "testuser",
				"password": "testpass",
			}
			
			jsonData, _ := json.Marshal(userData)
			req, _ := http.NewRequest("POST", "/users", bytes.NewBuffer(jsonData))
			req.Header.Set("Content-Type", "application/json")
			
			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)
		})

		It("should login successfully with correct credentials", func() {
			loginData := map[string]interface{}{
				"username": "testuser",
				"password": "testpass",
			}
			
			jsonData, _ := json.Marshal(loginData)
			req, _ := http.NewRequest("POST", "/users/login", bytes.NewBuffer(jsonData))
			req.Header.Set("Content-Type", "application/json")
			
			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)
			
			Expect(w.Code).To(Equal(http.StatusOK))
			
			var response map[string]interface{}
			json.Unmarshal(w.Body.Bytes(), &response)
			Expect(response["username"]).To(Equal("testuser"))
			Expect(response["token"]).NotTo(BeEmpty())
		})

		It("should return error for incorrect password", func() {
			loginData := map[string]interface{}{
				"username": "testuser",
				"password": "wrongpass",
			}
			
			jsonData, _ := json.Marshal(loginData)
			req, _ := http.NewRequest("POST", "/users/login", bytes.NewBuffer(jsonData))
			req.Header.Set("Content-Type", "application/json")
			
			w := httptest.NewRecorder()
			router.ServeHTTP(w, req)
			
			Expect(w.Code).To(Equal(http.StatusUnauthorized))
		})
	})
}) 