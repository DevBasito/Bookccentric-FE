import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../../../Redux/User";
import images from "../../assets/images";


const Login = () => {
    const { VITE_API_URI} = import.meta.env;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

  
    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = { email, password }
        const response = await fetch(`${VITE_API_URI}/signin`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        if (!response.ok) {
            setError(data.message)
        }
        else if (response.ok) {
            setError(null);
            setEmail('');
            setPassword('');
            dispatch(setData(data));
            navigate('/admin')
            // alert(data.message)



        }
        

    }

    return (
        <div id="Login" className="p-5 mt-5">


            <div id="form" className="container  mx-auto col-lg-6 p-5 bg-white rounded-3">

                <div className="text-center">
                <img src={images.Logo} className="img-fluid" width="100px"/>
                    <p className="mt-3">Welcome, Kindly Login</p>

                </div>

                <form onSubmit={handleSubmit}>
                    {error &&
                        <div className="bg-danger text-white mt-3 p-3">
                            {error}
                        </div>
                    }
                    <div className="mb-3 mt-3">
                        <label htmlFor="email">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={(e) =>
                            setEmail(e.target.value)} 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pwd">Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="pswd" onChange={(e) =>
                            setPassword(e.target.value)} 
                        />
                    </div>
                    <div className="form-check mb-3">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" name="remember" /> Remember me
                        </label>
                    </div>
                    <button type="submit" className="btn bg-brown text-white btn-lg">Submit</button>

                </form>
            </div>

        </div>
    )

}

export default Login;