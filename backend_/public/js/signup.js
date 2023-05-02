/* eslint-disable */
import { showAlert } from './alerts';

export const signup = async (email, password, passwordConfirm, name) => {
  console.log('stufff\n', email, password, passwordConfirm, name);
    try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/signup',
      data: {
        email,
        password,
        passwordConfirm,
        name,
      },
    });
    console.log('after signup post', res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', 'Signup successful');
      console.log('after the signup alert');
      window.setTimeout(() => {
        location.assign('/');
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
    console.log('errrrroooorrr', err)
  }
};
