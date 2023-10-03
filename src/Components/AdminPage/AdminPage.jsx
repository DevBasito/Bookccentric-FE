import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './AdminPage.css';
import { useDispatch, useSelector } from "react-redux";
import Booklist from "../Booklist/Booklist";
import UpdateBookModal from "../Modal/UpdateBookModal";
import { setDashboardData } from "../../../Redux/User";



const AdminPage = () => {
    const { user, dashboard } = useSelector(state => state.user);
    const { VITE_API_URI } = import.meta.env;
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const logout = () => {
        navigate("/login")
    }

    useEffect(() => {
        const getLoggedInUser = async () => {

            // const user = {firstname, lastname, email}
            const response = await fetch(`${VITE_API_URI}/signin`, {
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

        const getDashboardData = async () => {
            
            const dashboard = await fetch(`${VITE_API_URI}/books/dashboard`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                },
                credentials: 'same-origin',

            })

            
            const dashboardData = await dashboard.json();
            dispatch(setDashboardData(dashboardData)); 

        }
        getLoggedInUser();
        getDashboardData();
    }, [])

    return (
        <div id="AdminPage" className="mt-5 bg-white">


            <div className="container-fluid row p-2 w-100  text-dark h3 " >
                <div className="col text-center"> Hello, {user.user.firstname} {user.user.lastname}</div>

            </div>

            <div className="container d-flex flex-row justify-content-between my-5" id="cards">


                <div className="card col-lg-3 mx-lg-5 my-3 p-3 bg-brown2 text-center" onClick={()=>{navigate("/orders")}}>
                    <div className="card-body text-white">
                        <h1 className="card-title">{dashboard.TotalOrders}</h1>
                        <h6 className="card-text text-brown">Total Orders</h6>

                        
                    </div>

                </div>


                <div className="card col-lg-3 mx-lg-5 my-3 p-3 bg-brown2 text-center">
                    <div className="card-body text-white">
                        <h1 className="card-title">{dashboard.CountAvailableBooks}</h1>
                        <h6 className="card-text text-brown">Available Books</h6>

                        
                    </div>

                </div>


                <div className="card col-lg-3 mx-lg-5 my-3 p-3 bg-brown2 text-center ">
                    <div className="card-body text-white">
                        <h1 className="card-title">{dashboard.CountBookOffShelf}</h1>
                        <h6 className="card-text text-brown">Books Off Shelf</h6>

                        
                    </div>

                </div>





            </div>


            <Booklist />
            <UpdateBookModal />



        </div>
    )

}

export default AdminPage;