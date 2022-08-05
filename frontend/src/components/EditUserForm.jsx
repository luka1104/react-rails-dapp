import React, { useCallback, useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { WalletContext } from '../context/WalletContext'
import { toast } from 'react-toastify'

const EditUserForm = () => {
  const navigate = useNavigate()
  const { currentAccount, user, checkIfAccountIsCreated } = useContext(WalletContext)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [image, setImage] = useState('')
  const [preview, setPreview] = useState(user.image.url)

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
    if (image) {
      formData.append('[image]', image)
    }
    return formData
  }

  const updateUser = async () => {
    const data = await createFromData();
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    axios.patch(`http://localhost:4001/api/v1/users/${user.id}`, data, config)
    .then(resp => {
      checkIfAccountIsCreated()
      navigate('/');
      toast.success("Profile Updated!!")
    })
    .catch(e => {
      console.log(e);
    })
  }

  const removeUser = () => {
    const checkSure = window.confirm('Are You Sure??')
    if (checkSure) {
      axios.delete(`http://localhost:4001/api/v1/users/${user.id}`)
      .then(resp => {
        navigate('/signup');
        window.location.reload();
      })
      .catch(e => {
        console.log(e);
      })
    }
  }

  return (
    // <div>
    //   <form>
    //   <p>Name *</p>
    //   <input 
    //     type="text"
    //     required
    //     value={currentUser.name}
    //     name="name"
    //     onChange={(event) => {handleInputChange(event)}}
    //   />
    //   <p>Wallet Address *</p>
    //   <input
    //     type="text"
    //     required
    //     value={currentUser.wallet_address}
    //     name="wallet_address"
    //     onChange={(event) => {handleInputChange(event)}}
    //   />
    //   <p>Email</p>
    //   <input
    //     type="text"
    //     value={currentUser.email}
    //     name="email"
    //     onChange={(event) => {handleInputChange(event)}}
    //   />
    //   </form>
    //   <button
    //     onClick={updateUser}
    //   >
    //     更新
    //   </button>
    //   <button
    //     onClick={removeUser}
    //   >
    //     削除
    //   </button>
    // </div>

    <section className="content-main" style={{ maxWidth: "1200px" }}>
      <div className="content-header">
        <Link to={`/users/${user.id}`} className="btn btn-danger text-white">
          Go Back to Profile
        </Link>
        <h2 className="content-title">Edit User</h2>
        <div>
          <button onClick={updateUser} type="submit" className="btn btn-primary">
            Update
          </button>
          <button onClick={removeUser} type="submit" className="btn btn-primary">
            Delete
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div>
          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="mb-4">
                <label htmlFor="product_title" className="form-label">
                  Name
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
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  className="form-control"
                  id="product_price"
                  value={email}
                  name="url"
                  onChange={(event) => {setEmail(event.target.value)}}
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
  );
}

export default EditUserForm;
