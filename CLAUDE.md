# GoGoG Project Notes

Date: March 20, 2025

## Project Progress

The GoGoG (Go, Go, Go!) project has been initiated with the goal of creating an interactive, web-based platform for learning the Go programming language through gamification and 3D visualizations. Current progress includes:

- Basic project structure for both frontend and backend
- Frontend UI components setup with React and TailwindCSS
- Three.js visualization engine integration
- Code editor with Go syntax highlighting
- Backend API structure with Gin framework
- Database schema design
- Authentication system with JWT

## Development Process

### Frontend Development

```bash
# Start the frontend development server
cd frontend
npm run dev
```

### Backend Development

```bash
# Run the backend server with database connection
cd backend
go run cmd/server/main.go

# Run the backend server in development mode without database connection
cd backend
SKIP_DB=true JWT_SECRET=development_secret go run cmd/server/main.go
```

### Database Setup

```bash
# Create a PostgreSQL database
psql -c "CREATE DATABASE gogog;"

# Apply the database schema
psql -d gogog -f backend/internal/db/schema.sql
```

### Running the Application

To run the full application:

1. Start the backend server in development mode:
```bash
cd backend
SKIP_DB=true JWT_SECRET=development_secret go run cmd/server/main.go
```

2. In a separate terminal, start the frontend:
```bash
cd frontend
npm run dev
```

3. Open your browser to http://localhost:3000 to see the application

### Troubleshooting 

#### TailwindCSS v4 Configuration

TailwindCSS v4 requires specific configuration:

1. Install the required packages:
```bash
npm install @tailwindcss/postcss @tailwindcss/typography --save-dev
```

2. Update postcss.config.js:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  }
}
```

3. Update the CSS file to use the new import syntax:
```css
@import "tailwindcss";
/* Your custom CSS here */
```

Note: If you encounter issues with utility classes like `@apply`, this is because TailwindCSS v4 has changed how these directives work. Consider using regular CSS with utility classes or check the latest documentation.

#### Development Principles

1. **Never Downgrade Dependencies**: Always strive to use the latest versions and find solutions for issues rather than downgrading.

2. **Use Search When Facing Issues**: When encountering problems with newer technologies, use search (Brave, Google) to find solutions by searching for specific error messages and version-specific information.

3. **Document Solutions**: When solving complex issues, document the solution in CLAUDE.md for future reference.

4. **Testing Every Step**: Always verify changes with frequent testing to catch and fix issues early.

## Next Steps

1. **WebAssembly Integration**
   - Implement the Go WebAssembly execution environment
   - Create the communication layer between frontend and WebAssembly
   - Secure the code execution sandbox

2. **3D Visualizations**
   - Develop visualizations for Go data structures (arrays, slices, maps)
   - Create animations for concurrency concepts (goroutines, channels)
   - Build interactive visualization controls

3. **Content Management System**
   - Complete the backend content APIs
   - Create a module/challenge management interface
   - Implement content versioning

4. **User Progression System**
   - Complete the user progress tracking
   - Implement the achievement and reward system
   - Create the leaderboard functionality

5. **Game Narrative Integration**
   - Implement the "Go Treasure Islands" storyline
   - Design island visualizations for each learning module
   - Create character animations and interactions

## Testing

### Frontend Testing

```bash
# Run frontend tests
cd frontend
npm run test
```

Frontend tests should cover:
- Component rendering
- State management
- Visualization engine functionality
- Code editor and execution
- User interactions

### Backend Testing

```bash
# Run backend tests
cd backend
go test ./...
```

Backend tests should cover:
- API endpoint functionality
- Authentication and authorization
- Database operations
- Content management
- User progression tracking

### End-to-End Testing

Future implementation will include Cypress for end-to-end testing of user flows.

## Performance Considerations

- Monitor and optimize Three.js rendering performance
- Ensure efficient memory management for WebAssembly execution
- Implement proper caching strategies for content delivery
- Consider progressive loading for larger visualizations

## Security Notes

- Implement proper input validation and sanitization
- Secure the WebAssembly execution environment
- Protect against common web vulnerabilities (XSS, CSRF)
- Regularly update dependencies for security patches