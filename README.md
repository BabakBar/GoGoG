# GoGoG: Interactive Go Programming Learning Platform

GoGoG (Go, Go, Go!) is an open-source, web-based platform specifically designed to teach the Go programming language through interactive, gamified methods. This project creates an engaging learning experience by combining 3D visualizations with game mechanics to make learning Go intuitive, fun, and effective.

## 🎯 Project Vision

Traditional programming education often follows a "read and code" approach that can be monotonous and abstract. GoGoG takes a different path by:

- Visualizing Go concepts through interactive 3D models
- Implementing game mechanics to maintain motivation
- Creating a clear learning progression with achievements and rewards
- Providing immediate feedback through in-browser code execution
- Offering a social dimension to learning with leaderboards and sharing

## ✨ Key Features

- **Interactive 3D Visualizations**: See Go concepts come to life with three.js visualizations
- **In-browser Go Execution**: Write and run Go code directly in your browser using WebAssembly
- **Gamified Learning Path**: Progress through levels and earn achievements
- **Responsive Design**: Learn on any device, from desktop to mobile
- **Open-Source Collaboration**: Community-driven content and features

## 🛠️ Technology Stack

### Frontend
- TypeScript
- React
- three.js / React Three Fiber
- Monaco Editor for code editing
- Tailwind CSS for styling
- Zustand for state management

### Backend
- Go (Golang)
- Gin web framework
- PostgreSQL
- JWT authentication

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- Go (v1.16+)
- PostgreSQL
- Git

### Local Development Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/gogog.git
   cd gogog
   ```

2. Set up the database
   ```bash
   # Create a PostgreSQL database named 'gogog'
   psql -c "CREATE DATABASE gogog;"
   
   # Apply the database schema
   psql -d gogog -f backend/internal/db/schema.sql
   ```

3. Set up the backend
   ```bash
   cd backend
   go mod tidy
   cp .env.example .env
   # Edit .env with your database settings
   go run cmd/server/main.go
   ```

4. Set up the frontend
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. Open your browser at `http://localhost:3000`

## 📚 Learning Path

GoGoG structures the learning experience into modules with increasing complexity:

1. **Go Basics**: Syntax, variables, control structures
2. **Functions and Packages**: Modularity and code organization
3. **Data Structures**: Arrays, slices, maps, structs
4. **Concurrency**: Goroutines, channels, select
5. **Error Handling and Testing**: Robust code practices
6. **Web Development**: RESTful APIs, middleware, servers
7. **Advanced Topics**: Reflection, generics, performance

Each module contains interactive challenges, 3D visualizations, and rewards.

## 🏝️ Story-based Learning

The learning journey follows "The Go Treasure Islands" storyline where users embark on a swashbuckling adventure through the Go Archipelago - each island representing a Go programming concept. As a rookie programmer shipwrecked on these strange shores, you'll team up with Captain Gopher to repair your code-powered ship, navigate treacherous waters, and become the legendary Go Pirate King!

## 📋 Project Status

Project implementation is currently in progress. Completed components:

- ✅ Basic project structure for both frontend and backend
- ✅ Frontend UI components setup with React and TailwindCSS
- ✅ three.js visualization engine integration
- ✅ Code editor with Go syntax highlighting
- ✅ Backend API structure with Gin framework
- ✅ Database schema design
- ✅ Authentication system with JWT

Next steps:

- 🔄 Complete content management system in the backend
- 🔄 Implement WebAssembly for Go code execution
- 🔄 Develop user progression and achievement systems
- 🔄 Create advanced 3D visualizations for Go concepts
- 🔄 Build comprehensive testing infrastructure

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

- The Go community for their fantastic language and tools
- three.js and React communities for visualization capabilities