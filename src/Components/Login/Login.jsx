import React, { useState } from 'react';
import './Login.css';
import { Link , useNavigate } from 'react-router-dom';
import { apiurl } from '../Apiconfig/Apiconfig';
import axios from 'axios';



function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');


  const navigate = useNavigate();


  //Check Error In Email Field
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
    setLoginError('')
  };

  //Check Error In Password Field
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
    setLoginError('')
  };


  //SignIn Handle
  const signin = async (e) => {
    e.preventDefault()

    // Validate email
    if (!(email.trim())) {
      setEmailError('Please enter your email.');
      return;
    }

    // Validate password
    if (!password) {
      setPasswordError('Please enter your Password.');
      return;
    }

    //Calling LogIn API
    await axios.post(`${apiurl}/auth/login/`, {
      username: email,
      password: password,
    })
      .then((res) => {
        console.log(res)

        //Data Present In DB Execute This
        if (res?.data?.token) {
          var token = res?.data?.token
          var username = res?.data?.name;
          var email = res?.data?.username

          //Save Refresh and Access Token to LocalStoreage
          localStorage.setItem("token", token)
          localStorage.setItem("username", username)
          localStorage.setItem("email",email)
           window.location.replace("/")

          navigate("/")


          //User Data Not Found in DB
        } else {
          setLoginError("Error in Login")
        }
      })
      .catch((err) => {
        console.log(err.response?.data?.errors)
        setLoginError(err.response?.data?.errors)
      });
  }

  return (
    <div className='d-flex justify-content-center align-item-center bbb'>

      <div className='homw11'>

        <form className='forms123' onSubmit={signin}>

          <div className="mb-3 text-center">
            <img src="https://play-lh.googleusercontent.com/RBORuxkUpyXw8AJb81rA9o6PN_YviwBGgOJOpHsCmbe3p7xOHP7tTWpj4Z5HUBNC6eg" width="60px" alt="" /><br />
          </div>
          {loginError && <div className="text-danger text-center">{loginError}</div>}


          <div className="mb-3 mt-5">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" minLength={8} name="email" value={email} onChange={(e) => handleEmailChange(e)} className="form-control" id="email" />
            {emailError && <div className="text-danger">{emailError}</div>}
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" value={password} name="password" onChange={(e) => handlePasswordChange(e)} className="form-control" id="password" />
            {passwordError && <div className="text-danger">{passwordError}</div>}

          </div>
          <div className='d-flex justify-content-around'>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" for="exampleCheck1">Remember me</label>
          </div>
          <div>
          <p><Link to="/forgetpassword">Forget password</Link></p>
          </div>
          </div>
          <div className='d-grid'>
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
          <div className="text-center mt-4">
            <p>Not a member? <Link to="/signup">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login