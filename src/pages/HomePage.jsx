import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../api/tmdbApi'; // шлях до файлу з функцією
import MovieList from '../components/MovieList';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrendingMovies()
      .then(movies => setTrendingMovies(movies))
      .catch(() => setError('Не вдалося завантажити трендові фільми'));
  }, []);

  return (
    <main>
      <h1>Трендові фільми</h1>
      {error && <p>{error}</p>}
      <MovieList movies={trendingMovies} />
    </main>
  );
}
