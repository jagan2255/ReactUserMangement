import React, { useEffect, useState } from 'react';
import '../Login/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { apiurl } from '../Apiconfig/Apiconfig';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';




function ResetPassword() {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordError2, setPasswordError2] = useState('');
    const [password1, setPassword1] = useState('');
    const [passwordError1, setPasswordError1] = useState('');


    const navigate = useNavigate();

    var token = localStorage.getItem("token")
    var email1 = localStorage.getItem("email")


    useEffect(() => {
        setEmail(email1)
    }, [token, email1])



    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setEmailError('');
        setLoginError('')
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordError('');
        setLoginError('')
    };

    const handlePasswordChange2 = (e) => {
        setPassword2(e.target.value);
        setPasswordError2('');
        setLoginError('')
    };
    const handlePasswordChange1 = (e) => {
        setPassword1(e.target.value);
        setPasswordError1('');
        setLoginError('')
    };


    var config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const resetpassword = async (e) => {
        e.preventDefault()


        if (!(email.trim())) {
            setEmailError('Please enter your email.');
            return;
        }
        if (!password1) {
            setPasswordError1('Please enter Old Password.');
            return;
        }

        if (!password) {
            setPasswordError('Please enter New Password.');
            return;
        }

        if (!password2) {
            setPasswordError2('Please Re-enter your New Password.');
            return;
        }

        if (password !== password2) {
            setPasswordError2('New Password Mismatch');
            return;
        }



        await axios.post(`${apiurl}/auth/change-password/`, {
            username: email,
            old_password: password1,
            new_password: password
        }, {
            headers: {
                'Authorization': `Token ${token}`
            }
        })
            .then((res) => {

                console.log(res?.data?.token)
                if (res?.data?.message) {
                    toast.success("Password Changed Successfully");
                    setPassword("")
                    setPassword1("")
                    setPassword2("")

                } else {
                    toast.error("Error Try Again")

                }

            })
            .catch((err) => {
                console.log(err.response?.data?.errors)
                setLoginError(err.response?.data?.errors)
            });
    }



    return (
        <div className='d-flex justify-content-center align-item-center bbb qazwsx'>

            <div className='homw11'>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />

                <form className='forms123' onSubmit={resetpassword}>

                    <div className="mb-3 text-center">
                        <img src="https://play-lh.googleusercontent.com/RBORuxkUpyXw8AJb81rA9o6PN_YviwBGgOJOpHsCmbe3p7xOHP7tTWpj4Z5HUBNC6eg" width="60px" alt="" /><br />
                    </div>
                    {loginError && <div className="text-danger text-center">{loginError}</div>}


                    <div className="mb-3 mt-5">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" minLength={8} placeholder="Enter email Address" disabled={token} name="email" value={email} onChange={(e) => handleEmailChange(e)} className="form-control" id="email" />
                        {emailError && <div className="text-danger">{emailError}</div>}
                    </div>

                    {token ? <div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Current Password</label>
                            <input type="password" value={password1} name="password" onChange={(e) => handlePasswordChange1(e)} className="form-control" id="password" />
                            {passwordError1 && <div className="text-danger">{passwordError1}</div>}

                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">New Password</label>
                            <input type="password" value={password} name="password" onChange={(e) => handlePasswordChange(e)} className="form-control" id="password" />
                            {passwordError && <div className="text-danger">{passwordError}</div>}

                        </div>

                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Re-Enter New Password</label>
                            <input type="password" value={password2} name="password" onChange={(e) => handlePasswordChange2(e)} className="form-control" id="password" />
                            {passwordError2 && <div className="text-danger">{passwordError2}</div>}

                        </div>

                    </div> : <div></div>

                    }

                    <div className='d-grid'>
                        <button type="submit" className="btn btn-primary">Reset Password</button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ResetPassword