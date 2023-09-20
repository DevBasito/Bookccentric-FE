import React, { useEffect, useState } from "react";
import './Booklist.css';
import { useDispatch, useSelector } from "react-redux";
import { setData, setBookById,fetchBooks } from "../../../Redux/Books";
import { useNavigate } from "react-router-dom";    
import NewBookModal from "../Modal/NewBookModal";





const Booklist = () => {
    const { user } = useSelector(state => state.user);
    const { books } = useSelector(state => state.books);
    const { VITE_API_URI} = import.meta.env;
    const dispatch = useDispatch();
    const navigate = useNavigate();




    useEffect(() => {

        const fetchedbooks = async () => {
            const response = await fetch(`${VITE_API_URI}/books/allbooks`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': user.token
                },
                credentials: 'same-origin',

            });
            const data = await response.json();
            dispatch(setData(data));    
           



        }
        fetchedbooks()
    }, [])
   

    return (
        <>
            <div id="books" className="">
                <div className="container-fluid d-flex flex-direction-row justify-content-between w-100 mb-2 px-5">
                    <div className="h3">List of Books</div>
                    <div>
                    <button className="btn bg-brown text-white mx-3" onClick={()=>{navigate("/orders")}}>
                            Order List <i className="fa fa-file"></i>
                        </button>

                        <button className="btn bg-brown text-white mx-3" data-bs-toggle="modal" data-bs-target="#myNewBookModal">
                            New Book <i className="fa fa-plus"></i>
                        </button>
                    </div>

                </div>

                <div className="container-fluid mx-auto table-responsive" id="tablediv">
                    <table className="table table-bordered table-striped table-hover table-responsive ">
                        <thead className="bg-brown text-white">
                            <tr className="" >
                                <th> &nbsp; </th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Author</th>
                                <th>Image Thumbnail</th>
                                <th>Price (N)</th>
                                <th>Sales Count</th>
                                <th>Available</th>

                            </tr>
                        </thead>
                        <tbody>

                            {books && books.map((book) => (

                                <tr className="" key={book._id}>
                                    
                                    <td>
                                        <i className="fa fa-edit btn" data-bs-toggle="modal" data-bs-target="#updateBookModal" onClick={() => { dispatch(setBookById(book)) }}></i>
                                    </td>
                                    
                                    <td>{book.title}</td>
                                    <td>{book.description}</td>
                                    <td>{book.category}</td>
                                    <td>{book.author}</td>
                                    <td>{book.imageUrl}</td>
                                    <td>{book.price}</td>
                                    <td>{book.purchaseCount}</td>
                                    {book.available_yn ?
                                        <td>Yes</td> :
                                        <td>No</td>
                                    }

                                </tr>

                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


            <NewBookModal />
            
           

        </>
    )

}

export default Booklist;