import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, subCartNo, setCartTotal, setCartProducts, setCartQtys } from "../../../Redux/cart";
import { useNavigate } from "react-router-dom";


const Cart = () => {

  const { cartItems, cartTotal} = useSelector(state => state.cart);
  const { VITE_API_URI} = import.meta.env;
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newbook = { title, category, author, imageUrl, description, price };
    const response = await fetch(`${VITE_API_URI}/books/create`, {
      method: 'POST',
      body: JSON.stringify(newbook),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': user.token
      }
    })

    const data = await response.json();

    if (!response.ok) {

      setError(data.message)

    }
    else if (response.ok) {
      setMessage(data.message)
      clearState();
    }

  }

  useEffect(() => {
    let totalAmount = 0
    let products = ""
    let quantity = ""
    cartItems.forEach(cartItem => {
      totalAmount += cartItem.subtotal;
      products += `${cartItem.title} ~ `
      quantity += `${cartItem.quantity} ~ `
    })

    dispatch(setCartTotal(totalAmount))
    dispatch(setCartProducts(products))
    dispatch(setCartQtys(quantity))

  }, [cartItems])


  return (
    <>
      <div className="modal fade" id="cart">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <p className="text-center h5">CART</p>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body ">
              {cartItems.length !== 0 ?
                (<>
                  <div className="container-fluid mx-auto table-responsive" id="tablediv">
                    <table className="table table-hover table-responsive ">
                      <thead className="bg-brown text-white">
                        <tr>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>SubTotal </th>
                          <th></th>

                        </tr>
                      </thead>
                      <tbody>

                        {cartItems && cartItems.map((cartItem) => (

                          <tr className="" key={cartItem.id}>
                            <td>{cartItem.title}</td>
                            <td>N{cartItem.price}</td>
                            <td>{cartItem.quantity}</td>
                            <td>N{cartItem.subtotal}</td>
                            <td>
                              <i className="fa fa-close text-danger"
                                onClick={() => {
                                  dispatch(removeItem(cartItem.id))
                                  dispatch(subCartNo(cartItem.quantity))
                                }}>
                              </i>
                            </td>
                          </tr>

                        ))}
                      </tbody>
                    </table>
                    <div className="text-end h5">
                      Total : N{cartTotal}
                    </div>

                  </div>
                </>
                )

                :

                (
                  <div className="text-center">
                    Cart is Empty <i className="fa fa-shopping-cart"></i>
                  </div>
                )

              }

            </div>


            <div className="modal-footer">
              {cartItems.length !== 0 ?
                (<button className="btn bg-brown text-white" data-bs-dismiss="modal"
                  onClick={() => { navigate("/checkout") }}>Checkout <i className="	fas fa-shopping-cart"></i>
                </button>
                ) : (<></>)
              }
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default Cart;