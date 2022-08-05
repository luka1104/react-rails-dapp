import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify";

const EditProductMain = (props) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [product, setProduct] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState('')

  const getProduct = (id) => {
    axios.get(`http://localhost:4001/api/v1/items/${id}/edit`)
    .then(resp => {
      console.log(resp);
      let item = resp.data.item;
      setProduct(item);
      setName(item.name);
      setPrice(item.price);
      setUrl(item.url);
      setDescription(item.description);
      setPreview(item.image.url);
    })
    .catch(e => {
      console.log(e);
    })
  }

  const createFromData = () => {
    const formData = new FormData()
    formData.append('[name]', name)
    formData.append('[price]', price)
    formData.append('[url]', url)
    formData.append('[description]', description)
    if (image) {
      formData.append('[image]', image)
    }
    return formData
  }

  const updateProduct = async () => {
    const data = await createFromData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.patch(`http://localhost:4001/api/v1/items/${id}`, data, config)
    .then(resp => {
      if(resp.data.status === 200) {
        navigate('/votes');
        toast.success("Product Updated!!")
      } else {
        console.log(resp);
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

  useEffect(() => {
    getProduct(id)
  }, [id])

  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <div className="content-header">
          <Link to="/votes" className="btn btn-danger text-white">
            Go Back to Votes
          </Link>
          <h2 className="content-title">Update Product</h2>
          <div>
            <button onClick={updateProduct} type="submit" className="btn btn-primary">
              Update
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
                    value={name}
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
                    value={price}
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
                    value={url}
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
                    value={description}
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

export default EditProductMain;
