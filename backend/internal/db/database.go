package db

import (
	"database/sql"
	"errors"
	"fmt"
	"os"
	"time"

	_ "github.com/lib/pq"
)

// Database represents the database connection and operations
type Database struct {
	db *sql.DB
}

// NewDatabase creates a new database connection
func NewDatabase() (*Database, error) {
	// Get database connection details from environment variables
	host := getEnv("DB_HOST", "localhost")
	port := getEnv("DB_PORT", "5432")
	user := getEnv("DB_USER", "postgres")
	password := getEnv("DB_PASSWORD", "postgres")
	dbname := getEnv("DB_NAME", "gogog")
	sslmode := getEnv("DB_SSLMODE", "disable")

	// Create connection string
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		host, port, user, password, dbname, sslmode,
	)

	// Connect to database
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	// Set connection pool settings
	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(5)
	db.SetConnMaxLifetime(5 * time.Minute)

	// Verify connection
	if err := db.Ping(); err != nil {
		return nil, err
	}

	return &Database{db: db}, nil
}

// Close closes the database connection
func (d *Database) Close() error {
	if d.db == nil {
		return errors.New("database connection is nil")
	}
	return d.db.Close()
}

// GetDB returns the underlying database connection
func (d *Database) GetDB() *sql.DB {
	return d.db
}

// Helper function to get environment variable with fallback
func getEnv(key, fallback string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return fallback
}