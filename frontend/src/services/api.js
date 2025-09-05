import axios from 'axios';

// Remove '/books' from the base URL - just use the API root
// Make sure this is exactly like this - no trailing slashes
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://book-explorer-cyki.onrender.com/api';
console.log('API_BASE_URL:', API_BASE_URL); // Add this line to debug

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchBooks = async (params = {}) => {
  try {
    const response = await api.get('/books', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const fetchBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

export const refreshBooks = async () => {
  try {
    const response = await api.post('/refresh');
    return response.data;
  } catch (error) {
    console.error('Error refreshing books:', error);
    throw error;
  }
};

export default api;
