import axios from 'axios';
import {API_KEY, API_URL} from './constants';

export const fetchNews = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        apiKey: API_KEY,
        page,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top headlines:', error);
    throw error;
  }
};
