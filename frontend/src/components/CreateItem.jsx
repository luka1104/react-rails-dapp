import React, { useState, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateItem = () => {
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
    formData.append('[description]', description)
    formData.append('[price]', price)
    formData.append('[url]', url)
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
    axios.post('http://localhost:4001/api/v1/items', data, config)
    .then(resp => {
      if(resp.data.status === 200) {
        notify("Item Successfully Created")
        navigate('/items')
        window.location.reload();
      } else {
        notify("Item creation Failed")
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
    <div>
      <p>Name</p>
      <input
        type="text"
        name="name"
        onChange={(event) => {setName(event.target.value)}}
      />
      <p>Description</p>
      <input
        type="text"
        name="description"
        onChange={(event) => {setDescription(event.target.value)}}
      />
      <p>Price</p>
      <input
        type="text"
        name="price"
        onChange={(event) => {setPrice(event.target.value)}}
      />
      <p>Url</p>
      <input
        type="text"
        name="url"
        onChange={(event) => {setUrl(event.target.value)}}
      />
      <p>Image</p>
      <input
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
      <button
        onClick={sendFormData}
      >
        Create
      </button>
    </div>
  )
}

export default CreateItem

