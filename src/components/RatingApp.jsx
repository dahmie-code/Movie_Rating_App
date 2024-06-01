import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { ref, get, push, set } from 'firebase/database';
import { FaSun, FaMoon } from 'react-icons/fa';
import MovieList from './MovieList';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import LoadingSpinner from './LoadingSpinner';

function RatingApp() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);


  useEffect(() => {
    async function loadMovies() {
      const moviesRef = ref(db, 'movies');
      const ratingsRef = ref(db, 'ratings');
      try {
        const [moviesSnapshot, ratingsSnapshot] = await Promise.all([get(moviesRef), get(ratingsRef)]);
        if (moviesSnapshot.exists()) {
          const moviesData = Object.entries(moviesSnapshot.val()).map(([key, value]) => ({
            id: key,
            ...value,
          }));

          const ratingsData = ratingsSnapshot.exists() ? ratingsSnapshot.val() : {};

          const allMovies = moviesData.map(movie => {
            const movieRatings = ratingsData[movie.title] ? Object.entries(ratingsData[movie.title]).filter(([key])=> key!=='averageRating').map(([, value])=> value) : [];
            const averageRating = movieRatings.length > 0 ? calculateAverageRating(movieRatings) : 0;
            const numRatings = movieRatings.length;
            return { ...movie, averageRating, numRatings, ratings:ratingsData[movie.title] };
          });
          const unratedMovies = moviesData.filter(movie => !Object.keys(ratingsData).includes(movie.title));
          const allMoviesWithUnrated = [...allMovies, ...unratedMovies];
  
          setMovies(allMoviesWithUnrated);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMovies();
  }, []);

  const calculateAverageRating = (ratings) => {
    if (ratings.length === 0) return 0;
    const totalRating = ratings.reduce((acc, rating) => acc + rating, 0);
    return totalRating / ratings.length;
  };

  const onRatingClick = async (movieTitle, rating) => {
    const ratingsRef = ref(db, `ratings/${movieTitle}`);
    try {
      const newRatingRef = push(ratingsRef);
      await set(newRatingRef, parseInt(rating));

      const ratingsSnapshot = await get(ratingsRef);
      if (ratingsSnapshot.exists()) {
        const ratings = Object.values(ratingsSnapshot.val());
        const averageRating = calculateAverageRating(ratings);

        const averageRatingRef = ref(db, `ratings/${movieTitle}/averageRating`);
        await set(averageRatingRef, averageRating);

        // Update the movie's average rating in the state
        setMovies(prevMovies =>
          prevMovies.map(movie =>
            movie.title === movieTitle ? { ...movie, numRatings: ratings.length, averageRating,  } : movie
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const handleSortChange = (option) => {
    setSort(option);
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }
  
  const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))

  const sortedMovies = filteredMovies.sort((a, b) => {
    if (sort === 'lowest') {
      return a.averageRating - b.averageRating;
    } else if (sort === 'highest') {
      return b.averageRating - a.averageRating;
    } else if (sort === 'noRatings') {
      if (a.numRatings === 0 && b.numRatings > 0) {
        return -1;
      } else if (a.numRatings > 0 && b.numRatings === 0) {
        return 1;
      } else {
        return 0;
      }
    }
    return 0;
  });

  return (
    <div className={`min-h-screen h-full p-4 md:p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className={`text-2xl md:text-4xl mb-4 md:mb-8 text-center font-bold text-blue-600 ${darkMode ? 'text-white': ''}`}>Movie Rating App</h1>
      <div className="flex justify-end mb-4">
        <button onClick={toggleDarkMode} className="text-2xl p-2 rounded-full focus:outline-none transition-colors duration-300">
          {darkMode ? <FaSun className="text-white-500" /> : <FaMoon className="text-gray-800" />}
        </button>
      </div>
      <div className="flex flex-col justify-between md:flex-row mb-4 md:mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearch} />
        <SortDropdown sortOption={sort} onSortChange={handleSortChange} />
      </div>
      {isLoading ? <LoadingSpinner /> : <MovieList movies={sortedMovies} onRatingClick={onRatingClick} darkMode={darkMode} />}
    </div>
  );
}

export default RatingApp;
