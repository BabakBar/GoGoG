package content

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"gogog/internal/db"
)

// GetModules returns all available modules
func GetModules(c *gin.Context, database *db.Database, logger *log.Logger) {
	c.JSON(http.StatusOK, gin.H{
		"modules": []string{"Sample Module 1", "Sample Module 2"}, // Placeholder data
	})
}

// GetModuleByID returns a specific module by ID
func GetModuleByID(c *gin.Context, database *db.Database, logger *log.Logger) {
	moduleID := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"id":    moduleID,
		"title": "Sample Module",
		"description": "This is a sample module description",
	})
}

// GetChallengeByID returns a specific challenge by ID
func GetChallengeByID(c *gin.Context, database *db.Database, logger *log.Logger) {
	challengeID := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"id":    challengeID,
		"title": "Sample Challenge",
		"description": "This is a sample challenge description",
		"starter_code": "package main\n\nfunc main() {\n\t// Your code here\n}",
	})
}

// ExecuteCode executes submitted Go code
func ExecuteCode(c *gin.Context, database *db.Database, logger *log.Logger) {
	c.JSON(http.StatusOK, gin.H{
		"output":  "Sample output",
		"success": true,
	})
}