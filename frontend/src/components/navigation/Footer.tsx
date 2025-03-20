const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} GoGoG. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;