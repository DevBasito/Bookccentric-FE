import React from "react";
import './Footer.css';


const Footer = () => {


    return (
        <div id="footer" className="p-3 bg-brown2 mt-3">
                <div className="row ">
                    

                    <div className="col-lg">
                        Copyright © 2023 Bookccentric | Powered By <a href="https://www.devbasito.netlify.app" target="_blank" className="text-decoration-none text-brown">DevBasito</a>
                    </div>

                    <div className="social-links col-lg">
                        <a href="https://www.twitter.com/baxx_v" target="_blank" className="twitter"><i className="	fab fa-twitter"></i></a>
                        <a href="https://instagram.com/the.baxx" target="_blank" className="instagram"><i className="fab fa-instagram"></i></a>
                        <a href="https://github.com/DevBasito" target="_blank" className="github"><i className="fab fa-github"></i></a>
                        <a href="https://www.linkedin.com/in/basit-aderinwale-a792b414b/" target="_blank" ><i
                            className="fab fa-linkedin"></i></a>
                        <a href="https://wa.me/2348179586771" className="whatsapp" target="_blank"><i className="fab fa-whatsapp"></i></a>
                    </div>




                </div>

          

        </div>
    )

}

export default Footer;