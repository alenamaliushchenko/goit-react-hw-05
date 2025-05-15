import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navigation from './components/Navigation';
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MovieList = lazy(() => import('./components/MovieList'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const MovieReviews = lazy(() => import('./components/MovieReviews'));
const MovieCast = lazy(() => import('./components/MovieCast'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));


function App() {
  return (
    <div>
      <Navigation />

      <Suspense fallback={<div className="loader">Завантаження...</div>}>
        <Routes>
          <Route path="/" element={ <HomePage />} />
          <Route path="movieList" element={ <MovieList />} />
          <Route path="/movies" element={ <MoviesPage />} />
          <Route path="/movies/:movieId" element={ <MovieDetailsPage/> }>
            <Route path="cast" element={ <MovieCast/>} />
            <Route path="reviews" element={ <MovieReviews/>}/>
          </Route>
          <Route path="*" element={ <NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
