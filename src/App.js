import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate
}
  from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import { useEffect, useState } from 'react';
import Signup from './Components/Signup/Signup';
import Forgetpassword from './Components/ForgetPassword/Forgetpassword';
import Header from './Components/Header/Header';
import ResetPassword from './Components/ForgetPassword/ResetPassword';


function App() {

  var token = localStorage.getItem('token')
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isTokenCheckComplete, setTokenCheckComplete] = useState(false);

  //Check Token is Present or Not
  useEffect(() => {
    const checkToken = async () => {
      console.log('Token:', token);
      setLoggedIn(!!token);
      setTokenCheckComplete(true);
    };

    checkToken();
  }, [token]);;


  //If Token is not present Redirect to Login
  const PrivateRoute = ({ element }) => {
    if (isTokenCheckComplete) {
      return isLoggedIn ? element : <Navigate to="/login" />;
    } else {
      return null;
    }
  };

  const LoginRoute = ({ element }) => {
    if (isTokenCheckComplete) {
      return isLoggedIn ? <Navigate to="/dashboard" /> : element;
    } else {
      return null;
    }
  };

  return (
    <>
      <Routes>

        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path='/restpassword' element={<PrivateRoute element={<ResetPassword />} />} />


        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgetpassword' element={<Forgetpassword />} />
        <Route path='/' element={<LoginRoute element={<Login />} />} />


      </Routes>
    </>
  );
}

export default App;
