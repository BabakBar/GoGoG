import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            GoGoG
          </Link>
          <a 
            href="https://github.com/yourusername/gogog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900"
          >
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;