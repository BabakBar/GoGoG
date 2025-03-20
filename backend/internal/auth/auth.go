package auth

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"gogog/internal/db"
	"gogog/internal/models"
)

type Claims struct {
	UserID string `json:"userId"`
	jwt.RegisteredClaims
}

// RegisterUser registers a new user
func RegisterUser(c *gin.Context, database *db.Database, logger *log.Logger) {
	var input struct {
		Username string `json:"username" binding:"required,min=3,max=50"`
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=8"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if username already exists
	var existingUsername string
	err := database.GetDB().QueryRow("SELECT username FROM users WHERE username = $1", input.Username).Scan(&existingUsername)
	if err != sql.ErrNoRows {
		if err == nil {
			c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
			return
		}
		logger.Printf("Error checking username: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Check if email already exists
	var existingEmail string
	err = database.GetDB().QueryRow("SELECT email FROM users WHERE email = $1", input.Email).Scan(&existingEmail)
	if err != sql.ErrNoRows {
		if err == nil {
			c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
			return
		}
		logger.Printf("Error checking email: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		logger.Printf("Error hashing password: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Create user
	now := time.Now()
	_, err = database.GetDB().Exec(
		`INSERT INTO users (username, email, password_hash, points, level, streak, last_streak_day, created_at, last_login_at) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
		input.Username, input.Email, string(hashedPassword), 0, 1, 0, now, now, now,
	)
	if err != nil {
		logger.Printf("Error creating user: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create user"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully"})
}

// LoginUser authenticates a user and returns a JWT token
func LoginUser(c *gin.Context, database *db.Database, logger *log.Logger) {
	var input struct {
		Username string `json:"username" binding:"required"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Find user
	var user models.User
	err := database.GetDB().QueryRow(
		`SELECT id, username, email, password_hash, points, level, streak, last_streak_day, created_at, last_login_at 
         FROM users WHERE username = $1`,
		input.Username,
	).Scan(
		&user.ID, &user.Username, &user.Email, &user.PasswordHash, &user.Points, &user.Level,
		&user.Streak, &user.LastStreakDay, &user.CreatedAt, &user.LastLoginAt,
	)
	
	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
			return
		}
		logger.Printf("Error finding user: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Check password
	err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(input.Password))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid credentials"})
		return
	}

	// Update last login time
	now := time.Now()
	_, err = database.GetDB().Exec("UPDATE users SET last_login_at = $1 WHERE id = $2", now, user.ID)
	if err != nil {
		logger.Printf("Error updating last login time: %v", err)
		// Non-critical error, continue
	}

	// Generate token
	tokenString, err := generateToken(user.ID)
	if err != nil {
		logger.Printf("Error generating token: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate token"})
		return
	}

	// Return user info (excluding password) and token
	user.PasswordHash = ""
	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
		"user":  user,
	})
}

// JWTMiddleware returns a middleware that checks JWT tokens
func JWTMiddleware(database *db.Database, logger *log.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		// If we're using a mock database in development, return a mock user ID
		if database.IsMockDB() {
			logger.Println("Using mock authentication")
			c.Set("userID", "00000000-0000-0000-0000-000000000000") // Mock user ID
			c.Next()
			return
		}
		
		// Get token from header
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header is required"})
			c.Abort()
			return
		}

		// Extract the token
		tokenString := ""
		parts := strings.Split(authHeader, " ")
		if len(parts) == 2 && parts[0] == "Bearer" {
			tokenString = parts[1]
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization format"})
			c.Abort()
			return
		}

		// Parse and validate token
		claims := &Claims{}
		token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(getJWTSecret()), nil
		})

		if err != nil {
			logger.Printf("Error parsing token: %v", err)
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			c.Abort()
			return
		}

		if !token.Valid {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
			c.Abort()
			return
		}

		// Set user ID in context
		c.Set("userID", claims.UserID)
		c.Next()
	}
}

// GetUser returns the user from the database based on token
func GetUser(c *gin.Context, database *db.Database, logger *log.Logger) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	// If using mock database in development, return a mock user
	if database.IsMockDB() {
		now := time.Now()
		mockUser := models.User{
			ID:            userID.(string),
			Username:      "testuser",
			Email:         "test@example.com",
			Points:        100,
			Level:         2,
			Streak:        3,
			LastStreakDay: now.AddDate(0, 0, -1),
			CreatedAt:     now.AddDate(0, -1, 0),
			LastLoginAt:   now,
		}
		c.JSON(http.StatusOK, mockUser)
		return
	}

	var user models.User
	err := database.GetDB().QueryRow(
		`SELECT id, username, email, points, level, streak, last_streak_day, created_at, last_login_at 
         FROM users WHERE id = $1`,
		userID,
	).Scan(
		&user.ID, &user.Username, &user.Email, &user.Points, &user.Level,
		&user.Streak, &user.LastStreakDay, &user.CreatedAt, &user.LastLoginAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}
		logger.Printf("Error finding user: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// Helper functions

// generateToken creates a new JWT token
func generateToken(userID string) (string, error) {
	// Set expiration time
	expirationTime := time.Now().Add(24 * time.Hour) // Token valid for 24 hours

	// Create claims
	claims := &Claims{
		UserID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "gogog",
		},
	}

	// Create token with claims
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// Sign the token
	tokenString, err := token.SignedString([]byte(getJWTSecret()))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// getJWTSecret gets the JWT secret from environment or uses a default (in dev only)
func getJWTSecret() string {
	secret := os.Getenv("JWT_SECRET")
	if secret == "" {
		// Default secret for development only
		return "e79cae05-bd99-4e2d-8e30-5c757db3a703"
	}
	return secret
}

// ChangePassword changes a user's password
func ChangePassword(c *gin.Context, database *db.Database, logger *log.Logger) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var input struct {
		CurrentPassword string `json:"currentPassword" binding:"required"`
		NewPassword     string `json:"newPassword" binding:"required,min=8"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Get current password hash
	var currentHash string
	err := database.GetDB().QueryRow("SELECT password_hash FROM users WHERE id = $1", userID).Scan(&currentHash)
	if err != nil {
		logger.Printf("Error getting current password hash: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
		return
	}

	// Verify current password
	err = bcrypt.CompareHashAndPassword([]byte(currentHash), []byte(input.CurrentPassword))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Current password is incorrect"})
		return
	}

	// Hash new password
	newHash, err := bcrypt.GenerateFromPassword([]byte(input.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		logger.Printf("Error hashing new password: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	// Update password
	_, err = database.GetDB().Exec("UPDATE users SET password_hash = $1 WHERE id = $2", string(newHash), userID)
	if err != nil {
		logger.Printf("Error updating password: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Password updated successfully"})
}

// UpdateProfile updates a user's profile
func UpdateProfile(c *gin.Context, database *db.Database, logger *log.Logger) {
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not authenticated"})
		return
	}

	var input struct {
		Username string `json:"username" binding:"required,min=3,max=50"`
		Email    string `json:"email" binding:"required,email"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Check if username already exists (for a different user)
	var existingUsername string
	err := database.GetDB().QueryRow("SELECT username FROM users WHERE username = $1 AND id != $2", input.Username, userID).Scan(&existingUsername)
	if err != sql.ErrNoRows {
		if err == nil {
			c.JSON(http.StatusConflict, gin.H{"error": "Username already exists"})
			return
		}
		if err != sql.ErrNoRows {
			logger.Printf("Error checking username: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			return
		}
	}

	// Check if email already exists (for a different user)
	var existingEmail string
	err = database.GetDB().QueryRow("SELECT email FROM users WHERE email = $1 AND id != $2", input.Email, userID).Scan(&existingEmail)
	if err != sql.ErrNoRows {
		if err == nil {
			c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
			return
		}
		if err != sql.ErrNoRows {
			logger.Printf("Error checking email: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Database error"})
			return
		}
	}

	// Update profile
	_, err = database.GetDB().Exec("UPDATE users SET username = $1, email = $2 WHERE id = $3", input.Username, input.Email, userID)
	if err != nil {
		logger.Printf("Error updating profile: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update profile"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Profile updated successfully"})
}

// GetUserByID finds a user by ID
func GetUserByID(database *db.Database, userID string) (*models.User, error) {
	var user models.User
	err := database.GetDB().QueryRow(
		`SELECT id, username, email, points, level, streak, last_streak_day, created_at, last_login_at 
         FROM users WHERE id = $1`,
		userID,
	).Scan(
		&user.ID, &user.Username, &user.Email, &user.Points, &user.Level,
		&user.Streak, &user.LastStreakDay, &user.CreatedAt, &user.LastLoginAt,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, errors.New("user not found")
		}
		return nil, err
	}

	return &user, nil
}