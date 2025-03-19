package api

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gogog/internal/auth"
	"gogog/internal/content"
	"gogog/internal/db"
	"gogog/internal/gamification"
	"gogog/internal/progress"
)

// RegisterRoutes registers all public API routes
func RegisterRoutes(router *gin.Engine, database *db.Database, logger *log.Logger) {
	// API group
	api := router.Group("/api")

	// Health check
	api.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "ok",
		})
	})

	// Auth routes
	authRoutes := api.Group("/auth")
	{
		authRoutes.POST("/register", func(c *gin.Context) {
			auth.RegisterUser(c, database, logger)
		})
		authRoutes.POST("/login", func(c *gin.Context) {
			auth.LoginUser(c, database, logger)
		})
	}

	// Content routes (public)
	contentRoutes := api.Group("/content")
	{
		contentRoutes.GET("/modules", func(c *gin.Context) {
			content.GetModules(c, database, logger)
		})
		contentRoutes.GET("/modules/:id", func(c *gin.Context) {
			content.GetModuleByID(c, database, logger)
		})
		contentRoutes.GET("/challenges/:id", func(c *gin.Context) {
			content.GetChallengeByID(c, database, logger)
		})
	}

	// Leaderboard routes (public)
	api.GET("/leaderboard", func(c *gin.Context) {
		gamification.GetLeaderboard(c, database, logger)
	})
}

// RegisterProtectedRoutes registers all routes that require authentication
func RegisterProtectedRoutes(router *gin.RouterGroup, database *db.Database, logger *log.Logger) {
	// Auth profile routes
	authRoutes := router.Group("/auth")
	{
		authRoutes.GET("/profile", func(c *gin.Context) {
			auth.GetUser(c, database, logger)
		})
		authRoutes.PUT("/profile", func(c *gin.Context) {
			auth.UpdateProfile(c, database, logger)
		})
		authRoutes.PUT("/password", func(c *gin.Context) {
			auth.ChangePassword(c, database, logger)
		})
	}

	// User progress routes
	progressRoutes := router.Group("/progress")
	{
		progressRoutes.GET("", func(c *gin.Context) {
			progress.GetUserProgress(c, database, logger)
		})
		progressRoutes.GET("/modules/:id", func(c *gin.Context) {
			progress.GetModuleProgress(c, database, logger)
		})
		progressRoutes.POST("/challenges/:id/complete", func(c *gin.Context) {
			progress.CompleteChallenge(c, database, logger)
		})
	}

	// User achievements routes
	achievementsRoutes := router.Group("/achievements")
	{
		achievementsRoutes.GET("", func(c *gin.Context) {
			gamification.GetUserAchievements(c, database, logger)
		})
	}

	// User stats routes
	router.GET("/stats", func(c *gin.Context) {
		gamification.GetUserStats(c, database, logger)
	})

	// Code execution route
	router.POST("/execute", func(c *gin.Context) {
		content.ExecuteCode(c, database, logger)
	})
}