import axios from 'axios';
import { logout } from "../utils/localStorage";
import BASE_URL from '../config/config'

const axiosInstance = axios.create({
  baseURL: BASE_URL,
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

    return response.data;
  } catch (error) {
    console.error('Error:', error.response || error.request || error.message);

    if (error.response) {
      console.log(error.response)
      if (token && error.response.data.data === "Invalid Token") {
        alert("your connection has timed out. please login again")
        logout();
        return;
      }
      else {
        throw {
          status: error.response.status,
          data: error.response.data,
        };
      }
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