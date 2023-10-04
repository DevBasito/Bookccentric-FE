import React, { useEffect, useState } from "react";
import './Books.css';
import Header from "../Header/Header";
import Product from "../Product/Product";
import Subscribe from "../Subscribe/Subscribe";
import { useDispatch, useSelector } from "react-redux";
import { setData} from "../../../Redux/Books";


const Books = () => {

    const { books } = useSelector(state => state.books);
    const dispatch = useDispatch();
    const { VITE_API_URI} = import.meta.env
    const [product, setProduct] = useState("");

    useEffect(() => {

        const fetchedbooks = async () => {
            const response = await fetch(`${VITE_API_URI}/books/all`);
            const data = await response.json();
            dispatch(setData(data));


        }
        fetchedbooks()
    }, [])

    return (
        <>
            <Header />
            <div id="books" className="p-3">

                <div className=" container row mx-auto justify-content-center justify-content-md-between ">

                    {books && books.map((book) => (

                        <div className="card col-md-3 mx-3 my-3 p-3 bg-brown2 " key={book._id}>
                            <div >
                                <img className="card-img-top img-fluid" src={book.imageUrl} style={{ width: "100%", height: "25rem" }} />
                            </div>
                            <div className="card-body text-white">
                                <h4 className="card-title">{book.title}</h4>
                                <h6 className="card-text text-brown">{book.category}</h6>
                              
                                <div className="text-center mt-3">
                                    <button  className="btn bg-brown text-white btn-lg px-5 w-100 " data-bs-toggle="modal" data-bs-target="#product" onClick={()=>{setProduct(book)}}>N <span>{book.price}</span></button>
                                </div>
                            </div>

                        </div>

                    ))}


                </div>

            </div>
            <Subscribe />

            <Product product={product}/>
        </>
    )

}

export default Books;