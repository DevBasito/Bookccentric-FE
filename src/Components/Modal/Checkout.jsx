import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPaystack, setPmtdetails } from "../../../Redux/Payment";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"


const Checkout = () => {


  const { cartTotal, cartProducts, cartQtys } = useSelector(state => state.cart)

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { VITE_API_URI, VITE_PSTK_SECRET_KEY, VITE_PSTK_PUBLIC_KEY } = import.meta.env

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAmount(cartTotal)
  })


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newpayment = {
      email: email,
      phone: phone,
      fullname: fullname,
      reference: "Ord_" + Date.now(),
      amount: amount * 100,
      currency: "NGN",
      address: address,
      channels: ["Card"]

    }
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${VITE_PSTK_SECRET_KEY}`
      },
      body: JSON.stringify(newpayment),
    })

    const data = await response.json()
    if (data.status && data.data.authorization_url) {
      dispatch(setPaystack(data))
      dispatch(setPmtdetails(newpayment))      
      navigate("/paystack");
      
      
      
    } else {
      setError(data.message)

    }




  }

  return (
    <>
      <div id="form" className="container  mx-auto col-lg-6 p-5 bg-white rounded-3 mt-5">

        {error &&
          <div className="w-50 text-white p-3 float-end bg-danger mb-3">
            <i className="fa fa-close btn text-white" onClick={() => { setError(null) }}></i>
            {error}
          </div>
        }

        <div className="h5 text-center text-brown">
          Kindly Fill in your Details
        </div>



        <form onSubmit={handleSubmit}>
          <div className="mb-3 mt-3">
            <label htmlFor="fullname">FullName:</label>
            <input type="text" className="form-control" id="fullname" name="fullname" onChange={(e) =>
              setFullname(e.target.value)}
            />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="email">Email</label>
            <input type="email" className="form-control" id="email" name="email" onChange={(e) =>
              setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="phone">Phone Number</label>
            <input type="text" className="form-control" id="phone" name="phone" onChange={(e) =>
              setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="address">Delivery Address</label>
            <textarea className="form-control" rows="3" id="address" name="address" onChange={(e) =>
              setAddress(e.target.value)}>
            </textarea>
          </div>
          <div className="mb-3 mt-3">
            <label htmlFor="amount">Total Amount Payable</label>
            <input type="amount" className="form-control" id="amount" name="Amount" value={`N${cartTotal}`} readOnly={true} />
          </div>
          <div className="text-end mb-3 mt-5">
            <button type="submit" className="btn bg-brown text-white">Proceed to make Payment</button>
          </div>
        </form>
      </div>
    </>
  )

}
export default Checkout;