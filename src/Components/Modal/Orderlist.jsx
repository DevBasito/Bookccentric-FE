import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const Orderlist = () => {
    const { user } = useSelector(state => state.user);
    const { VITE_API_URI} = import.meta.env;
    const [orders, setOrders] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {

        const fetchOrders = async () => {
            const response = await fetch(`${VITE_API_URI}/books/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                },
                credentials: 'same-origin',

            });
            const data = await response.json();
            setOrders(data);




        }
        fetchOrders()
    }, [])



    return (
        <>
            <div className="" id="Ordersmodal">

                <div className="text-center  p-3 h4">List of Orders</div>




                <div className="container-fluid mx-auto table-responsive" id="tablediv">
                    <table className="table table-bordered table-striped table-hover table-responsive ">
                        <thead className="bg-brown text-white">
                            <tr className="" >

                                <th>Products</th>
                                <th>Quantity</th>
                                <th>Order Reference</th>
                                <th>Total Amount</th>
                                <th>Payment</th>
                                <th>Email</th>
                                <th>Fullname</th>
                                <th>Phone Number</th>                             
                                <th>Address</th>
                                <th>Delivered?</th>
                                <th>Placement Date</th>

                            </tr>
                        </thead>
                        <tbody>

                            {orders && orders.map((order) => (

                                <tr className="" key={order._id}>

                               

                                    <td>{order.products}</td>
                                    <td>{order.quantity}</td>
                                    <td>{order.order_ref}</td>
                                    <td>{order.amount}</td>                                    
                                    {order.payment_yn ?
                                        <td>Yes</td> :
                                        <td>No</td>
                                    }
                                    <td>{order.email}</td>
                                    <td>{order.fullname}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.address}</td>
                                    {order.is_delivered ?
                                        <td>Yes</td> :
                                        <td>No</td>
                                    }
                                    <td>{order.createdAt} </td>


                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>



            </div>


        </>
    )


}

export default Orderlist;