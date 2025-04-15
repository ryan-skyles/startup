import React, { useState, useEffect } from 'react';
import './account.css';

export function Account({ movies, updateMovie }) {
  const [profileImage, setProfileImage] = useState(null); 
  const [userName, setUserName] = useState(""); 
  const [updatedMovies, setUpdatedMovies] = useState([...movies]); 
  const [watchedCount, setWatchedCount] = useState(() => {
    return parseInt(localStorage.getItem('watchedCount')) || 0;
  });

  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }

    fetch('/api/totals')
      .then((response) => response.json())
      .then((totals) => {
        const top = totals.slice(0, 5).map((entry) => [entry.name.split('@')[0], entry.total]);
        setTopUsers(top);
      });
  }, []);
  
  // React.useEffect(() => {
  //   const storedUserName = localStorage.getItem('userName');
  //   if (storedUserName) {
  //     setUserName(storedUserName);
  //   }
  // }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); 
    }
  };

  const handleMovieChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMoviesCopy = [...updatedMovies];
    updatedMoviesCopy[index][name] = value;
    setUpdatedMovies(updatedMoviesCopy); 
  };

  const handleUpdate = (index) => {
    const updatedMoviesCopy = [...updatedMovies];
    updatedMoviesCopy[index] = updatedMovies[index];
    updateMovie(updatedMoviesCopy); 

    setWatchedCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem('watchedCount', newCount);     
      
      const user = userName || 'Guest';
      const stats = JSON.parse(localStorage.getItem('watchedStats')) || {};
      stats[user] = newCount;
      localStorage.setItem('watchedStats', JSON.stringify(stats));

      // fetch('/api/total', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ total: newCount }),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setTopUsers(data.map(user => [user.email.split('@')[0], user.total]));
      //   })
      //   .catch((err) => console.error('Failed to update total:', err));

      // return newCount;
      fetch('/api/total', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: user,
          total: newCount,
          date: new Date().toLocaleDateString(),
        }),
      });

      return newCount;
    });
    
  };

  // const [topUsers, setTopUsers] = useState([]);
 
 
  // useEffect(() => {
  //   const stats = JSON.parse(localStorage.getItem('watchedStats')) || {};
  //   const sorted = Object.entries(stats)
  //     .sort(([, a], [, b]) => b - a)
  //     .slice(0, 5); 
  //   setTopUsers(sorted);
  // }, [watchedCount]); 


  // React.useEffect(() => {
  //   const stats = JSON.parse(localStorage.getItem('watchedStats')) || {};
  //   const sorted = Object.entries(stats)
  //     .sort(([, a], [, b]) => b - a)
  //     .slice(0, 5); 
  //   setTopUsers(sorted);
  // }, [watchedCount]); 

  

  // const hasMovieChanged = (index) => {
  //   const original = movies[index];
  //   const updated = updatedMovies[index];
  //   return original.title !== updated.title || original.rating !== updated.rating;
  // };
  
  return (
    <main className="container">
      <div className="col-lg-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="d-none"
          id="uploadProfilePic"
        />
        <label htmlFor="uploadProfilePic">
          <svg
            className="bd-placeholder-img rounded-circle"
            width="140"
            height="140"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect>
            {profileImage && (
              <image href={profileImage} width="140" height="140" />
            )}
          </svg>
        </label>
      </div>

      {/* Movie Rankings */}
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h4 className="border-bottom pb-2 mb-0">{userName} | Your Current Rankings:</h4>
        {movies.map((movie) => (
          <div key={movie.id} className="d-flex text-body-secondary pt-3">
            <img
              src={movie.image}
              alt={`#${movie.rank}`}
              className="bd-placeholder-img flex-shrink-0 me-2 rounded"
              width="50"
              height="50"
            />
            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
              <div className="d-flex justify-content-between">
                <strong className="text-gray-dark">{movie.title}</strong>
              </div>
              <span className="d-block">Rating: {movie.rating}/10</span>
            </div>
          </div>
        ))}
      </div>

      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h4 className="border-bottom pb-2 mb-0">🏆 Top 5 Users</h4>
        {topUsers.length === 0 ? (
          <p className="text-muted">No data yet</p>
        ) : (
          <ol className="pt-2">
            {topUsers.map(([name, count], i) => (
              <li key={i}>
                <strong>{name}</strong>: {count} watched
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h4 className="border-bottom pb-2 mb-0">
          🎬Movies Watched: {watchedCount}
        </h4>
      </div>

      {/* Update Rankings */}
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h4 className="border-bottom pb-2 mb-0">Update Rankings:</h4>

        {updatedMovies.map((movie, index) => (
          <div key={movie.id} className="d-flex text-body-secondary pt-3">
            <img
              src={movie.image}
              alt={`#${movie.rank}`}
              className="bd-placeholder-img flex-shrink-0 me-2 rounded"
              width="20"
              height="20"
            />
            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
              <div className="d-flex justify-content-between">
                <div className="input-group input-group-sm mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Movie</span>
                  <input
                    type="text"
                    name="title"
                    className="form-control"
                    aria-label="Movie Title Input"
                    value={movie.title}
                    onChange={(e) => handleMovieChange(e, index)}
                    aria-describedby="inputGroup-sizing-sm"
                  />
                </div>
                <div className="input-group input-group-sm mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Rating</span>
                  <input
                    type="number"
                    name="rating"
                    className="form-control"
                    aria-label="Movie Rating Input"
                    value={movie.rating}
                    onChange={(e) => handleMovieChange(e, index)}
                    aria-describedby="inputGroup-sizing-sm"
                    min="0"
                    max="10"
                  />
                </div>
              </div>
            </div>
            <button
              className="btn btn-warning rounded-pill px-5"
              type="button"
              onClick={() => handleUpdate(index)}
              // disabled={!hasMovieChanged(index)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
