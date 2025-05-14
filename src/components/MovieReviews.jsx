import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../api/tmdbApi';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);  // API повертає { results: [...] }
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити відгуки.');
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  if (loading) return <p>Завантаження відгуків...</p>;
  if (error)   return <p>{error}</p>;
  if (reviews.length === 0) return <p>Немає відгуків для цього фільму.</p>;

  return (
    <div>
      <h3>Відгуки</h3>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <strong>{review.author}:</strong>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
