import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/tmdbApi';
import MovieList from '../components/MovieList.jsx';


const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const debouncedQuery = useDebounce(query, 500);

  const handleInputChange = (e) => {
    const newQuery = e.target.value.trim();
    setSearchParams(newQuery ? { query: newQuery } : {}); // оновлюємо параметри URL
  };

  useEffect(() => {
    if (!debouncedQuery) {
      setMovies([]);
      setNoResults(false);
      return;
    }

    setLoading(true);
    setNoResults(false);

    searchMovies(debouncedQuery)
      .then(results => {
        if (!Array.isArray(results) || results.length === 0) {
          setNoResults(true);
          setMovies([]);
        } else {
          setMovies(results);
        }
      })
      .catch(err => {
        console.error('Error:', err);
        setNoResults(true);
        setMovies([]);
      })
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies"
        value={query}
        onChange={handleInputChange}
        aria-label="Search for movies"
      />
      {loading && <p>Loading...</p>}
      {noResults && <p>No movies found for "{query}". Try again with a different keyword.</p>}
      <MovieList movies={movies} />
    </div>
  );
}


export default MoviesPage;
