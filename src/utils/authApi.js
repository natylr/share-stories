import  apiService  from './apiService';

export const registerUserApi = async (
    fname,
    lname,
    email,
    password,
    address, // New field for address
    city, // New field for city
    phone // New field for phone
  ) => {
    try {
      const response = await apiService(
        "http://localhost:5000/user/register",
        "POST",
        {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        JSON.stringify( {
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
      console.error("Error registering user:", error);
      throw error;
    }
  };
  

export const loginUserApi = async (email, password) => {
    try {
      const response = await apiService('http://localhost:5000/user/login-user', 'POST', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }, JSON.stringify({
        email,
        password,
      }));
  
      return response;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };
  
  export const getUserDataApi = async (token) => {
    try {
      const response = await apiService('http://localhost:5000/user/user-data', 'POST', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }, 
        JSON.stringify({token}),
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
        `http://localhost:5000/user/update-profile`, // Adjust the endpoint
        "PUT", // Use PUT or PATCH method for updating resources
        {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        {
          token,
          fname,
          lname,
          address,
          city,
          phone,
        }
      );
  
      return response;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };
import  apiService  from './apiService';

export const registerUserApi = async (
    fname,
    lname,
    email,
    password,
    address, // New field for address
    city, // New field for city
    phone // New field for phone
  ) => {
    try {
      const response = await apiService(
        "http://localhost:5000/user/register",
        "POST",
        {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        JSON.stringify( {
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
      console.error("Error registering user:", error);
      throw error;
    }
  };
  

export const loginUserApi = async (email, password) => {
    try {
      const response = await apiService('http://localhost:5000/user/login-user', 'POST', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }, JSON.stringify({
        email,
        password,
      }));
  
      return response;
    } catch (error) {
      console.error('Error logging in user:', error);
      throw error;
    }
  };
  
  export const getUserDataApi = async (token) => {
    try {
      const response = await apiService('http://localhost:5000/user/user-data', 'POST', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }, 
        JSON.stringify({token}),
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
        `http://localhost:5000/user/update-profile`, // Adjust the endpoint
        "PUT", // Use PUT or PATCH method for updating resources
        {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        {
          token,
          fname,
          lname,
          address,
          city,
          phone,
        }
      );
  
      return response;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  export const changePasswordApi = async (token, prevPassword, newPassword) => {
    try {
      const response = await apiService(
        'http://localhost:5000/user/change-password',
        'POST',
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        {
          token,
          prevPassword,
          newPassword,
        }
      );
  
      return response;
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };
