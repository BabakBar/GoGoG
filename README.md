# GoGoG

![GoGoG Banner](./assets/gogog-banner.png)

## Creating a Gamified Golang Learning Platform

GoGoG (Go, Go, Go!) is an open-source, web-based platform specifically designed to teach the Go programming language through interactive, gamified methods. This project aims to create an engaging learning experience that combines 3D visualizations with game mechanics to make learning Go intuitive, fun, and effective.

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
- WebAssembly for Go execution
- TailwindCSS

### Backend
- Go (Golang)
- Gin web framework
- PostgreSQL
- Redis
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

2. Set up the backend
   ```bash
   cd backend
   go mod tidy
   cp .env.example .env
   # Edit .env with your database settings
   go run cmd/server/main.go
   ```

3. Set up the frontend
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open your browser at `http://localhost:3000`

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

## 👥 How to Contribute

We welcome contributions from developers of all skill levels! See our [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed instructions on how to contribute.

Areas where you can help:
- Create new learning modules and challenges
- Develop 3D visualizations for Go concepts
- Improve the code execution environment
- Enhance UI/UX design
- Fix bugs and improve performance
- Write documentation and tutorials

## 📋 Project Status

GoGoG is currently in early development. Check our [roadmap](./docs/ROADMAP.md) for planned features and milestones.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- The Go community for their fantastic language and tools
- All contributors and supporters of the project
- Educational platforms that inspired this approach