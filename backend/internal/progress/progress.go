package progress

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gogog/internal/db"
)

// GetUserProgress returns overall progress for the current user
func GetUserProgress(c *gin.Context, database *db.Database, logger *log.Logger) {
	c.JSON(http.StatusOK, gin.H{
		"modules": []map[string]interface{}{
			{
				"id":       "basic-syntax",
				"title":    "Go Basics",
				"progress": 100,
				"completed": true,
			},
			{
				"id":       "functions-packages",
				"title":    "Functions and Packages",
				"progress": 50,
				"completed": false,
			},
			{
				"id":       "data-structures",
				"title":    "Data Structures",
				"progress": 0,
				"completed": false,
			},
		},
	})
}

// GetModuleProgress returns progress for a specific module
func GetModuleProgress(c *gin.Context, database *db.Database, logger *log.Logger) {
	moduleID := c.Param("id")

	c.JSON(http.StatusOK, gin.H{
		"id":       moduleID,
		"progress": 75,
		"challenges": []map[string]interface{}{
			{
				"id":        "challenge1",
				"title":     "Sample Challenge 1",
				"completed": true,
			},
			{
				"id":        "challenge2",
				"title":     "Sample Challenge 2",
				"completed": true,
			},
			{
				"id":        "challenge3",
				"title":     "Sample Challenge 3",
				"completed": false,
			},
		},
	})
}

// CompleteChallenge marks a challenge as completed
func CompleteChallenge(c *gin.Context, database *db.Database, logger *log.Logger) {
	challengeID := c.Param("id")

	c.JSON(http.StatusOK, gin.H{
		"id":        challengeID,
		"completed": true,
		"points":    10,
		"message":   "Challenge completed successfully!",
	})
}