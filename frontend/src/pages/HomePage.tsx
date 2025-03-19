import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Learn Go Programming Through Interactive 3D Games
              </h1>
              <p className="mt-6 text-xl lg:text-2xl">
                GoGoG (Go, Go, Go!) is a free, interactive platform that makes learning the Go programming language fun and intuitive with 3D visualizations and game mechanics.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link to="/modules" className="btn-primary text-center text-lg py-3 px-6">
                  Start Learning
                </Link>
                <a 
                  href="https://github.com/yourusername/gogog" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary text-center text-lg py-3 px-6"
                >
                  View on GitHub
                </a>
              </div>
            </div>
            <div className="mt-16 lg:mt-0 lg:col-span-6">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Placeholder for a 3D visualization or screenshot */}
                <div className="h-96 bg-gray-300 flex items-center justify-center">
                  <span className="text-xl text-gray-500">3D Visualization Demo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Key Features
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              What makes GoGoG different from other learning platforms
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="card">
              <div className="text-primary-600 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Interactive 3D Visualizations</h3>
              <p className="mt-4 text-gray-600">
                See Go concepts come to life with interactive 3D models that make abstract programming ideas tangible and engaging.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card">
              <div className="text-primary-600 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Gamified Learning Path</h3>
              <p className="mt-4 text-gray-600">
                Earn points, unlock achievements, and level up as you progress through challenges and master Go programming concepts.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card">
              <div className="text-primary-600 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">In-Browser Code Execution</h3>
              <p className="mt-4 text-gray-600">
                Write and run Go code directly in your browser with immediate feedback and visualizations of your code's behavior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Your Learning Journey
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Follow a structured path from Go basics to advanced concepts
            </p>
          </div>

          <div className="mt-12 relative">
            {/* Learning path steps */}
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
              {/* Module 1 */}
              <div className="mt-10 lg:mt-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  1
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-gray-900">Go Basics</h3>
                  <p className="mt-2 text-gray-600">
                    Learn syntax, variables, control structures, and the fundamentals of Go programming.
                  </p>
                </div>
              </div>

              {/* Module 2 */}
              <div className="mt-10 lg:mt-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  2
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-gray-900">Functions and Packages</h3>
                  <p className="mt-2 text-gray-600">
                    Master function declarations, parameters, return values, and package organization.
                  </p>
                </div>
              </div>

              {/* Module 3 */}
              <div className="mt-10 lg:mt-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-600 text-white">
                  3
                </div>
                <div className="mt-5">
                  <h3 className="text-xl font-bold text-gray-900">Concurrency</h3>
                  <p className="mt-2 text-gray-600">
                    Explore goroutines, channels, and Go's powerful concurrency model.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-center">
              <Link to="/modules" className="btn-primary">
                View All Modules
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to Start Your Go Journey?
          </h2>
          <p className="mt-4 text-xl">
            Join thousands of developers learning Go through interactive visualizations and games.
          </p>
          <div className="mt-8">
            <Link to="/modules" className="btn-primary bg-white text-primary-700 hover:bg-gray-100 hover:text-primary-800 text-lg py-3 px-8">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;