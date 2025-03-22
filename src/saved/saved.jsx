import React, { useState, useEffect } from 'react';
import './saved.css';

export function Saved() {
  const [savedMovies, setSavedMovies] = useState([]);

  React.useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem('savedMovies')) || [];
    setSavedMovies(storedMovies);
  }, []);

  const deleteMovie = (movieId) => {
    // Filters out the movie that matches the clicked movieId
    const updatedMovies = savedMovies.filter((movie) => movie.id !== movieId);
    
    // Updates the state and localStorage with the new movie list
    setSavedMovies(updatedMovies);
    localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
  };

  return (
    <main className="container">
      <div>
        <ul className="list-unstyled">
          {savedMovies.length === 0 ? (
            <p>No saved movies yet.</p>
          ) : (
            savedMovies.map((movie) => (
              <li key={movie.id} className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 text-decoration-none border-top">
                <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                  <rect width="100%" height="100%" fill="#777"></rect>
                </svg>
                <div className="col-lg-8">
                  <h1 className="mb-0">{movie.title}</h1>
                </div>
                <div className="d-flex gap-3">
                  {/* "Watched" button now deletes the movie */}
                  <button className="btn btn-primary rounded-pill px-3" onClick={() => deleteMovie(movie.id)} type="button">
                    Watched
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </main>
  );
}
