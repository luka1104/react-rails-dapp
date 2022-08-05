import React, { useState, useCallback, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { WalletContext } from "../../context/WalletContext";
import { toast } from "react-toastify";

const AddProductMain = () => {
  const { user } = useContext(WalletContext)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState('')

  const createFromData = () => {
    const formData = new FormData()
    formData.append('[name]', name)
    formData.append('[price]', price)
    formData.append('[url]', url)
    formData.append('[description]', description)
    formData.append('[image]', image)
    formData.append('[user_id]', user.id)
    return formData
  }

  const sendFormData = async () => {
    const data = await createFromData()
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post('http://localhost:4001/api/v1/items', data, config)
    .then(resp => {
      if(resp.data.status === 200) {
        toast.success("Product Created!!")
        navigate('/votes');
      } else {
        toast.warning("Failed to Create")
      }
    })
    .catch(e => {
      console.log(e);
    })
  }

  const uploadImage = useCallback((e) => {
    const file = e.target.files[0]
    setImage(file)
  }, []) 

  const previewImage = useCallback((e) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
    console.log(file);
  }, [])

  const notify = (message) => {
    console.log(message);
  }
  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <div className="content-header">
          <Link to="/votes" className="btn btn-danger text-white">
            Go Back to Votes
          </Link>
          <h2 className="content-title">Add product</h2>
          <div>
            <button type="submit" className="btn btn-primary" onClick={sendFormData}>
              Create
            </button>
          </div>
        </div>

        <div className="row mb-4">
          <div>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <div className="mb-4">
                  <label htmlFor="product_title" className="form-label">
                    Product title
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                    id="product_title"
                    required
                    name='name'
                    onChange={(event) => {setName(event.target.value)}}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="product_price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="form-control"
                    id="product_price"
                    required
                    name="price"
                    onChange={(event) => {setPrice(event.target.value)}}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="product_price" className="form-label">
                    Product Url
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                    id="product_price"
                    name="url"
                    onChange={(event) => {setUrl(event.target.value)}}
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label">Description</label>
                  <textarea
                    placeholder="Type here"
                    className="form-control"
                    rows="7"
                    name="description"
                    onChange={(event) => {setDescription(event.target.value)}}
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="form-label">Images</label>
                  <input
                    className="form-control mt-3"
                    accept="image/*"
                    type="file"
                    onChange={(event) => {
                      uploadImage(event)
                      previewImage(event)
                    }}
                  />
                  {
                    preview ? (
                      <div>
                        <p
                          color="inherit"
                          onClick={() => setPreview("")}
                        >x</p>
                        <img
                          className="preview-img"
                          src={preview}
                          alt="preview img"
                        />
                      </div>
                    ) : null
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddProductMain;
