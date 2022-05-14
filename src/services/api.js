import axios from 'axios';

const api = axios.create({
  baseURL:
    'https://www.googleapis.com/books/v1/volumes?key=AIzaSyDEwkxVOINEaydVUIQckN3b1o5tTWL7wBs',
});

export default api;

// fetch(`https://www.googleapis.com/books/v1/volumes?q=search-terms&key=your-API-key)
// q=search-terms&
