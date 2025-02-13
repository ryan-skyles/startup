import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div classNameName="body bg-dark text-light">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <div className="col-md-3 mb-2 mb-md-0">
                <a href="home.html" className="d-inline-flex link-body-emphasis text-decoration-none"><h1>WhatyaWatchin</h1></a>
            </div>
            <menu className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><a href="home.html" className="nav-link px-4">Home</a></li>
                <li><a href="saved.html" className="nav-link px-4">Saved</a></li>
                <li><a href="account.html" className="nav-link px-4">Account</a></li>
            </menu>
            <div className="col-md-3 text-end">
                <a href="index.html" className="nav-link">
                    <button type="button" className="btn btn-outline-primary me-2">Login</button>
                </a>
            </div>
        </header>

        <main>App components go here</main>

        <footer>
            <span className="text-reset">Author: </span>
            <a href="https://github.com/ryan-skyles/startup">Ryan Skyles</a>
        </footer>
  </div>;
}