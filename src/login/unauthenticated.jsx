import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';
import './login.css'

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  async function createUser() {
    localStorage.setItem('userName', userName);
    props.onLogin(userName);
  }

  return(
    <>
        <main className="form-signin w-100 m-auto">
            <div className="modal-content rounded-4 shadow">
                <div className="modal-body p-5 pt-0">
                <form className="get" action="home.html">
                    <div className="form-floating mb-3">
                        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control rounded-3" id="floatingInput" placeholder="name@example.com" fdprocessedid="0yatf"/>
                        <label for="floatingInput">User Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="password" onChange={(e) => setPassword(e.target.value)}className="form-control rounded-3" id="floatingPassword" placeholder="Password" fdprocessedid="vllqp"/>
                        <label for="floatingPassword">Password</label>
                    </div>
                    <Button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="submit" fdprocessedid="8v8edk" variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
                        Sign In
                    </Button>
                    <Button variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
                        Create Account
                    </Button>
                </form>
                </div>
            </div>
        </main>  
        <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />  
    </>
  );
}