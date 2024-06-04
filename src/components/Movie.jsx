import { React, useState } from 'react';
import { FaStar } from 'react-icons/fa';

// Movie component to display individual movie details and handle ratings
function Movie({ movie, onRatingClick, darkMode }) {
  const [isExpanded, setIsExpanded] = useState(false);

// Handle click on rating stars
  const handleRatingClick = (rating) => {
    onRatingClick(movie.title, rating);
  };

    // Toggle movie description expansion
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

    // Render movie description with "Read more" and "Show less" functionality
  const renderDescription = () => {
    if (isExpanded) {
      return (
        <span>
          {movie.description} <span className="text-blue-500 cursor-pointer" onClick={toggleDescription}>Show less</span>
        </span>
      );
    }
    if (movie.description.length > 100) {
      return (
        <span>
          {movie.description.slice(0, 100)}... <span className="text-blue-500 cursor-pointer" onClick={toggleDescription}>Read more</span>
        </span>
      );
    }
    return movie.description;
  };

  const averageRating = movie.averageRating || 0;

  return (
    <div className={`movie p-4 border rounded-md shadow-lg transition-transform transform hover:scale-105 overflow-hidden ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <img src={movie.imageURL} alt={movie.title} className="w-full h-48 mb-4 rounded object-cover" />
      <div className="p-4">
        <h2 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>{movie.title}</h2>
        <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>({movie.year})</p>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{renderDescription()}</p>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((rating) => (
            <FaStar
              key={rating}
              size={24}
              className="cursor-pointer transition-colors duration-200"
              color={rating <= averageRating ? 'gold' : 'gray'}
              onClick={() => handleRatingClick(rating)}
              title={`${rating} star${rating > 1 ? 's' : ''}`}
            />
          ))}
        </div>
        <p className={`mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'} ${averageRating === 0 ? 'italic' : ''}`}>
          {averageRating === 0 ? 'No Ratings yet' : `Avg. Rating: ${averageRating.toFixed(1)}`}
        </p>
        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{movie.numRatings || 0} ratings</p>
      </div>
    </div>
  );
}

export default Movie;
