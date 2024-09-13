// import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config({ path: './.env' });

// console.log('Aaya');
// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL,  // Add the API URL in .env
// });

// // Log the baseURL
// console.log('Base URL:', API.defaults.baseURL);

// // Optionally add request interceptors to add authorization token to requests
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;
// Assuming there's an api object or function
const api = {
  // ... api methods
};

export default api;