// ApiAuth.js
import apiService from './apiService';
import BASE_URL from '../config/config'


export const registerUserApi = async (
  fname,
  lname,
  email,
  password,
  address,
  city,
  phone,
  avatar
) => {
  try {
    const formData = new FormData();
    formData.append('fname', fname);
    formData.append('lname', lname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('phone', phone);
    formData.append('avatar', avatar);

    const response = await apiService(
      `${BASE_URL}/user/register`,
      'POST',
      formData,
      null,
      { 'Content-Type': 'multipart/form-data' }
    );

    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUserApi = async (email, password) => {
  try {
    const response = await apiService(
      `${BASE_URL}/user/login-user`,
      'POST',
      JSON.stringify({
        email,
        password,
      })
    );

    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const getUserDataApi = async (token) => {
  try {
    const response = await apiService(
      `${BASE_URL}/user/user-data`,
      'POST',
      {},
      token
    );

    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateProfileApi = async (
  token,
  fname,
  lname,
  address,
  city,
  phone
) => {
  try {
    const response = await apiService(
      `${BASE_URL}/user/update-profile`,
      'PUT',
      JSON.stringify({
        fname,
        lname,
        address,
        city,
        phone,
      }),
      token
    );

    return response;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const changePasswordApi = async (token, prevPassword, newPassword) => {
  try {
    const response = await apiService(
      `${BASE_URL}/user/change-password`,
      'POST',
      JSON.stringify({
        prevPassword,
        newPassword,
      }),
      token
    );

    return response;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};
