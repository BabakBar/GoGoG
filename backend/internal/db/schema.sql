-- Database schema for GoGoG

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    points INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    streak INTEGER NOT NULL DEFAULT 0,
    last_streak_day TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    last_login_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Modules table
CREATE TABLE IF NOT EXISTS modules (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    objectives JSONB NOT NULL,
    prerequisites JSONB NOT NULL,
    "order" INTEGER NOT NULL,
    visualization VARCHAR(100) NOT NULL
);

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
    id VARCHAR(50) PRIMARY KEY,
    module_id VARCHAR(50) NOT NULL REFERENCES modules(id),
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL,
    starter_code TEXT NOT NULL,
    test_cases JSONB NOT NULL,
    visualization_params JSONB NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    points INTEGER NOT NULL,
    "order" INTEGER NOT NULL
);

-- User progress table
CREATE TABLE IF NOT EXISTS user_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    module_id VARCHAR(50) NOT NULL REFERENCES modules(id),
    progress FLOAT NOT NULL DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(user_id, module_id)
);

-- User challenges table
CREATE TABLE IF NOT EXISTS user_challenges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    challenge_id VARCHAR(50) NOT NULL REFERENCES challenges(id),
    completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    attempts INTEGER NOT NULL DEFAULT 0,
    solution TEXT,
    UNIQUE(user_id, challenge_id)
);

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    icon_path VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    condition TEXT,
    points INTEGER NOT NULL
);

-- User achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    achievement_id VARCHAR(50) NOT NULL REFERENCES achievements(id),
    unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL,
    UNIQUE(user_id, achievement_id)
);

-- Points history table
CREATE TABLE IF NOT EXISTS points_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    amount INTEGER NOT NULL,
    reason VARCHAR(100) NOT NULL,
    challenge_id VARCHAR(50) REFERENCES challenges(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Leaderboard materialized view
CREATE MATERIALIZED VIEW IF NOT EXISTS leaderboard AS
    SELECT
        id AS user_id,
        username,
        points,
        level,
        ROW_NUMBER() OVER (ORDER BY points DESC) AS rank
    FROM
        users
    ORDER BY
        points DESC;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_challenges_user_id ON user_challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_points_history_user_id ON points_history(user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_module_id ON challenges(module_id);

-- Initial data for development

-- Insert sample modules
INSERT INTO modules (id, title, description, objectives, prerequisites, "order", visualization)
VALUES
    (
        'basic-syntax',
        'Go Basics',
        'Learn the fundamental syntax and concepts of Go',
        '["Write and run your first Go program", "Understand variables and basic types", "Use basic control structures"]',
        '[]',
        1,
        'basic-syntax-vis'
    ),
    (
        'functions-packages',
        'Functions and Packages',
        'Master function declarations, parameters, return values, and package organization',
        '["Declare and call functions", "Work with parameters and return values", "Create and use packages"]',
        '["basic-syntax"]',
        2,
        'functions-vis'
    ),
    (
        'data-structures',
        'Data Structures',
        'Learn about arrays, slices, maps, and structs in Go',
        '["Create and manipulate arrays and slices", "Use maps for key-value data", "Define and use structs"]',
        '["basic-syntax", "functions-packages"]',
        3,
        'data-structures-vis'
    )
ON CONFLICT (id) DO NOTHING;

-- Insert sample challenges
INSERT INTO challenges (id, module_id, title, description, instructions, starter_code, test_cases, visualization_params, difficulty, points, "order")
VALUES
    (
        'hello-world',
        'basic-syntax',
        'Hello, Gopher!',
        'Write your first Go program that prints a greeting.',
        'Create a program that prints "Hello, Gopher!" to the console.',
        'package main

import "fmt"

func main() {
    // Your code here
}',
        '[{"input": "", "expectedOutput": "Hello, Gopher!"}]',
        '{"type": "console-output", "highlightLines": [5]}',
        'beginner',
        10,
        1
    ),
    (
        'variables',
        'basic-syntax',
        'Variables and Types',
        'Learn about variables and basic types in Go.',
        'Create variables of different types and print their values.',
        'package main

import "fmt"

func main() {
    // Declare an integer variable named "age" with value 25
    
    // Declare a string variable named "name" with value "Gopher"
    
    // Declare a boolean variable named "isLearning" with value true
    
    // Print all variables
}',
        '[{"input": "", "expectedOutput": "Age: 25\\nName: Gopher\\nLearning Go: true"}]',
        '{"type": "variables", "highlightLines": [6, 8, 10]}',
        'beginner',
        15,
        2
    ),
    (
        'control-flow',
        'basic-syntax',
        'Control Flow',
        'Understand if statements and loops in Go.',
        'Write a program that prints numbers from 1 to 10, but for multiples of 3, print "Fizz" instead of the number.',
        'package main

import "fmt"

func main() {
    // Write a loop that goes from 1 to 10
    // For multiples of 3, print "Fizz" instead of the number
}',
        '[{"input": "", "expectedOutput": "1\\n2\\nFizz\\n4\\n5\\nFizz\\n7\\n8\\nFizz\\n10"}]',
        '{"type": "control-flow", "highlightLines": [6, 7]}',
        'beginner',
        20,
        3
    )
ON CONFLICT (id) DO NOTHING;

-- Insert sample achievements
INSERT INTO achievements (id, title, description, icon_path, type, condition, points)
VALUES
    (
        'first-steps',
        'First Steps',
        'Complete your first Go challenge',
        '/icons/achievements/first-steps.svg',
        'milestone',
        NULL,
        5
    ),
    (
        'syntax-master',
        'Syntax Master',
        'Complete all challenges in the Go Basics module',
        '/icons/achievements/syntax-master.svg',
        'module',
        NULL,
        20
    ),
    (
        'streak-3',
        'Consistent Coder',
        'Maintain a learning streak for 3 days',
        '/icons/achievements/streak.svg',
        'streak',
        NULL,
        10
    )
ON CONFLICT (id) DO NOTHING;