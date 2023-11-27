import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import {
  BrowserRouter,

}
  from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Header />
    <App />
    <Footer />
  </BrowserRouter>


);


reportWebVitals();
