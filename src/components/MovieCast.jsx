import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../api/tmdbApi';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCredits(movieId);
        setCast(data.cast);
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити акторський склад.');
      } finally {
        setLoading(false);
      }
    };

    getCast();
  }, [movieId]);

  if (loading) return <p>Завантаження складу...</p>;
  if (error)   return <p>{error}</p>;
  if (cast.length === 0) return <p>Немає інформації про акторів.</p>;

  return (
    <div>
      <h3>Акторський склад</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {cast.map(actor => {
          // Формуємо повний URL до фото актора
          const profileUrl = actor.profile_path
            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
            : 'https://via.placeholder.com/200x300?text=No+Photo';

          return (
            <li key={actor.cast_id} style={{ display: 'flex', marginBottom: '15px' }}>
              <img
                src={profileUrl}
                alt={actor.name}
                width="100"
                style={{ borderRadius: '8px', marginRight: '10px' }}
              />
              <div>
                <p><strong>{actor.name}</strong></p>
                <p>Роль: {actor.character}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MovieCast;
