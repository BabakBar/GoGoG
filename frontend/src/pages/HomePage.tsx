import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-primary-700 text-white p-4">
      <h1 className="text-5xl font-bold mb-6 text-center">GoGoG</h1>
      <p className="text-xl mb-10 text-center max-w-lg">
        Learn Go programming through interactive 3D visualizations and games
      </p>
      <Link 
        to="/modules/basic-syntax" 
        className="btn-primary text-center text-xl py-4 px-10 rounded-lg hover:shadow-lg transition-all"
      >
        Play Now
      </Link>
    </div>
  );
};

export default HomePage;