import Movie from '../components/Movie';

// MovieList component to display a list of movies
function MovieList({ movies, onRatingClick, darkMode}) {
  // Filter out movies with an average rating of 0
  const filteredMovies = movies.filter(movie => movie.averageRating !== undefined);

  return (
    <div id="movieList" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredMovies.map((movie) => {
        const numRatings = movie.ratings ? Object.keys(movie.ratings).length : 0;
        return (
          <Movie
            key={movie.id}
            movie={movie}
            averageRating={movie.averageRating || 0}
            onRatingClick={onRatingClick}
            numRatings={numRatings}
            darkMode={darkMode}
          />
        );
      })}
    </div>
  );
}

export default MovieList;
