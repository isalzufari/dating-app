import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import useInput from '../../hooks/useInput';
import { loginAction } from '../../utils/action.js';

const Login = ({ setauthUser }) => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onLogin = async ({ email, password }) => {
    const authUser = await loginAction({ email, password });
    setauthUser(authUser);
    // return <Navigate to="/" replace />
  };

  return (
    <div style={{ maxWidth: 330, padding: 15 }} className='m-auto w-100'>
      <form className='text-center'>
        {/* <img class="mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}

        <h1 class="h4 mb-3 fw-normal">masuk</h1>

        <div class="form-floating mb-3">
          <input value={email} onChange={onEmailChange} type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">email</label>
        </div>

        <div class="form-floating mb-3">
          <input value={password} onChange={onPasswordChange} type="password" class="form-control" id="floatingPassword" placeholder="password" />
          <label for="floatingPassword">password</label>
        </div>

        <button onClick={() => onLogin({ email, password })} class="w-100 btn btn btn-primary" type="button">masuk</button>
        <p className='mt-3'>belum punya akun? <Link to="/app/register">daftar</Link></p>
      </form>
    </div>
  )
}

export default Login