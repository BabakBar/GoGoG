package gamification

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gogog/internal/db"
)

// GetLeaderboard returns the current leaderboard
func GetLeaderboard(c *gin.Context, database *db.Database, logger *log.Logger) {
	c.JSON(http.StatusOK, gin.H{
		"leaderboard": []map[string]interface{}{
			{"rank": 1, "username": "user1", "points": 100},
			{"rank": 2, "username": "user2", "points": 75},
			{"rank": 3, "username": "user3", "points": 50},
		},
	})
}

// GetUserAchievements returns achievements for the current user
func GetUserAchievements(c *gin.Context, database *db.Database, logger *log.Logger) {
	c.JSON(http.StatusOK, gin.H{
		"achievements": []map[string]interface{}{
			{
				"id":          "first-steps",
				"title":       "First Steps",
				"description": "Complete your first Go challenge",
				"unlocked":    true,
				"unlocked_at": "2025-03-01T12:00:00Z",
			},
			{
				"id":          "syntax-master",
				"title":       "Syntax Master",
				"description": "Complete all challenges in the Go Basics module",
				"unlocked":    false,
			},
		},
	})
}

// GetUserStats returns stats for the current user
func GetUserStats(c *gin.Context, database *db.Database, logger *log.Logger) {
	c.JSON(http.StatusOK, gin.H{
		"points":      75,
		"level":       2,
		"streak":      3,
		"challenges":  5,
		"achievements": 2,
	})
}