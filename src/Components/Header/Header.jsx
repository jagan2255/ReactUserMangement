import React from 'react';
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';




function Header() {

    var navigate = useNavigate();

    var token = localStorage.getItem("token")
    var name = localStorage.getItem("username")

    const userdata = useSelector((state) => state.userData);
    console.log({ userdata: userdata })

    const logoutuser = () => {
        localStorage.clear()
        window.location.replace("/")
    }

    const loginuser = () => {
        navigate("/login")
    }
    const logout = () => {
        navigate("/signup")
    }



    const home = () => {

    }


    return (

        <div>
            <div className='headermain'>
                <div className='homechild mt-2'><h2>OfferPedia</h2></div>
                {token ?
                    <div className='d-flex mt-2'>
                        <div onClick={home}>
                            <img className='qsdrf dropdown-toggle' id="dropdownMenuButton1" data-bs-toggle="dropdown" src="data:image/png;base64,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" alt="" />
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><div class="dropdown-item"><b>{name.charAt(0).toUpperCase() + name.slice(1)}</b></div></li>
                                <li><Link class="dropdown-item" to="/">Home</Link></li>
                                <li><Link class="dropdown-item" to="/restpassword">Reset Password</Link></li>
                            </ul>
                        </div>
                        <div className='mx-5 me-5'><button onClick={() => { logoutuser() }} className='btn btn-danger  btn-borderd'>Logout</button></div>
                    </div> :
                    <div className='d-flex mt-2'>
                        <div className='mx-1'><button onClick={loginuser} className='btn btn-primary  btn-borderd'>Login</button></div>
                        <div className='mx-3 me-5'><button onClick={logout} className='btn btn-primary  btn-borderd'>SignUp</button></div>
                    </div>}


            </div>


        </div>
    )
}

export default Header