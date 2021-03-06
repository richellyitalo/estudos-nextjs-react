import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FavoritesContextProvider } from './state/favorites-context';

ReactDOM.render(
  <FavoritesContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </FavoritesContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
