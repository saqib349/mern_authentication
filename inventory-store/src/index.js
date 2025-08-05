import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from 'easy-peasy';
import store from './store';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <StoreProvider store={store}>
      <BrowserRouter>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>,
      </BrowserRouter>
   </StoreProvider>
  </React.StrictMode>
);


