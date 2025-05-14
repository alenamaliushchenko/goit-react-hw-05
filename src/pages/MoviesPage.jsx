import { useState, useEffect } from 'react';
import { searchMovies } from '../api/tmdbApi';
import { Link } from 'react-router-dom';

// Хук для debounce
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
  const [query, setQuery] = useState(''); // Для пошуку фільму
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false); // Для перевірки, чи знайдено фільми

  // Використовуємо debounce для уникнення надмірних запитів
  const debouncedQuery = useDebounce(query, 500); // Затримка в 500 мс

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      setNoResults(false); // Скидаємо помилку на початку нового пошуку

      searchMovies(debouncedQuery)
        .then(data => {
          if (data.results.length === 0) {
            setNoResults(true); // Якщо результатів немає, показуємо повідомлення
            setMovies([]);
          } else {
            setMovies(data.results);
          }
        })
        .catch(err => {
          console.error('Error:', err);
          setNoResults(true); // Якщо сталася помилка, показуємо повідомлення
        })
        .finally(() => setLoading(false));
    } else {
      setMovies([]); // Очищаємо список, якщо пошуковий запит порожній
      setNoResults(false); // Скидаємо повідомлення про відсутність результатів
    }
  }, [debouncedQuery]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search for movies"
      />
      {loading && <p>Loading...</p>}
      {noResults && <p>No movies found for "{query}". Try again with a different keyword.</p>}
      <MovieList movies={movies} />
    </div>
  );
}

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map(movie => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </ul>
  );
};
export default MoviesPage;
