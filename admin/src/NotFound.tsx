import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="text-center p-8 bg-gray-900 bg-opacity-70 shadow-2xl rounded-lg max-w-md">
        <h1 className="text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-lg text-gray-400 mb-6">
          Sorry, the page you're looking for doesn’t exist. It may have been moved or deleted.
        </p>
        <Link to="/">
          <button className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-500 hover:shadow-xl transition-all duration-300">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
