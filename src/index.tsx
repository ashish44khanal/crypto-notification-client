import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios, { AxiosRequestConfig } from 'axios';
import jwt_decode from 'jwt-decode'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Add a request interceptor
axios.interceptors.request.use(function (req: AxiosRequestConfig<any>) {
  const access_token = localStorage.getItem('crypto')

  if (access_token) {
    const decoded: { exp: number, full_name: string, iat: number, user_id: string } = jwt_decode(access_token)
    if (new Date(decoded.exp * 1000) < new Date()) {
      // handle logout
      localStorage.removeItem('crypto')

    }
    req.headers!.Authorization = `Bearer ${access_token}`
  }
  return req;

}, function (error) {
  return Promise.reject(error);
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
