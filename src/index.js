import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    <ToastContainer
      limit={1}
      position="top-center"
      autoClose={2000}
      hideProgressBar
      newestOnTop={true}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="light"
    />
  </Provider>
);
