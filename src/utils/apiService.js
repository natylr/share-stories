import axios from 'axios';

const apiService = async (url, method, headers, body) => {
  try {
    const response = await axios({
      url,
      method,
      headers,
      data: body,
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export default apiService;