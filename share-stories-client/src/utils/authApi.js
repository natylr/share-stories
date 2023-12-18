import apiService from './apiService';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const registerUserApi = async (
  fname,
  lname,
  email,
  password,
  address,
  city,
  phone
) => {
  try {
    const response = await apiService(
      `${BASE_URL}/user/register`,
      'POST',
      JSON.stringify({
        fname,
        lname,
        email,
        password,
        address,
        city,
        phone,
      })
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
      null, // No request body for this example
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
        token,
        fname,
        lname,
        address,
        city,
        phone,
      })
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
        token,
        prevPassword,
        newPassword,
      })
    );

    return response;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};
