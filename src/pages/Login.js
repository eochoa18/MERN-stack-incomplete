import { useState } from 'react';
import axios from 'axios';
import { showAlert } from '../components/Alerts';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

function Login() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    console.log(email, password);
    axios
      .post('http://localhost:3000/api/v1/users/login', {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log('after posting\n', res, '\n\ntoken:\n', res.data.token);
        if (res.data.status === 'success') {
          showAlert('success', 'Logged in successfully');
          const token = res.data.token;
          cookies.set('jwt', token, { path: '/', maxAge: 3600 }); // save the token as a cookie with a one-hour expiration time
          navigate('/'); // redirect to the home page

          // console.log('res\n', res, '\ntoken\n', res.data.token);
          // const decoded = jwt(res.data.token);
          // console.log('\ndecoded\n', decoded)
          // const userId = decoded.id
          // const token = res.data.token
          // console.log(decoded)

          // cookies.set("jwt", res.data.token, {
          //   path: '/',
          //   expires: new Date(decoded.exp * 1000)
          // }  )
          // navigate("/");
        }
      })
      .catch((err) => {
        showAlert('error', err.response.data.message);
      });
  };

  return (
    <>
      <main className='main'>
        <div className='login-form'>
          <h2 className='heading-secondary ma-bt-lg'>Log into your account</h2>
          <form className='form form--login'>
            <div className='form__group'>
              <label className='form__label' htmlFor='email'>
                Email address
              </label>
              <input
                className='form__input'
                id='email'
                type='email'
                placeholder='you@example.com'
                required='required'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form__group ma-bt-md'>
              <label className='form__label' htmlFor='password'>
                Password
              </label>
              <input
                className='form__input'
                id='password'
                type='password'
                placeholder='••••••••'
                required='required'
                minLength='8'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='form__group'>
              <button className='btn btn--green' onClick={login}>
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Login;
