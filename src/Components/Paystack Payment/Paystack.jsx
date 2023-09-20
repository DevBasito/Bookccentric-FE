import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./paystack.css"

const Paystack = () => {
    const [timer, setTimer] = useState(0);
    const [pmtstatus, setPmtstatus ] = useState("");
    const { paystack, pmtdetails  } = useSelector(state => state.payment);
    const { cartProducts, cartQtys } = useSelector(state => state.cart);
    const {VITE_API_URI, VITE_BASE_URI, VITE_PSTK_SECRET_KEY, VITE_PSTK_PUBLIC_KEY } = import.meta.env
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const counter = setInterval(()=>{setTimer(timer+1)}, 30000);


    
    useEffect(() => {

        const verifyPayment = async () => {
            const response = await fetch(`https://api.paystack.co/transaction/verify/${paystack.data.reference}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${VITE_PSTK_SECRET_KEY}`
                },
            })

            const data = await response.json();
            setPmtstatus(data.data.status)

            if (pmtstatus == "success") {                
                const neworder = {fullname: pmtdetails.fullname,
                    email: pmtdetails.email,
                    address: pmtdetails.address,
                    amount: pmtdetails.amount,
                    phone: pmtdetails.phone,
                    order_ref: paystack.data.reference,
                    products: cartProducts,
                    quantity: cartQtys,
                    payment_yn: true,
                }
                               
                const response2 = await fetch(`${VITE_API_URI}/books/neworder`, {
                  method: 'POST',
                  body: JSON.stringify(neworder),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                })
            
                const data2 = await response2.json();
            
                if (data2.order == "placed") {
                    
                    window.location.href = `${VITE_BASE_URI}/success`
                }

                     
              
                 

            } else {
              return ("Payment Failed")  
            }
            


        }
        verifyPayment()



    }, [counter])

    return (
        <>
            <div className="text-center w-75 mx-auto" id="frame">
                <div className="py-3" >
                    Do not Refresh or Close this page while payment is being processed. 
                    <br/>
                    You will be redirected when payment is Successful

                </div>
                <object id="obj" data={paystack.data.authorization_url} > </object>
              
            </div>
        </>
    )
}

export default Paystack; 