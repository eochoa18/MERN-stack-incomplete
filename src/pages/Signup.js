import axios from 'axios';
import { useState } from 'react';
import { showAlert } from '../components/Alerts';
// import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
  // const navigate = useNavigate();

  // const loginForm = document.querySelector('.form--login');

  // if (loginForm)
  //   loginForm.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     const email = document.getElementById('email').value;
  //     const password = document.getElementById('password').value;
  //     signup(email, password);
  //   });

  const signup = (e) => {
    e.preventDefault(); 
    console.log(name, email, password, confirm_password)

    // const name = document.getElementById('name').value;
    // const email = document.getElementById('email').value;
    // const password = document.getElementById('password').value;
    // const confirm_password = document.getElementById('confirm_password').value;

    axios.post('http://localhost:3000/api/v1/users/signup', {
      email: email,
      password: password,
      passwordConfirm: confirm_password,
      name: name,
    }).then((res) => {
        if (res.data.status === 'success') {
          showAlert('success', 'Signup successful');
          // navigate('/');
        }

    }).catch((err) => {
        showAlert('error', err.response.data.message)
    })

  };

  return (
    <>
      <main className='main'>
        <div className='login-form'>
          <h2 className='heading-secondary ma-bt-lg'>Sign up for an account</h2>
          <form className='form form--login'>
            <div className='form__group'>
              <label className='form__label' htmlFor='name'>
                Full Name
              </label>
              <input
                className='form__input'
                id='name'
                type='name'
                placeholder='John Doe'
                required='required'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <label className='form__label' htmlFor='confirm_password'>
                Confirm Password
              </label>
              <input
                className='form__input'
                id='confirm_password'
                type='password'
                placeholder='••••••••'
                required='required'
                minLength='8'
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className='form__group'>
              <button className='btn btn--green' onClick={signup}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Signup;
