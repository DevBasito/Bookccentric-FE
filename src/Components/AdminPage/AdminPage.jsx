import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './AdminPage.css';
import { useDispatch, useSelector } from "react-redux";
import Booklist from "../Booklist/Booklist";
import UpdateBookModal from "../Modal/UpdateBookModal";



const AdminPage = () => {
    const { user } = useSelector(state => state.user);
    const { VITE_API_URI} = import.meta.env;
    const navigate = useNavigate();


    const logout = () => {
        navigate("/login")
    }

    useEffect(() => {
        const getLoggedInUser = async () => {

            // const user = {firstname, lastname, email}
            const response = await fetch(`${VITE_API_URI}signin`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                },
                credentials: 'same-origin',

            })

            const data = await response.json();

            if (!response.ok) {

                alert(data.message + ". Session has ended, Kindly Log in Again");
                window.sessionStorage.clear();
                location.reload();


            }
            // else if (response.ok) {
            //             
            // }

        }
        getLoggedInUser()
    }, [])

    return (
        <div id="AdminPage">


            <div className="container-fluid row p-2 w-100  text-dark h3">
                <div className="col text-center"> Hello, {user.user.firstname} {user.user.lastname}</div>

            </div>



            <Booklist />
            <UpdateBookModal />



        </div>
    )

}

export default AdminPage;