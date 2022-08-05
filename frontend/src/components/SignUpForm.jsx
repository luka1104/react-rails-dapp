import React, { useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { WalletContext } from '../context/WalletContext';
import { toast } from 'react-toastify';

const SignUpForm = () => {
  const { currentAccount, afterCreate } = useContext(WalletContext);
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [hasNameError, setNameError] = useState(false)
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState('')
  

  const handleNameChange = (event) => {
    let inputValue = event.target.value;
    let isEmpty = inputValue === '';
    setName(inputValue)
    setNameError(isEmpty)
  }

  const handleEmailChange = (event) => {
    let inputValue = event.target.value;
    setEmail(inputValue)
  }

  const uploadImage = useCallback((event) => {
    const file = event.target.files[0]
    setImage(file)
  }, [])

  const previewImage = useCallback((event) => {
    const file = event.target.files[0]
    setPreview(window.URL.createObjectURL(file))
    console.log(file);
  }, [])

  const createFromData = () => {
    const formData = new FormData()
    formData.append('[name]', name)
    formData.append('[email]', email)
    formData.append('[wallet_address]', currentAccount)
    formData.append('[image]', image)
    return formData
  }

  const sendFormData = async () => {
    const data = await createFromData()
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.post('http://localhost:4001/api/v1/users', data, config)
    .then(resp => {
      if(resp.data.status === 200) {
        afterCreate(currentAccount)
        toast.success("Successfully Created!!")
      } else {
        toast.warning("User creation Failed")
      }
    })
    .catch(e => {
      console.log(e);
    })
  }

  let nameErrorText;
  if(hasNameError) {
    nameErrorText = (
      <p className="error-text">Name cannot be null</p>
    )
  }
    
  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <div className="content-header">
          <h2 className="content-title">Sign Up</h2>
          <div>
            <button onClick={sendFormData} type="submit" className="btn btn-primary">
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
                    User Name
                  </label>
                  <input 
                    type="text"
                    placeholder="Type here"
                    className="form-control"
                    id="product_title"
                    required
                    name="name"
                    onChange={(event) => {handleNameChange(event)}}
                  />
                  {nameErrorText}
                </div>
                <div className="mb-4">
                  <label htmlFor="product_price" className="form-label">
                    Email
                  </label>
                  <input
                    placeholder="Type here"
                    className="form-control"
                    id="product_price"
                    type="text"
                    name="email"
                    onChange={(event) => {handleEmailChange(event)}}
                  />
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
  )
}
export default SignUpForm;
