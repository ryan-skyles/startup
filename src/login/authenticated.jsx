import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
      })
      .finally(() => {
        localStorage.removeItem('userName');
        props.onLogout();
      });
  }

  return (
    <>
      <main className="form-signin w-100 m-auto">
        <div class="modal-content rounded-4 shadow">
          <div className="modal-body p-5 pt-0">
            <div className="userName text-center" style={{ fontSize: `${Math.max(50, 100 / props.userName.length)}px` }}>
              Welcome {props.userName}!
            </div>
            <Button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk" variant='warning' onClick={() => navigate('/home')}>
              Home
            </Button>
            <Button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" variant='secondary' onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
