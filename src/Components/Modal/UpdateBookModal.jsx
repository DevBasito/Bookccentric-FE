import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { json, useNavigate } from "react-router-dom";


const UpdateBookModal = (  ) => {

  const { user } = useSelector(state => state.user);
  const { bookById } = useSelector(state => state.books);
  const { VITE_API_URI} = import.meta.env;
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

   
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [available_yn, setAvailable_yn] = useState(" ");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{
    
    setId(bookById._id);
    setTitle(bookById.title);
    setCategory(bookById.category);
    setAuthor(bookById.author);
    setImageUrl(bookById.imageUrl);
    setDescription(bookById.description);
    setPrice(bookById.price);
    setAvailable_yn(bookById.available_yn)

    
  }, [bookById])

  const close = () => {
    setTitle("");
    setCategory("");
    setAuthor("");
    setImageUrl("");
    setDescription("");
    setPrice("");
    setAvailable_yn("")
    cancelSuccessMsg() 
    navigate('/admin');
    location.reload();
  } 
  

  const cancelSuccessMsg = () => {
    setMessage(null);
    setError(null);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateBook = {id, title, category, author, imageUrl, description, price, available_yn };
  
    const response = await fetch(`${VITE_API_URI}/books/update`, {
      method: 'PUT',
      body: JSON.stringify(updateBook),
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
      
    }


  }
 


  return (
    <>
      <div className="modal fade" id="updateBookModal" >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="text-center  p-3 h4">EDIT BOOK</div>


            <div className="modal-body ">
              {message &&
                <div className="w-50 text-white p-3 float-end bg-success mb-3">
                  <i className="fa fa-close btn text-white" onClick={cancelSuccessMsg}></i>
                  {message}
                </div>
              }

              {error &&
                <div className="w-50 text-white p-3 float-end bg-danger mb-3">
                  <i className="fa fa-close btn text-white" onClick={cancelSuccessMsg}></i>
                  {error}
                </div>
              }



              <form onSubmit={handleSubmit}>
              <div className="my-3  ">
                  <input type="text" className="form-control" id="id" placeholder="ID" name="id" defaultValue={bookById._id} onChange={(e) =>
                    setId(e.target.value)} on readOnly={true} />
                </div>
                <div className="my-3  ">
                  <input type="text" className="form-control" id="title" placeholder="Book Title" name="title" defaultValue={bookById.title} onChange={(e) =>
                    setTitle(e.target.value)}  required />
                </div>
                <div className="my-3 ">
                  <input type="text" className="form-control" id="category" placeholder="Book Genre" name="category" defaultValue={bookById.category} onChange={(e) =>
                    setCategory(e.target.value)} required />
                </div>
                <div className="my-3 ">
                  <input type="text" className="form-control" id="author" placeholder="Book Author" name="author" defaultValue={bookById.author} onChange={(e) =>
                    setAuthor(e.target.value)} required />
                </div>
                <div className="my-3">
                  <input type="text" className="form-control" id="imageUrl" placeholder="Image URL" name="imageUrl"  defaultValue={bookById.imageUrl} onChange={(e) =>
                    setImageUrl(e.target.value)} required />
                </div>
                <div className="my-3 ">
                  <input type="text" className="form-control" id="description" placeholder="Book Description" name="description" defaultValue={bookById.description}   onChange={(e) =>
                    setDescription(e.target.value)} required />
                </div>
                <div className="my-3 ">
                  <input type="number" className="form-control" id="price" placeholder="Price (N)" name="price"  defaultValue={bookById.price} onChange={(e) =>
                    setPrice(e.target.value)} required />
                </div>
                <div className="form-check form-switch ">
                  <label className="form-check-label" htmlFor="available_yn">Available</label>
                  <input className="form-check-input form-control " type="checkbox" id="available_yn" name="available_yn" defaultChecked={bookById.available_yn} onClick={(e) =>
                    setAvailable_yn(e.target.checked)}/>
                </div>

                <button type="submit" className="btn bg-brown text-white btn-lg">Update</button>

              </form>


            </div>


            <div className="modal-footer">
            <button className="btn text-brown text-large" data-bs-dismiss="modal" onClick={close}>
              <i className="fas fa-angle-double-left text-brown"></i>  Back
                </button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default UpdateBookModal;