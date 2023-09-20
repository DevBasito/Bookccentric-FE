import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const NewBookModal = () => {

  const { user } = useSelector(state => state.user);
  const { VITE_API_URI} = import.meta.env;
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const clearState = () => {
    setTitle("");
    setCategory('');
    setAuthor('');
    setImageUrl('');
    setDescription('');
    setPrice('');
  }

  const close = () => {
    setMessage(null);
    setError(null);
    clearState();
    navigate('/admin');
    location.reload();
  }  

 

  const cancelSuccessMsg = () => {
    setMessage(null);
    setError(null);
  }

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


  return (
    <>
      <div className="modal fade" id="myNewBookModal">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="text-center  p-3 h4">NEW BOOK</div>


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
                  <input type="text" className="form-control" id="title" placeholder="Book Title" name="title" onChange={(e) =>
                    setTitle(e.target.value)} value={title} required />
                </div>
                <div className="my-3 ">
                  <input type="text" className="form-control" id="category" placeholder="Book Genre" name="category" onChange={(e) =>
                    setCategory(e.target.value)} value={category} required />
                </div>
                <div className="my-3 ">
                  <input type="text" className="form-control" id="author" placeholder="Book Author" name="author" onChange={(e) =>
                    setAuthor(e.target.value)} value={author} required />
                </div>
                <div className="my-3">
                  <input type="text" className="form-control" id="imageUrl" placeholder="Image URL" name="imageUrl" onChange={(e) =>
                    setImageUrl(e.target.value)} value={imageUrl} required />
                </div>
                <div className="my-3 ">
                  <input type="text" className="form-control" id="description" placeholder="Book Description" name="description" onChange={(e) =>
                    setDescription(e.target.value)} value={description} required />
                </div>
                <div className="my-3 ">
                  <input type="number" className="form-control" id="price" placeholder="Price (N)" name="price" onChange={(e) =>
                    setPrice(e.target.value)} value={price} required />
                </div>

                <button type="submit" className="btn bg-brown text-white btn-lg">Submit</button>

              </form>


            </div>


            <div className="modal-footer">
              <button className="btn btn-danger" data-bs-dismiss="modal" onClick={close}>Close</button>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
export default NewBookModal;