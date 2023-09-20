import React from "react";
import './Subscribe.css';


const Subscribe = () => {


    return (
        <div id="subscribe">


            <div className="text-center mx-auto p-5">
                <h1>Be The First To Know</h1>
                <p>Lectus amet scelerisque fusce est venenatis, eget enim dolor amet vitae pharetra</p>
                <div>
                    <form>
                        <div className="row mx-auto ">
                            <div className="col-8">
                                <div className="col-lg-6 float-end">
                                    <input type="text" className="form-control  " placeholder="Enter email" name="email" />
                                </div>

                            </div>
                            <div className="col-4">
                                <button className="btn bg-brown text-white float-start">Subscribe</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>


        </div>
    )

}

export default Subscribe;