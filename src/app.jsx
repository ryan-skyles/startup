import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Home } from './home/home';
import { Saved } from './saved/saved';
import { Account } from './account/account';

export default function App() {
    return <div className="body bg-dark text-light">
            <BrowserRouter>
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
                    <div className="col-md-3 mb-2 mb-md-0">
                        <NavLink className="nav-link px-4" to="home">
                            <h1>WhatyaWatchin</h1>
                        </NavLink>
                    </div>
                    <menu className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li>
                            <NavLink className="nav-link px-4" to="home">
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" to="saved">
                                Saved
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link" to="account">
                                Account
                            </NavLink>
                        </li>
                    </menu>
                    <div className="col-md-3 text-end">
                        <NavLink className="nav-link" to="">
                         <button type="button" className="btn btn-outline-primary me-2">Login</button>
                        </NavLink>
                    </div>
                </header>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/home' element={<Home />} />
                    <Route path='/saved' element={<Saved />} />
                    <Route path='/account' element={<Account />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer>
                    <span className="text-reset">Author: </span>
                    <a href="https://github.com/ryan-skyles/startup">Ryan Skyles</a>
                </footer>
            </BrowserRouter>
    </div>;
    function NotFound() {
        return <main className="container-fluid bg-secondary text-center">404: Return to sender. Address unknown.</main>;
    }
}