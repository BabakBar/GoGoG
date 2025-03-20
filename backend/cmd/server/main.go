package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gogog/internal/api"
	"gogog/internal/auth"
	"gogog/internal/db"
)

func main() {
	// Initialize logger
	logger := log.New(os.Stdout, "[GoGoG] ", log.LstdFlags|log.Lshortfile)
	logger.Println("Starting GoGoG server...")

	// Initialize database connection
	var database *db.Database
	var err error
	
	// Check if database connection should be skipped for development
	if os.Getenv("SKIP_DB") == "true" {
		logger.Println("Skipping database connection in development mode")
		database = &db.Database{} // Empty database for development
	} else {
		database, err = db.NewDatabase()
		if err != nil {
			logger.Fatalf("Failed to connect to database: %v", err)
		}
		logger.Println("Connected to database successfully")
	}

	// Initialize router with appropriate mode
	if os.Getenv("ENV") == "production" {
		gin.SetMode(gin.ReleaseMode)
	}
	router := gin.Default()

	// Setup CORS
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000", "http://localhost:8080"},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * 60 * 60,
	}))

	// Setup API routes
	api.RegisterRoutes(router, database, logger)

	// Setup auth middleware for protected routes
	authMiddleware := auth.JWTMiddleware(database, logger)
	authGroup := router.Group("/api")
	authGroup.Use(authMiddleware)
	api.RegisterProtectedRoutes(authGroup, database, logger)

	// Start server in a goroutine
	go func() {
		port := os.Getenv("PORT")
		if port == "" {
			port = "8080"
		}
		if err := router.Run(":" + port); err != nil {
			logger.Fatalf("Failed to start server: %v", err)
		}
	}()

	// Handle graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	logger.Println("Shutting down server...")

	// Close database connection
	if err := database.Close(); err != nil {
		logger.Printf("Error closing database connection: %v", err)
	}

	logger.Println("Server stopped")
}