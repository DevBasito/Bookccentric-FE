import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../../Redux/cart";
import { resetPayment } from "../../../Redux/Payment";
import images from "../../assets/images";
import "./paystack.css";


const Success = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(resetCart);
        dispatch(resetPayment);
    })


    return (
        <>
            <div className="text-center w-75 mx-auto my-auto p-5" id="success">
                <img src={images.Success} className="img-fluid h-50" />
                <h3 className="pt-3">Payment Successful</h3>
                <br />
                <h3>Your Order have been placed succesfully.
                    A mail will be sent to you and our customer rep will contact you soon
                </h3>
                <br />
                <h3>Thanks for your Patronage</h3>
                <div className="m-5 ">
                    <button className="btn bg-brown text-white btn-lg " onClick={() => { navigate('/books') }}>Explore more books</button>
                </div>
            </div>
        </>
    )
}

export default Success; 