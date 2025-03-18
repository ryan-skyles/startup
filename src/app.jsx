import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Saved } from './saved/saved';
import { Account } from './account/account';
import { AuthState } from './login/authState';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';


function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('username') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);

    return (
        <BrowserRouter>
            <div className="body bg-dark text-light">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
                    <div className="col-md-3 mb-2 mb-md-0">
                            <h1>WhatyaWatchin</h1>
                    </div>
                    <menu className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        {authState == AuthState.Authenticated && ( 
                            <li>
                            <NavLink className="nav-link px-4" to="home">
                                Home
                            </NavLink>
                            </li>
                        )}

                        {authState == AuthState.Authenticated && ( 
                            <li>
                            <NavLink className="nav-link" to="saved">
                                Saved
                            </NavLink>
                            </li>
                        )}

                        {authState == AuthState.Authenticated && (
                            <li>
                                <NavLink className="nav-link" to="account">
                                    Account
                                </NavLink>
                            </li>
                        )}
                    </menu>
                    <div className="col-md-3 text-end">
                        <NavLink className="nav-link" to="">
                            <button type="button" className="btn btn-outline-primary me-2">Login</button>
                        </NavLink>
                    </div>
                </header>

                <Routes>
                    <Route 
                        path='/'
                        element={
                            <Login
                                userName={userName}
                                authState={authState}
                                onAuthChange={(userName, authState) => {
                                    setAuthState(authState);
                                    setUserName(userName);
                                }}
                            />
                        }
                        exact
                    />
                    
                    <Route path='/home' element={<Home userName={userName} />} />
                    <Route path='/saved' element={<Saved />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <span className="text-reset">Author: </span>
                    <a href="https://github.com/ryan-skyles/startup">Ryan Skyles</a>
                </footer>
            </div>;
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}

export default App;

      