import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Users = () => {
  const [users, setUsers] = useState([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    axios.get('http://localhost:4001/api/v1/users')
    .then(resp => {
      console.log(resp.data);
      setUsers(resp.data.user);
    })
    .catch(e => {
      console.log(e);
    })
  }, [])

  return (
    <div>
      <h1>User Lists</h1>
      <input 
        type="text"
        placeholder="Search User..."
        onChange={(event) => {setSearchName(event.target.value)}}
      />
      <div>
        {users.filter((val) => {
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
              {val.email}
              {val.wallet_address}
              <img src={val.image.url}/>
              
              <button>
                <Link to={`/users/${val.id}/edit`}>編集</Link>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Users;
