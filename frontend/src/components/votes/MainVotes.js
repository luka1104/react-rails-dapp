import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Product from "./Votes";
import ReactLoading from 'react-loading'

const MainVotes = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([])
  const [searchName, setSearchName] = useState('')

  const getProducts = () => {
    axios.get('http://localhost:4001/api/v1/votes')
    .then(resp => {
      console.log(resp.data);
      setItems(resp.data.item);
      setLoading(false);
    })
    .catch(e => {
      console.log(e);
    })
  }

  useEffect(() => {
    getProducts();
  }, [])
  return (
    <>
      { loading ? (
        <>
          <ReactLoading className="loader" type="spin" />
        </>
      ) : (
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Choose a Product to Publish!</h2>
            <div>
              <Link to="/addproduct" className="btn btn-primary">
                Create new
              </Link>
            </div>
          </div>

          <div className="card mb-4 shadow-sm">
            <header className="card-header bg-white ">
              <div className="row gx-3 py-3">
                <div className="col-lg-4 col-md-6 me-auto ">
                <input 
                  type="text"
                  placeholder="Search Item..."
                  onChange={(event) => {setSearchName(event.target.value)}}
                />
                </div>
                <div className="col-lg-2 col-6 col-md-3">
                  <select className="form-select">
                    <option>All category</option>
                    <option>Electronics</option>
                    <option>Clothings</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="col-lg-2 col-6 col-md-3">
                  <select className="form-select">
                    <option>Latest added</option>
                    <option>Cheap first</option>
                    <option>Most viewed</option>
                  </select>
                </div>
              </div>
            </header>

            <div className="card-body">
              <div className="row">
                {/* Products */}
                {/* {products.map((product) => (
                  <Product product={product} key={product._id} />
                ))} */}
                {items.filter((val) => {
                  if (searchName === "") {
                    return val
                  } else if (val.name.toLowerCase().includes(searchName.toLowerCase())) {
                    return val
                  }
                }).map((val, key) => {
                  return (
                    <Product
                      product={val}
                      key={key}
                    />
                  );
                })}
              </div>

              <nav className="float-end mt-4" aria-label="Page navigation">
                <ul className="pagination">
                  <li className="page-item disabled">
                    <Link className="page-link" to="#">
                      Previous
                    </Link>
                  </li>
                  <li className="page-item active">
                    <Link className="page-link" to="#">
                      1
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      2
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      3
                    </Link>
                  </li>
                  <li className="page-item">
                    <Link className="page-link" to="#">
                      Next
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MainVotes;
