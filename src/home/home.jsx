import React, { useState, useEffect } from "react";
import "./home.css";
import { WatchedEvent, WatchedNotifier } from "./watchedNotifier";

export function Home({ movies, updateMovie }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [quote, setQuote] = useState("Loading...");
  const [quoteMovie, setQuoteMovie] = useState("unknown");
  const [quoteYear, setQuoteYear] = useState("unknown");
  const [messages, setMessages] = useState([]);

  const userName = localStorage.getItem("userName") || "Guest";

  useEffect(() => {
    const savedMoviesFromStorage =
      JSON.parse(localStorage.getItem("savedMovies")) || [];
    setSavedMovies(savedMoviesFromStorage);
  }, []);

  useEffect(() => {
    fetchWowQuote();
  }, []);

  useEffect(() => {
    WatchedNotifier.addHandler(handleIncomingMessage);
    return () => WatchedNotifier.removeHandler(handleIncomingMessage);
  }, [messages]);

  const handleIncomingMessage = (event) => {
    let message = "";
    if (event.type === WatchedEvent.System) {
      message = `${event.from.split("@")[0]}: ${event.value.msg}`;
    } else if (event.type === WatchedEvent.Start) {
      message = `${event.from.split("@")[0]} started a game`;
    } else if (event.type === WatchedEvent.End) {
      message = `${event.from.split("@")[0]} scored ${event.value.score}`;
    }
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const fetchWowQuote = () => {
    fetch("https://owen-wilson-wow-api.onrender.com/wows/random")
      .then((response) => response.json())
      .then((data) => {
        const wow = data[0];
        setQuote(wow.full_line);
        setQuoteMovie(wow.movie);
        setQuoteYear(wow.year);
      })
      .catch((error) => console.error("Error fetching wow quote:", error));
  };

  const sendMessage = (msg) => {
    WatchedNotifier.broadcastEvent(userName, WatchedEvent.System, { msg });
  };

  return (
    <main>
      <div className="container text-center">
        <div className="my-3 p-3 bg-body rounded">
          <div className="quote-box bg-light text-dark">
            <p className="quote">"{quote}"</p>
            <p className="author">
              — Owen Wilson in <strong>{quoteMovie}</strong> ({quoteYear})
            </p>
            <div>
              <button className="btn btn-primary my-3" onClick={fetchWowQuote}>
                Get New Wow
              </button>
            </div>
          </div>

          {/* 💬 WebSocket Message Section */}
          <div className="message-box mt-4">
            <h5>Live Messages</h5>
            <div className="messages text-start bg-light p-2 rounded" style={{ maxHeight: "200px", overflowY: "auto" }}>
              {messages.map((msg, index) => (
                <div key={index} className="text-secondary small">{msg}</div>
              ))}
            </div>
            <div className="input-group mt-2">
              <input
                type="text"
                className="form-control"
                placeholder="Send a message"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim() !== "") {
                    sendMessage(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* ... rest of your Home.jsx remains unchanged ... */}
      {/* User's Movies Section */}
       <div className="container">
         <div className="my-3 p-3 bg-body rounded">
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
                <img
                  src="SaveButton.png"
                  width="70px"
                  height="40px"
                  alt="Save Button"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}



// import React, { useState, useEffect } from "react";
// import "./home.css";

// export function Home({ movies, updateMovie }) {
//   const [savedMovies, setSavedMovies] = useState([]);
//   const [quote, setQuote] = useState("Loading...");
//   const [quoteMovie, setQuoteMovie] = useState("unknown");
//   const [quoteYear, setQuoteYear] = useState("unknown");

//   const userName = localStorage.getItem("userName") || "Guest";

//   // Load saved movies from localStorage
//   useEffect(() => {
//     const savedMoviesFromStorage =
//       JSON.parse(localStorage.getItem("savedMovies")) || [];
//     setSavedMovies(savedMoviesFromStorage);
//   }, []);

//   // Fetch Quote
//   const fetchWowQuote = () => {
//     fetch("https://owen-wilson-wow-api.onrender.com/wows/random")
//       .then((response) => response.json())
//       .then((data) => {
//         const wow = data[0];
//         setQuote(wow.full_line);
//         setQuoteMovie(wow.movie);
//         setQuoteYear(wow.year);
//       })
//       .catch((error) => console.error("Error fetching wow quote:", error));
//   };
  
//   useEffect(() => {
//     fetchWowQuote();
//   }, []);
  


//   // Handle save movie button click
//   const saveMovie = (movie) => {
//     setSavedMovies((prevMovies) => {
//       if (prevMovies.some((saved) => saved.id === movie.id)) {
//         return prevMovies; 
//       }
//       const updatedMovies = [...prevMovies, movie];
//       localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
//       return updatedMovies;
//     });
//   };

//   return (
//     <main>
//       <div className="container text-center">
//         <div className="my-3 p-3 bg-body rounded">
//           <div className="quote-box bg-light text-dark">
//             <p className="quote">"{quote}"</p>
//             <p className="author">
//               — Owen Wilson in <strong>{quoteMovie}</strong> ({quoteYear})
//             </p>
//             <div>
//               <button className="btn btn-primary my-3" onClick={fetchWowQuote}>
//                 Get New Wow
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* User's Movies Section */}
//       <div className="container">
//         <div className="my-3 p-3 bg-body rounded">
//           <h3 className="border-bottom pb-2 mb-0">{userName}'s Movies</h3>

//           {movies.map((movie) => (
//             <div key={movie.id} className="d-flex text-body-secondary pt-3">
//               <img
//                 src={movie.image}
//                 alt={`Rank ${movie.rank}`}
//                 className="bd-placeholder-img flex-shrink-0 me-2 rounded"
//                 width="50"
//                 height="50"
//               />
//               <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//                 <div className="d-flex justify-content-between">
//                   <strong className="text-gray-dark">{movie.title}</strong>
//                 </div>
//                 <span className="d-block">Rating: {movie.rating}</span>
//               </div>
//               <button
//                 className="btn btn-light rounded-pill px-3"
//                 type="button"
//                 onClick={() => saveMovie(movie)}
//               >
//                 <img
//                   src="SaveButton.png"
//                   width="70px"
//                   height="40px"
//                   alt="Save Button"
//                 />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Placeholder for Example Movies */}
//       <div className="container">
//         <div className="my-3 p-3 bg-body rounded">
//           <h3 className="border-bottom pb-2 mb-0">Example's Movies</h3>

//           {movies.map((movie) => (
//             <div key={movie.id} className="d-flex text-body-secondary pt-3">
//               <img
//                 src={movie.image}
//                 alt={`Rank ${movie.rank}`}
//                 className="bd-placeholder-img flex-shrink-0 me-2 rounded"
//                 width="50"
//                 height="50"
//               />
//               <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//                 <div className="d-flex justify-content-between">
//                   <strong className="text-gray-dark">Movie title</strong>
//                 </div>
//                 <span className="d-block">Rating: 9/10</span>
//               </div>
//               <button
//                 className="btn btn-light rounded-pill px-3"
//                 type="button"
//                 onClick={() => saveMovie(movie)}
//               >
//                 <img
//                   src="SaveButton.png"
//                   width="70px"
//                   height="40px"
//                   alt="Save Button"
//                 />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
//   );
// }

   













// import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// import './home.css';

// export function Home({ movies, updateMovie }) {
//   const [savedMovies, setSavedMovies] = useState([]);
//   // const navigate = useNavigate();
//   const userName = localStorage.getItem('userName') || 'Guest';

//   // Load saved movies from localStorage
//   useEffect(() => {
//     const savedMoviesFromStorage = JSON.parse(localStorage.getItem('savedMovies')) || [];
//     setSavedMovies(savedMoviesFromStorage);
//   }, []);

//   // Handle save movie button click
//   const saveMovie = (movie) => {
//     setSavedMovies((prevMovies) => {
//       const updatedMovies = [...prevMovies, movie];
//       localStorage.setItem('savedMovies', JSON.stringify(updatedMovies));
//       return updatedMovies;
//     });
//   };

//   // const handleNavigateToSaved = () => {
//   //   navigate('/saved');
//   // };

//   return (
//     <main>
//       <div>
//         <h2>Movie Quote</h2>
//         {loading ? <p>Loading...</p> : <p>"{quote.quote}" - {quote.role} ({quote.show})</p>}
//       </div>
//       <div className="container">
//         <div className="my-3 p-3 bg-body rounded">
//           {/* Display the username */}
//           <h3 className="border-bottom pb-2 mb-0">{userName}'s Movies</h3>
          
//           {movies.map((movie) => (
//             <div key={movie.id} className="d-flex text-body-secondary pt-3">
//               <img
//                 src={movie.image}
//                 alt={`Rank ${movie.rank}`}
//                 className="bd-placeholder-img flex-shrink-0 me-2 rounded"
//                 width="50"
//                 height="50"
//               />
//               <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//                 <div className="d-flex justify-content-between">
//                   <strong className="text-gray-dark">{movie.title}</strong>
//                 </div>
//                 <span className="d-block">Rating: {movie.rating}</span>
//               </div>
//               <button
//                 className="btn btn-light rounded-pill px-3"
//                 type="button"
//                 onClick={() => saveMovie(movie)}
//               >
//                 <img src="SaveButton.png" width="70px" height="40px" alt="Save Button" />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Place holder for other users rankings */}
//       <div className="container">
//         <div className="my-3 p-3 bg-body rounded">
//           {/* Display the username */}
//           <h3 className="border-bottom pb-2 mb-0">Example's Movies</h3>
//           {movies.map((movie) => (
//             <div key={movie.id} className="d-flex text-body-secondary pt-3">
//               <img
//                 src={movie.image}
//                 alt={`Rank ${movie.rank}`}
//                 className="bd-placeholder-img flex-shrink-0 me-2 rounded"
//                 width="50"
//                 height="50"
//               />
//               <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//                 <div className="d-flex justify-content-between">
//                   <strong className="text-gray-dark">Movie title</strong>
//                 </div>
//                 <span className="d-block">Rating: 9/10</span>
//               </div>
//               <button
//                 className="btn btn-light rounded-pill px-3"
//                 type="button"
//                 onClick={() => saveMovie(movie)}
//               >
//                 <img src="SaveButton.png" width="70px" height="40px" alt="Save Button" />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </main>
    
//   );
// }



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