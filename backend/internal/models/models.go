package models

import (
	"time"
)

// User represents a user account
type User struct {
	ID            string    `json:"id"`
	Username      string    `json:"username"`
	Email         string    `json:"email"`
	PasswordHash  string    `json:"-"`
	Points        int       `json:"points"`
	Level         int       `json:"level"`
	Streak        int       `json:"streak"`
	LastStreakDay time.Time `json:"lastStreakDay"`
	CreatedAt     time.Time `json:"createdAt"`
	LastLoginAt   time.Time `json:"lastLoginAt"`
}

// Module represents a learning module
type Module struct {
	ID            string      `json:"id"`
	Title         string      `json:"title"`
	Description   string      `json:"description"`
	Objectives    []string    `json:"objectives"`
	Prerequisites []string    `json:"prerequisites"`
	Order         int         `json:"order"`
	Visualization string      `json:"visualization"`
	Challenges    []*Challenge `json:"challenges,omitempty"`
}

// Challenge represents a single challenge within a module
type Challenge struct {
	ID                  string    `json:"id"`
	ModuleID            string    `json:"moduleId"`
	Title               string    `json:"title"`
	Description         string    `json:"description"`
	Instructions        string    `json:"instructions"`
	StarterCode         string    `json:"starterCode"`
	TestCases           []TestCase `json:"testCases"`
	VisualizationParams map[string]interface{} `json:"visualizationParams"`
	Difficulty          string    `json:"difficulty"`
	Points              int       `json:"points"`
	Order               int       `json:"order"`
}

// TestCase represents a test case for a challenge
type TestCase struct {
	Input          string `json:"input"`
	ExpectedOutput string `json:"expectedOutput"`
}

// UserProgress tracks a user's progress through modules
type UserProgress struct {
	ID         string    `json:"id"`
	UserID     string    `json:"userId"`
	ModuleID   string    `json:"moduleId"`
	Progress   float64   `json:"progress"`
	CompletedAt *time.Time `json:"completedAt,omitempty"`
}

// UserChallenge tracks a user's attempts and completions of challenges
type UserChallenge struct {
	ID          string    `json:"id"`
	UserID      string    `json:"userId"`
	ChallengeID string    `json:"challengeId"`
	Completed   bool      `json:"completed"`
	CompletedAt *time.Time `json:"completedAt,omitempty"`
	Attempts    int       `json:"attempts"`
	Solution    string    `json:"solution,omitempty"`
}

// Achievement represents an accomplishment that users can unlock
type Achievement struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	IconPath    string `json:"iconPath"`
	Type        string `json:"type"`
	Condition   string `json:"condition,omitempty"`
	Points      int    `json:"points"`
}

// UserAchievement tracks which achievements a user has unlocked
type UserAchievement struct {
	ID            string    `json:"id"`
	UserID        string    `json:"userId"`
	AchievementID string    `json:"achievementId"`
	UnlockedAt    time.Time `json:"unlockedAt"`
}

// PointsHistory tracks point transactions for users
type PointsHistory struct {
	ID          string    `json:"id"`
	UserID      string    `json:"userId"`
	Amount      int       `json:"amount"`
	Reason      string    `json:"reason"`
	ChallengeID *string   `json:"challengeId,omitempty"`
	CreatedAt   time.Time `json:"createdAt"`
}

// LeaderboardEntry represents a user's position on the leaderboard
type LeaderboardEntry struct {
	UserID    string `json:"userId"`
	Username  string `json:"username"`
	Points    int    `json:"points"`
	Level     int    `json:"level"`
	Rank      int    `json:"rank"`
	Timeframe string `json:"timeframe"`
}