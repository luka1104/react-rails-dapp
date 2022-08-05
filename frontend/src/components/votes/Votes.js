import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { WalletContext } from "../../context/WalletContext";
import axios from 'axios'
import { toast } from "react-toastify";

const Product = (props) => {
  const { product } = props;
  const { user } = useContext(WalletContext);
  const [creator, setCreator] = useState(false)
  const navigate = useNavigate()
  
  const checkOwner = () => {
    if (user.id === product.user_id) {
      setCreator(true)
    }
  }

  const removeItem = () => {
    const checkSure = window.confirm('Are You Sure??')
    if (checkSure) {
      axios.delete(`http://localhost:4001/api/v1/items/${product.id}`)
      .then(resp => {
        navigate('/votes');
        toast.success("Product Deleted!")
      })
      .catch(e => {
        console.log(e);
      })
    }
  }

  useEffect(() => {
		checkOwner();
	},[user]);

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to={`/vote/${product.id}`} className="img-wrap">
            <img src={product.image.url} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">${product.price}</div>
            {creator && (
              <div className="row">
                <Link
                  to={`/product/${product.id}/edit`}
                  className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
                >
                  <i className="fas fa-pen"></i>
                </Link>
                <button
                  onClick={removeItem}
                  className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
