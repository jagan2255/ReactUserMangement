import React, { useState } from 'react'
import '../Login/Login.css';
import { useNavigate } from "react-router-dom";
import { apiurl } from '../Apiconfig/Apiconfig';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';




function Signup() {
    const history = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [signupError, setSignupError] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [termsError, setTermsError] = useState('')

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
        setSignupError('')
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
        setSignupError('')
    };

    const handleuserNameChange = (e) => {
        setUsername(e.target.value);
        setUsernameError('');
        setSignupError('')
    };

    const handleTermConditionChange = (e) => {
        setIsChecked(e.target.checked);
        setSignupError('');
    }


    //Handle for Signup User
    const signup = async (e) => {
        e.preventDefault()

        // Validate Email
        if (!(email.trim())) {
            setEmailError('Please enter your email.');
            return;
        }

        // Validate UserName
        if (!username) {
            setUsernameError('Please enter your UserName.');
            return;
        }

        //Validate Password
        if (!password) {
            setPasswordError('Please enter your Password.');
            return;
        }

        //Validate Terms and Condition
        if (!isChecked) {
            setTermsError('Please accept the Terms and Conditions.');
            return;

        }

        //Saving User Details to Backend
        var response = await axios.post(`${apiurl}/auth/register/`, {
            username: email,
            password: password,
            name: username
        })
            .then((res) => {
                console.log(res)

                if (res?.data?.id) {
                    toast.success('User Created Successfully')
                    navigate("/login")

                } else {
                    setSignupError("Error During SignUp")
                }


            })
            .catch((err) => {
                console.log(err)
                setSignupError(err?.response?.data?.errors)
            });
    }



    return (
        <div className='d-flex justify-content-center align-item-center bbb signupqaz'>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='sss'>
                <form className='forms123' onSubmit={signup}>

                    <div className="mb-3 text-center">
                        <img src="https://play-lh.googleusercontent.com/RBORuxkUpyXw8AJb81rA9o6PN_YviwBGgOJOpHsCmbe3p7xOHP7tTWpj4Z5HUBNC6eg" width="60px" alt="" /><br />
                    </div>

                    {signupError && <div className="text-danger text-center">{signupError}</div>}


                    <div className="mb-3 mt-5">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" value={email} name="email" onChange={(e) => handleEmailChange(e)} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        {emailError && <div className="text-danger">{emailError}</div>}

                    </div>

                    <div className="mb-3">
                        <label className="form-label">User Name</label>
                        <input type="text" value={username} name="username" onChange={(e) => handleuserNameChange(e)} className="form-control" />
                        {usernameError && <div className="text-danger">{usernameError}</div>}

                    </div>


                    <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" value={password} name="password" onChange={(e) => handlePasswordChange(e)} className="form-control" id="exampleInputPassword1" />
                        {passwordError && <div className="text-danger">{passwordError}</div>}

                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" onChange={(e) => handleTermConditionChange(e)} className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Terms and Conditions</label>
                        {termsError && <div className="text-danger">{termsError}</div>}

                    </div>
                    <div className='d-grid'>
                        <button type="submit" className="btn btn-primary">SignUp</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup