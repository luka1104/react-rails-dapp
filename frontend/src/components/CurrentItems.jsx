import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CurrentItems = () => {
  const [items, setItems] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:4001/api/v1/items')
    .then(resp => {
      console.log(resp.data);
      setItems(resp.data.item);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  return (
    <div>
      <h1>Item Lists</h1>
      <input 
        type="text"
        placeholder="Search Item..."
        onChange={(event) => {setSearchName(event.target.value)}}
      />
      <div>
        {items.filter((val) => {
          if (searchName === "") {
            return val
          } else if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
            return val
          }
        }).map((val, key) => {
          return (
            <div key={key}>
              {val.id}
              {val.name}
              {val.description}
              {val.price}
              {/* <button>
                <Link to={`/users/${val.id}/edit`}>編集</Link>
              </button> */}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default CurrentItems
