import React from 'react';
import './login.css';
import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange}) {
  return (
    <main>
      <div>
        {/* {authState !== AuthState.Unknown && <h1>So Whatya Watchin?</h1>} */}
        {authState === AuthState.Authenticated && (
        <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main> 
  );
}

//  <main className="form-signin w-100 m-auto">
//     <div className="modal-content rounded-4 shadow">
//       <div className="modal-body p-5 pt-0">
//         <div>
//           {authState !== AuthState.Unknown && <h1>So Whatya Watchin?</h1>}
//           {authState === AuthState.Authenticated && (
//           <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
//           )}
//           {authState === AuthState.Unauthenticated && (
//             <Unauthenticated
//               userName={userName}
//               onLogin={(loginUserName) => {
//                 onAuthChange(loginUserName, AuthState.Authenticated);
//               }}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//  </main> 


{/* <div>
{authState !== AuthState.Unknown && <h1>So Whatya Watchin?</h1>}
{authState === AuthState.Authenticated && (
  <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
)}
{authState === AuthState.Unauthenticated && (
  <Unauthenticated
    userName={userName}
    onLogin={(loginUserName) => {
      onAuthChange(loginUserName, AuthState.Authenticated);
    }}
  />
)}
</div> */}


{/* <form className="get" action="home.html">
<div className="form-floating mb-3">
  <input type="text" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" fdprocessedid="0yatf"/>
  <label for="floatingInput">User Name</label>
</div>
<div className="form-floating mb-3">
  <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password" fdprocessedid="vllqp"/>
  <label for="floatingPassword">Password</label>
</div>
<button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk">Sign in</button>
<button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk">Create Account</button>
</form> */}




{/* <main>
<div>
  {authState !== AuthState.Unknown && <h1>So Whatya Watchin?</h1>}
  {authState === AuthState.Authenticated && (
    <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
  )}
  {authState === AuthState.Unauthenticated && (
    <Unauthenticated
      userName={userName}
      onLogin={(loginUserName) => {
        onAuthChange(loginUserName, AuthState.Authenticated);
      }}
    />
  )}
</div>
</main> */}