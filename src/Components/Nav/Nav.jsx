import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import './Nav.css';
import images from "../../assets/images";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cart from "../Modal/Cart";





const Nav = () => {
  const { user } = useSelector(state => state.user);
  const { cartNo } = useSelector(state => state.cart);

  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/admin");
    location.reload()
  }

  useEffect(()=>{
    let badge_sm = document.getElementById("badge-sm");
    let badge_lg = document.getElementById("badge-lg");

    if (cartNo === 0) {
      badge_sm.style.display = "none"
      badge_lg.style.display = "none"
    }
    else{
      badge_sm.style.display = "inline-block"
      badge_lg.style.display = "inline-block"
    }
    
  })



  return (
    <>
      <div id="nav">

        <div className="navbar navbar-dark bg-brown2 d-sm-none row ">



          {/* Nav For mobile */}

          <div className="col-2">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent"
              aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div className="col-4">

            <img src={images.Bookccentric} alt="Logo" className="img-fluid" />
          </div>

          <div className="col-3">
            <img src={images.Cart} alt="" data-bs-toggle="modal" data-bs-target="#cart"/>
            <span className="position-absolute top-5 translate-middle badge rounded-pill bg-light text-dark " id="badge-sm">{cartNo}</span>
          </div>
        </div>


{/* Nav For Desktop */}

        <nav className="navbar navbar-expand-sm bg-brown2 " id="navbarToggleExternalContent">
          <div className="col-4  text-light d-none d-sm-flex" >
            <img src={images.Bookccentric} alt="Logo" className="img-fluid" />
          </div>
          <div className="container-fluid text-center col-12  col-sm-4 collapse justify-content-center" >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white " to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/books">Library</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/about">About</Link>
              </li>
             

            </ul>
          </div>

          {
            <div className="container-fluid text-white col-12 col-sm-4 text-white justify-content-end px-5 d-none d-sm-flex">
              <ul className="navbar-nav">
                <li className="nav-item me-3 align-self-center" id="cartcounter" data-bs-toggle="modal" data-bs-target="#cart">
                  <img src={images.Cart} alt="" />
                  <span className="position-absolute top-5 translate-middle badge rounded-pill bg-light text-dark " id="badge-lg">{cartNo}</span>
                </li>
                {!user ?
                  (<li className="nav-item">
                    <Link className="nav-link text-white  me-3" to="/login">Admin</Link>
                  </li>)
                  :
                  (<>
                    <li className="nav-item">
                      <Link className="nav-link text-white me-3" to="/admin"><i className="fa fa-user"></i> {user.user.email} </Link>
                    </li>
                    <li>
                      <button className="btn bg-brown text-white " onClick={logout}>LogOut</button>
                    </li>
                  </>
                  )
                }
              </ul>
            </div>

          }

        </nav>








      </div>

      <Cart/>
    </>
  )
}

export default Nav;