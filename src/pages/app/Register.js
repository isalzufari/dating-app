import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useInput from '../../hooks/useInput'
import { registerAction } from '../../utils/action';

const Register = () => {
  const navigate = useNavigate();
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onRegister = async ({ name, email, password }) => {
    const registerUser = await registerAction({ name, email, password });
    const { data, status } = registerUser;
    if (status === "success") {
      return navigate('/app/login'); // Bug
    }
  }

  return (
    <div style={{ maxWidth: 330, padding: 15 }} className='m-auto w-100'>
      <form className='text-center'>
        {/* <img class="mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" /> */}

        <h1 class="h4 mb-3 fw-normal">daftar</h1>

        <div class="form-floating mb-3">
          <input value={name} onChange={onNameChange} type="text" class="form-control" id="floatingInput" placeholder="nama lengkap" />
          <label for="floatingInput">nama</label>
        </div>

        <div class="form-floating mb-3">
          <input value={email} onChange={onEmailChange} type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">email</label>
        </div>

        <div class="form-floating mb-3">
          <input value={password} onChange={onPasswordChange} type="password" class="form-control" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">password</label>
        </div>

        <button onClick={() => onRegister({ name, email, password })} class="w-100 btn btn btn-primary" type="button">daftar</button>
        <p className='mt-3'>sudah punya akun? <Link to="/app/login">masuk</Link></p>
      </form>
    </div>
  )
}

export default Register