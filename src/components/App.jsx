import { Routes, Route, NavLink } from "react-router-dom";
import { Suspense, lazy } from "react";

import Navigation from './Navigation';
import './App.css'

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const MovieReviews = lazy(() => import('./pages/MovieReviews'));
const MovieCast = lazy(() => import('./pages/MovieCast'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));


function App() {
  return (
    <div>
      <Navigation />

      <Suspense fallback={<div className="loader">Завантаження...</div>}>
        <Routes>
          <Route path="/" element={ <HomePage />} />
          <Route path="/movies" element={ <MoviesPage />} />
          <Route path="/movies/:movieId" element={ <MovieDetailsPage/> }>
            <Route path="/movies/:movieId/cast" element={ <MovieCast/>} />
            <Route path="/movies/:movieId/reviews" element={ <MovieReviews/>}/>
          </Route>
          <Route path="*" element={ <NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
