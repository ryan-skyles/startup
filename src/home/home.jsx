import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

export function Home({ movies, updateMovie }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Guest';

  // Load saved movies from localStorage
  useEffect(() => {
    const savedMoviesFromStorage = JSON.parse(localStorage.getItem('savedMovies')) || [];
    setSavedMovies(savedMoviesFromStorage);
  }, []);

  // Handle save movie button click
  const saveMovie = (movie) => {
    setSavedMovies((prevMovies) => {
      const updatedMovies = [...prevMovies, movie];
      localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  };

  const handleNavigateToSaved = () => {
    navigate('/saved');
  };

  return (
    <main className="container">
      <div className="my-3 p-3 bg-body rounded">
        {/* Display the username */}
        <h3 className="border-bottom pb-2 mb-0">{userName}'s Movies</h3>
        
        {movies.map((movie) => (
          <div key={movie.id} className="d-flex text-body-secondary pt-3">
            <img
              src={movie.image}
              alt={`Rank ${movie.rank}`}
              className="bd-placeholder-img flex-shrink-0 me-2 rounded"
              width="50"
              height="50"
            />
            <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
              <div className="d-flex justify-content-between">
                <strong className="text-gray-dark">{movie.title}</strong>
              </div>
              <span className="d-block">Rating: {movie.rating}</span>
            </div>
            <button
              className="btn btn-light rounded-pill px-3"
              type="button"
              onClick={() => saveMovie(movie)}
            >
              <img src="SaveButton.png" width="70px" height="40px" alt="Save Button" />
            </button>
          </div>
        ))}
      </div>

      {/* Navigation to saved movies */}
      <button
        className="btn btn-secondary mt-3"
        onClick={handleNavigateToSaved}
      >
        Go to Saved Movies
      </button>
    </main>
  );
}





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './home.css';

// export function Home() {
//   const [savedMovies, setSavedMovies] = useState([]);
//   const navigate = useNavigate();
//   const userName = localStorage.getItem('userName') || 'Guest';
//   // A list of movie objects to display
//   const movies = [
//     { id: 1, title: "Movie 1", rating: "5/10", rank: 1, image: "RankOne1.png" },
//     { id: 2, title: "Movie 2", rating: "8/10", rank: 2, image: "RankTwo.png" },
//     { id: 3, title: "Movie 3", rating: "9/10", rank: 3, image: "RankThree.png" }
//   ];

//   // Handle save movie button click
//   const saveMovie = (movie) => {
//     setSavedMovies((prevMovies) => {
//       const updatedMovies = [...prevMovies, movie];
//       localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
//       return updatedMovies;
//     });
//   };

//   const handleNavigateToSaved = () => {
//     navigate('/saved');
//   };

//   // shadow-sm

//   // my-3 p-3

//   return (
//     <main className="container">
//       <div className="my-3 p-3 bg-body rounded">
//         {/* Display the username */}
//         <h3 className="border-bottom pb-2 mb-0">{userName}'s Movies</h3>
//         {movies.map((movie) => (
//           <div key={movie.id} className="d-flex text-body-secondary pt-3">
//             <img
//               src={movie.image}
//               alt={`Rank ${movie.rank}`}
//               className="bd-placeholder-img flex-shrink-0 me-2 rounded"
//               width="50"
//               height="50"
//             />
//             <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//               <div className="d-flex justify-content-between">
//                 <strong className="text-gray-dark">{movie.title}</strong>
//               </div>
//               <span className="d-block">Rating: {movie.rating}</span>
//             </div>
//             <button
//               className="btn btn-light rounded-pill px-3"
//               type="button"
//               onClick={() => saveMovie(movie)}
//             >
//               <img src="SaveButton.png" width="70px" height="40px" alt="Save Button" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </main>
//   );

// }















// import React from 'react';
// import './home.css';

// export function Home() {
//   return (
//     <main className = 'container'>
//       <div className="my-3 p-3 bg-body rounded shadow-sm">
//         <h3 className="border-bottom pb-2 mb-0">@Username</h3>
//         <div className="d-flex text-body-secondary pt-3">
//           <img src="RankOne1.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//           <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//             <div className="d-flex justify-content-between">
//             <strong className="text-gray-dark">Movie Title</strong>                      
//             </div>
//             <span className="d-block">Rating:</span>
//           </div>
//           <button className="btn btn-light rounded-pill px-3" type="button" width="50px" height="40px"><img src="SaveButton.png" width= "70px" height= "40px" alt="Save Button"/></button>
//         </div>               
//         <div className="d-flex text-body-secondary pt-3">
//           <img src="RankTwo.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//           <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//             <div className="d-flex justify-content-between">
//             <strong className="text-gray-dark">Movie Title</strong>                        
//             </div>
//             <span className="d-block">Rating:</span>
//           </div>
//           <button className="btn btn-light rounded-pill px-3" type="button" width="50px" height="40px"><img src="SaveButton.png" width= "70px" height= "40px" alt="Save Button"/></button>                
//         </div>
//         <div className="d-flex text-body-secondary pt-3">
//           <img src="RankThree.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//           <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//             <div className="d-flex justify-content-between">
//             <strong className="text-gray-dark">Movie Title</strong>
//             </div>
//             <span className="d-block">Rating:</span>
//           </div>
//           <button className="btn btn-light rounded-pill px-3" type="button" width="50px" height="40px"><img src="SaveButton.png" width= "70px" height= "40px" alt="Save Button"/></button>                
//         </div>
//       </div>
//       <div className="my-3 p-3 bg-body rounded shadow-sm">
//         <h3 className="border-bottom pb-2 mb-0">@Username</h3>
//         <div className="d-flex text-body-secondary pt-3">
//           <img src="RankOne1.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//           <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//               <div className="d-flex justify-content-between">
//                 <strong className="text-gray-dark">Movie Title</strong>                      
//               </div>
//               <span className="d-block">Rating:</span>
//           </div>
//           <button className="btn btn-light rounded-pill px-3" type="button" width="50px" height="40px"><img src="SaveButton.png" width= "70px" height= "40px" alt="Save Button"/></button>                
//         </div>
//         <div className="d-flex text-body-secondary pt-3">
//             <img src="RankTwo.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//             <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//               <div className="d-flex justify-content-between">
//                 <strong className="text-gray-dark">Movie Title</strong>                        
//               </div>
//               <span className="d-block">Rating:</span>
//             </div>
//             <button className="btn btn-light rounded-pill px-3" type="button" width="50px" height="40px"><img src="SaveButton.png" width= "70px" height= "40px" alt="Save Button"/></button>                
//         </div>
//         <div className="d-flex text-body-secondary pt-3">
//           <img src="RankThree.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//           <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//               <div className="d-flex justify-content-between">
//                 <strong className="text-gray-dark">Movie Title</strong>
//               </div>
//               <span className="d-block">Rating:</span>
//           </div>
//           <button className="btn btn-light rounded-pill px-3" type="button" width="50px" height="40px"><img src="SaveButton.png" width= "70px" height= "40px" alt="Save Button"/></button>                
//         </div>
//       </div>
//       <div className="my-3 p-3 bg-body rounded shadow-sm">
//         <h3 className="border-bottom pb-2 mb-0">@Username</h3>
//         <div className="d-flex text-body-secondary pt-3">
//           <img src="RankOne1.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//           <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//             <div className="d-flex justify-content-between">
//               <strong className="text-gray-dark">Movie Title</strong>                      
//             </div>
//             <span className="d-block">Rating:</span>
//           </div>
//           <button className="btn btn-light rounded-pill px-3" type="button" width="50px" height="40px"><img src="SaveButton.png" width= "70px" height= "40px" alt="Save Button"/></button>                
//         </div>
//         <div className="d-flex text-body-secondary pt-3">
//           <img src="RankTwo.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//           <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//             <div className="d-flex justify-content-between">
//               <strong className="text-gray-dark">Movie Title</strong>                        
//             </div>
//             <span className="d-block">Rating:</span>
//           </div>
//           <button className="btn btn-light rounded-pill px-3" type="button" width="50px" height="40px"><img src="SaveButton.png" width= "70px" height= "40px" alt="Save Button"/></button>                
//         </div>
//         <div className="d-flex text-body-secondary pt-3">
//           <img src="RankThree.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//           <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//               <div className="d-flex justify-content-between">
//                 <strong className="text-gray-dark">Movie Title</strong>
//               </div>
//               <span className="d-block">Rating:</span>
//           </div>
//           <button className="btn btn-light rounded-pill px-3" type="button" width="50px" height="40px"><img src="SaveButton.png" width= "70px" height= "40px" alt="Save Button"/></button>                
//         </div>
//       </div>
//     </main>
//   );
// }