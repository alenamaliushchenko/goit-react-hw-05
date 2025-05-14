import axios from 'axios';

const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  console.error("API Key is missing. Please add it in the .env file.");
} else {
  console.log("API Key found and ready to use.");
}

const BASE_URL = 'https://api.themoviedb.org/3';
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
  params: {
    language: 'en-US',
  },
});

// Запит на отримання популярних фільмів
// Запит на отримання популярних фільмів
export const fetchTrendingMovies = async () => {
  try {
    const response = await axiosInstance.get('/trending/movie/day?language=en-US');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;  // Можна додати додаткову логіку, як-от показати користувачу повідомлення
  }
};

// Пошук фільму за запитом
export const searchMovies = async (query) => {
  try {
    const response = await axiosInstance.get('/search/movie', {
      params: {
        query,
        include_adult: false,
        language: 'en-US',
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Отримання подробиць про фільм
export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}?language=en-US`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Отримання акторського складу фільму
export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/credits?language=en-US`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

// Отримання оглядів фільму
export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axiosInstance.get(`/movie/${movieId}/reviews?language=en-US`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie reviews:', error);
    throw error;
  }
};
