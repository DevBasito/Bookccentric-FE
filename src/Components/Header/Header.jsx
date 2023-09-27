import React from "react";
import './Header.css';
import images from "../../assets/images";


const Header = () => {


    return (
        <div id="header">

            
            <div className="text-center mx-auto p-5 ">
                <img src={images.Logo} className="img-fluid" width="200rem"/>
                <h1 className="text-brown">Bookccentric</h1>
                <p className="h5 text-brown">The Ultimate Destination for Bookccentrics Accross All Genres</p>
                

            </div>
            
        </div>
    )

}

export default Header;