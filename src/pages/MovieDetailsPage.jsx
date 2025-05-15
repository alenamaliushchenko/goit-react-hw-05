import { useState, useEffect, useRef } from 'react';
import { useParams, Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchMovieDetails } from '../api/tmdbApi';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Використання useRef для збереження backLink
  const backLinkRef = useRef(location.state?.from || '/movies');

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити дані фільму.');
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [movieId]);

  if (loading) return <p>Завантаження фільму...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Фільм не знайдено.</p>;

  const { title, overview, release_date, vote_average, poster_path } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <div>
      <button onClick={() => navigate(backLinkRef.current)}>← Go back</button>

      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <img src={posterUrl} alt={title} width="250" />
        <div>
          <h1>{title} ({release_date?.slice(0, 4)})</h1>
          <p><strong>Рейтинг:</strong> {vote_average}</p>
          <h2>Опис</h2>
          <p>{overview}</p>
        </div>
      </div>

      <hr />

      <nav>
        <Link to="cast" state={{ from: backLinkRef.current }} style={{ marginRight: '15px' }}>
          Акторський склад
        </Link>
        <Link to="reviews" state={{ from: backLinkRef.current }}>
          Відгуки
        </Link>
      </nav>

      <Outlet />
    </div>
  );
}
