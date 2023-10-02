import React from "react";
import './Home.css';
import Header from "../Header/Header";
import images from "../../assets/images";
import Subscribe from "../Subscribe/Subscribe";
import { useNavigate } from "react-router-dom";



const About = () => {
    const navigate = useNavigate();

    return (
        <>
            <div id="about" className="mt-5" >

                <div className="container row">
                    <div className="col-sm-12 col-md-6">
                        <img src={images.Read} className="img-fluid" alt="" />
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <h1 className="text-brown">Welcome to Bookccentric</h1>

                        <p><em>The Ultimate Destination for Bookccentrics Accross All Genres</em></p>

                        <p>At Bookccentric, we're passionate about books and believe that everyone should have access to a world of knowledge and imagination. Our journey began with a simple love for stories and a vision to create a space where readers can explore, discover, and connect with their favorite authors and genres.</p>

                        <h2 className="text-brown">Our Mission</h2>

                        <p>We are dedicated to providing a curated collection of e-books that cater to a diverse range of interests and tastes. From classic literature to contemporary bestsellers, we aim to be your go-to destination for quality digital reading experiences.
                            Hand Picked Book to your Door.
                        </p>

                        <h2 className="text-brown">Our Story</h2>

                        <p>Established in 2023,Bookccentric was born out of a shared love for books. As avid readers ourselves, we understand the joy of getting lost in a captivating story and the importance of easy access to knowledge. This drove us to create a platform that not only offers a wide selection of e-books but also fosters a sense of community among fellow book enthusiasts.</p>

                        <h2 className="text-brown">Our Values</h2>

                        <ul>
                            <li><strong>Diversity:</strong> We celebrate a wide range of voices and perspectives in literature.</li>
                            <li><strong>Quality:</strong> Every book in our collection is carefully selected for its content and presentation.</li>
                            <li><strong>Accessibility:</strong> We strive to make reading accessible to all, with features for various devices and formats.</li>
                        </ul>

                        <h2 className="text-brown">Author and Publisher Partnerships</h2>

                        <p>We take pride in our collaborations with authors and publishers who share our dedication to delivering exceptional reading experiences. Through these partnerships, we aim to support and promote the literary community.</p>

                        <h2 className="text-brown">Customer Support</h2>

                        <p>Your satisfaction is our priority. If you have any questions, concerns, or simply want to share your thoughts, feel free to reach out to us at <a href="mailto:vampbaxx@gmail.com">vampbaxx@gmail.com</a>.</p>

                        <p>Thank you for being a part of our journey. Together, let's embark on countless literary adventures!</p>

                    </div>

                </div>



                <Subscribe />

            </div>
        </>
    )

}

export default About