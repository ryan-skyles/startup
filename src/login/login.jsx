import React from 'react';
import './login.css';

export function Login() {
  return (
    <main className="form-signin w-100 m-auto">
      <div className="modal-content rounded-4 shadow">
        <div className="modal-body p-5 pt-0">
          <form className="get" action="home.html">
            <div className="form-floating mb-3">
              <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" fdprocessedid="0yatf"/>
              <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password" fdprocessedid="vllqp"/>
              <label for="floatingPassword">Password</label>
            </div>
            <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk">Sign in</button>
            <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk">Create Account</button>
          </form>
        </div>
      </div>
    </main>
  );
}
