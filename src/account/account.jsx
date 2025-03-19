import React, { useState, useEffect } from 'react';
import './account.css';

export function Account({ movies, updateMovie }) {
  // State for profile image
  const [profileImage, setProfileImage] = useState(null); 
  const [userName, setUserName] = useState(""); // State for username
  const [updatedMovies, setUpdatedMovies] = useState([...movies]); // Temporary state for movie updates

  // Load the username from localStorage
  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // Handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Set the uploaded image URL
    }
  };

  // Handle movie title and ranking update in temporary state
  const handleMovieChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMoviesCopy = [...updatedMovies];
    updatedMoviesCopy[index][name] = value;
    setUpdatedMovies(updatedMoviesCopy); // Update the temporary state
  };

  // Commit changes to the main movies array when "Update" button is clicked
  const handleUpdate = (index) => {
    const updatedMoviesCopy = [...updatedMovies];
    updatedMoviesCopy[index] = updatedMovies[index];
    updateMovie(updatedMoviesCopy); // Send the updated movies list to App.js
  };

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
        <h2 className="fw-normal">@{userName}</h2>
      </div>

      {/* Movie Rankings */}
      <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h4 className="border-bottom pb-2 mb-0">Your Current Rankings:</h4>

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
              <span className="d-block">Rating: {movie.rating}</span>
            </div>
          </div>
        ))}
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
              className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
              type="button"
              onClick={() => handleUpdate(index)}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}












// import React, { useState, useEffect } from 'react';
// import './account.css';

// export function Account() {
//   // Initial movie data
//   const [profileImage, setProfileImage] = useState(null); // State for profile image
//   const [userName, setUserName] = useState(""); // State for username
//   const [movies, setMovies] = useState([
//     { id: 1, title: "Movie 1", rating: "5/10", rank: 1, image: "RankOne1.png" },
//     { id: 2, title: "Movie 2", rating: "8/10", rank: 2, image: "RankTwo.png" },
//     { id: 3, title: "Movie 3", rating: "9/10", rank: 3, image: "RankThree.png" }
//   ]);

//   const [updatedMovies, setUpdatedMovies] = useState([...movies]); // Temporary state for movie updates

//   // Load the username from localStorage
//   useEffect(() => {
//     const storedUserName = localStorage.getItem('userName');
//     if (storedUserName) {
//       setUserName(storedUserName);
//     }
//   }, []);

//   // Handle profile picture upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl); // Set the uploaded image URL
//     }
//   };

//   // Handle movie title and ranking update in temporary state
//   const handleMovieChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedMoviesCopy = [...updatedMovies];
//     updatedMoviesCopy[index][name] = value;
//     setUpdatedMovies(updatedMoviesCopy); // Update the temporary state
//   };

//   // Commit changes to the main movies array when "Update" button is clicked
//   const handleUpdate = (index) => {
//     const updatedMoviesCopy = [...movies];
//     updatedMoviesCopy[index] = updatedMovies[index];
//     setMovies(updatedMoviesCopy); // Update the main movies array
//   };

//   return (
//     <main className="container">
//       <div className="col-lg-4">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="d-none"
//           id="uploadProfilePic"
//         />
//         <label htmlFor="uploadProfilePic">
//           <svg
//             className="bd-placeholder-img rounded-circle"
//             width="140"
//             height="140"
//             xmlns="http://www.w3.org/2000/svg"
//             role="img"
//             aria-label="Placeholder"
//             preserveAspectRatio="xMidYMid slice"
//             focusable="false"
//           >
//             <title>Placeholder</title>
//             <rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect>
//             {profileImage && (
//               <image href={profileImage} width="140" height="140" />
//             )}
//           </svg>
//         </label>
//         <h2 className="fw-normal">@{userName}</h2>
//       </div>

//       {/* Movie Rankings */}
//       <div className="my-3 p-3 bg-body rounded shadow-sm">
//         <h4 className="border-bottom pb-2 mb-0">Your Current Rankings:</h4>

//         {movies.map((movie) => (
//           <div key={movie.id} className="d-flex text-body-secondary pt-3">
//             <img
//               src={movie.image}
//               alt={`#${movie.rank}`}
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
//           </div>
//         ))}
//       </div>

//       {/* Update Rankings */}
//       <div className="my-3 p-3 bg-body rounded shadow-sm">
//         <h4 className="border-bottom pb-2 mb-0">Update Rankings:</h4>

//         {updatedMovies.map((movie, index) => (
//           <div key={movie.id} className="d-flex text-body-secondary pt-3">
//             <img
//               src={movie.image}
//               alt={`#${movie.rank}`}
//               className="bd-placeholder-img flex-shrink-0 me-2 rounded"
//               width="20"
//               height="20"
//             />
//             <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//               <div className="d-flex justify-content-between">
//                 <div className="input-group input-group-sm mb-3">
//                   <span className="input-group-text" id="inputGroup-sizing-sm">Movie</span>
//                   <input
//                     type="text"
//                     name="title"
//                     className="form-control"
//                     aria-label="Movie Title Input"
//                     value={movie.title}
//                     onChange={(e) => handleMovieChange(e, index)}
//                     aria-describedby="inputGroup-sizing-sm"
//                   />
//                 </div>
//                 <div className="input-group input-group-sm mb-3">
//                   <span className="input-group-text" id="inputGroup-sizing-sm">Rating</span>
//                   <input
//                     type="number"
//                     name="rating"
//                     className="form-control"
//                     aria-label="Movie Rating Input"
//                     value={movie.rating}
//                     onChange={(e) => handleMovieChange(e, index)}
//                     aria-describedby="inputGroup-sizing-sm"
//                     min="0"
//                     max="10"
//                   />
//                 </div>
//               </div>
//             </div>
//             <button
//               className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
//               type="button"
//               onClick={() => handleUpdate(index)}
//             >
//               Update
//             </button>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }




// import React, { useState, useEffect } from 'react';
// import './account.css';

// export function Account() {
//   // Initial movie data
//   const [profileImage, setProfileImage] = useState(null); // State for profile image
//   const [userName, setUserName] = useState(""); // State for username
//   const [movies, setMovies] = useState([
//     { id: 1, title: "Movie 1", rating: "5/10", rank: 1, image: "RankOne1.png" },
//     { id: 2, title: "Movie 2", rating: "8/10", rank: 2, image: "RankTwo.png" },
//     { id: 3, title: "Movie 3", rating: "9/10", rank: 3, image: "RankThree.png" }
//   ]);

//   // Load the username from localStorage
//   useEffect(() => {
//     const storedUserName = localStorage.getItem('userName');
//     if (storedUserName) {
//       setUserName(storedUserName);
//     }
//   }, []);

//   // Handle profile picture upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfileImage(imageUrl); // Set the uploaded image URL
//     }
//   };

//   // Handle movie title and ranking update
//   const handleMovieChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedMovies = [...movies];
//     updatedMovies[index][name] = value;
//     setMovies(updatedMovies); // Update the movies state
//   };

//   return (
//     <main className="container">
//       <div className="col-lg-4">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="d-none"
//           id="uploadProfilePic"
//         />
//         <label htmlFor="uploadProfilePic">
//           <svg
//             className="bd-placeholder-img rounded-circle"
//             width="140"
//             height="140"
//             xmlns="http://www.w3.org/2000/svg"
//             role="img"
//             aria-label="Placeholder"
//             preserveAspectRatio="xMidYMid slice"
//             focusable="false"
//           >
//             <title>Placeholder</title>
//             <rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect>
//             {profileImage && (
//               <image href={profileImage} width="140" height="140" />
//             )}
//           </svg>
//         </label>
//       </div>

//       {/* Movie Rankings */}
//       <div className="my-3 p-3 bg-body rounded shadow-sm">
//         <h4 className="border-bottom pb-2 mb-0">{userName} | Your Current Rankings:</h4>

//         {movies.map((movie, index) => (
//           <div key={movie.id} className="d-flex text-body-secondary pt-3">
//             <img
//               src={movie.image}
//               alt={`#${movie.rank}`}
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
//           </div>
//         ))}
//       </div>

//       {/* Update Rankings */}
//       <div className="my-3 p-3 bg-body rounded shadow-sm">
//         <h4 className="border-bottom pb-2 mb-0">Update Rankings:</h4>

//         {movies.map((movie, index) => (
//           <div key={movie.id} className="d-flex text-body-secondary pt-3">
//             <img
//               src={movie.image}
//               alt={`#${movie.rank}`}
//               className="bd-placeholder-img flex-shrink-0 me-2 rounded"
//               width="20"
//               height="20"
//             />
//             <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//               <div className="d-flex justify-content-between">
//                 <div className="input-group input-group-sm mb-3">
//                   <span className="input-group-text" id="inputGroup-sizing-sm">Title</span>
//                   <input
//                     type="text"
//                     name="title"
//                     className="form-control"
//                     aria-label="Movie Title Input"
//                     value={movie.title}
//                     onChange={(e) => handleMovieChange(e, index)}
//                     aria-describedby="inputGroup-sizing-sm"
//                   />
//                 </div>
//                 <div className="input-group input-group-sm mb-3">
//                   <span className="input-group-text" id="inputGroup-sizing-sm">Rating</span>
//                   <input
//                     type="number"
//                     name="rating"
//                     className="form-control"
//                     aria-label="Movie Rating Input"
//                     value={movie.rating}
//                     onChange={(e) => handleMovieChange(e, index)}
//                     aria-describedby="inputGroup-sizing-sm"
//                     min="0"
//                     max="10"
//                   />
//                 </div>
//               </div>
//             </div>
//             {/* <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="button">
//               Update
//             </button> */}
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// }

// import React from 'react';
// import './account.css';

// export function Account() {
//   return (
//     <main className="container">
//       <div className="col-lg-4">
//           <svg className="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect></svg>
//           <h2 className="fw-normal">@Username</h2>
//       </div>
//       <div className="my-3 p-3 bg-body rounded shadow-sm">
//           <h4 className="border-bottom pb-2 mb-0">Your Current Rankings:</h4>
//           <div className="d-flex text-body-secondary pt-3">
//               <img src="RankOne1.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//               <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//                   <div className="d-flex justify-content-between">
//                   <strong className="text-gray-dark">Movie Title</strong>                      
//                   </div>
//                   <span className="d-block">Rating:</span>
//               </div>
//           </div>               
//           <div className="d-flex text-body-secondary pt-3">
//               <img src="RankTwo.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//               <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//                   <div className="d-flex justify-content-between">
//                   <strong className="text-gray-dark">Movie Title</strong>                        
//                   </div>
//                   <span className="d-block">Rating:</span>
//               </div>
//           </div>
//           <div className="d-flex text-body-secondary pt-3">
//               <img src="RankThree.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="50" height="50"/>
//               <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//                   <div className="d-flex justify-content-between">
//                   <strong className="text-gray-dark">Movie Title</strong>
//                   </div>
//                   <span className="d-block">Rating:</span>
//               </div>
//           </div>
//       </div>
//       <div className="my-3 p-3 bg-body rounded shadow-sm">
//           <h4 className="border-bottom pb-2 mb-0">Update Rankings:</h4>
//           <div className="d-flex text-body-secondary pt-3">
//               <img src="RankOne1.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="20" height="20"/>
//               <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//                   <div className="d-flex justify-content-between">
//                       <div className="input-group input-group-sm mb-3">
//                           <span className="input-group-text" id="inputGroup-sizing-sm">Movie</span>
//                           <input type="text" className="form-control" aria-label="Movie Title Input" aria-describedby="inputGroup-sizing-sm"/>
//                       </div>
//                   </div>
//                   {/* <div>
//                       <label for="range">Rating: </label>
//                       <input type="range" name="varRange" id="range" min="0" max="10" step="1" value="0" />
//                       <output id="rangeOutput" for="range">0</output>
//                   </div> */}
//               </div>
//               <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk" max-width= "40px" margin= '0 auto' max-height='40px' >Update</button>
//           </div>               
//           <div className="d-flex text-body-secondary pt-3">
//               <img src="RankTwo.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="20" height="20"/>
//               <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//                   <div className="d-flex justify-content-between">
//                       <div className="input-group input-group-sm mb-3">
//                           <span className="input-group-text" id="inputGroup-sizing-sm">Movie</span>
//                           <input type="text" className="form-control" aria-label="Movie Title Input" aria-describedby="inputGroup-sizing-sm"/>
//                       </div>
//                   </div>
//                   {/* <div>
//                       <label for="range">Rating: </label>
//                       <input type="range" name="varRange" id="range" min="0" max="10" step="1" value="0" />
//                       <output id="rangeOutput" for="range">0</output>
//                   </div> */}
//               </div>
//               <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk" max-width= "100px" margin= '0 auto' max-height='40px'>Update</button>
//           </div>
//           <div className="d-flex text-body-secondary pt-3">
//               <img src="RankThree.png" alt="#1" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="20" height="20"/>
//               <div className="pb-3 mb-0 small lh-sm border-bottom w-100">
//                   <div className="d-flex justify-content-between">
//                       <div className="input-group input-group-sm mb-3">
//                           <span className="input-group-text" id="inputGroup-sizing-sm">Movie</span>
//                           <input type="text" className="form-control" aria-label="Movie Title Input" aria-describedby="inputGroup-sizing-sm"/>
//                       </div>
//                   </div>
//                   {/* <div>
//                       <label for="range">Rating: </label>
//                       <input type="range" name="varRange" id="range" min="0" max="10" step="1" value="0" />
//                       <output id="rangeOutput" for="range">0</output>
//                   </div> */}
//               </div>
//               <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk" max-width= "100px" margin= '0 auto' max-height='40px'>Update</button>
//           </div>
//       </div>
//     </main>
//   );
// }