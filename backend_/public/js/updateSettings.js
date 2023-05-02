/* eslint-disable */
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  // type is either 'pasword' or 'data'
  try {
    const url =
      type === 'data'
        ? 'http://localhost:3000/api/v1/users/updateMe'
        : 'http://localhost:3000/api/v1/users/updateMyPassword';

    console.log(url);
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });
    console.log('data\n', data);
    console.log(res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()} updated successfully`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
