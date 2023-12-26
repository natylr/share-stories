import axios from 'axios';
import { logout } from "../utils/localStorage";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const apiService = async (url, method, data, token = null, headers = {}) => {
  try {
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axiosInstance({
      url,
      method,
      headers,
      data,
    });

    if (token && response.data === "Invalid Token") {
      logout();
      return;
    }

    return response.data;
  } catch (error) {
    console.error('Error:', error.response || error.request || error.message);

    if (error.response) {
      throw {
        status: error.response.status,
        data: error.response.data,
      };
    } else if (error.request) {
      throw {
        status: 500,
        message: 'No response received from the server',
      };
    } else {
      throw {
        status: 500,
        message: 'Error setting up the request',
      };
    }
  }
};

export default apiService;