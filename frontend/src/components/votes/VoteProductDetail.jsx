import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactLoading from 'react-loading'
import { toast } from 'react-toastify';
import "../products/products.css"
import { WalletContext } from '../../context/WalletContext'

const VoteProductDetail = () => {
  const { user } = useContext(WalletContext);
  const { id } = useParams();
  const [item, setItem] = useState([])
  const [loading, setLoading] = useState(true)
  const [voteLoading, setVoteLoading] = useState(true)
  const [vote, setVote] = useState('')

  const getItem = () => {
    axios.get(`http://localhost:4001/api/v1/items/${id}`)
    .then(resp => {
      setItem(resp.data.item)
      console.log(resp.data.item);
      setLoading(false);
    })
    .catch(e => {
      console.log(e);
      setLoading(false);
    })
  }

  const getVote = () => {
    const data = {
      user_id: user.id,
      item_id: id
    }
    axios.post(`http://localhost:4001/api/v1/votes/get_vote`, data)
    .then(resp => {
      setVote(resp.data.vote);
      setVoteLoading(false);
    })
    .catch(e => {
      console.log(e);
      setVoteLoading(false);
    })
  }

  const createVote = () => {
    setLoading(true);
    const data = {
      user_id: user.id,
      item_id: item.id
    }
    axios.post('http://localhost:4001/api/v1/votes', data)
    .then(resp => {
      console.log(resp);
      setLoading(false);
      toast.success("Thanks for Voting!")
    })
    .catch(e => {
      console.log(e);
      setLoading(false);
    })
  }

  useEffect(() => {
    getItem();
  }, [loading])

  useEffect(() => {
    getVote();
  }, [item])

  return (
    <>
      {loading ? (
        <>
          <ReactLoading className="loader" type="spin" />
        </>
      ) : (
        <div className="container">
          {/* <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
          /> */}
          <div className="left-column">
            <img src={item.image.url} alt="Product" />
          </div>
        
        
          <div className="right-column">
        
            <div className="product-description">
              <span>Headphones</span>
              <h1>{item.name}</h1>
              <p>{item.description}</p>
            </div>
        
            {/* <div class="product-configuration">
        
              <div class="product-color">
                <span>Color</span>
        
                <div class="color-choose">
                  <div>
                    <input data-image="red" type="radio" id="red" name="color" value="red" checked>
                    <label for="red"><span></span></label>
                  </div>
                  <div>
                    <input data-image="blue" type="radio" id="blue" name="color" value="blue">
                    <label for="blue"><span></span></label>
                  </div>
                  <div>
                    <input data-image="black" type="radio" id="black" name="color" value="black">
                    <label for="black"><span></span></label>
                  </div>
                </div>
        
              </div>
      
              <div class="cable-config">
                <span>Cable configuration</span>
        
                <div class="cable-choose">
                  <button>Straight</button>
                  <button>Coiled</button>
                  <button>Long-coiled</button>
                </div>
        
                <a href="#">How to configurate your headphones</a>
              </div>
            </div> */}

            <div className="product-price">
              <span>{item.price} $</span>
              { voteLoading ? (
                <>
                <ReactLoading className="loader" type="spin" />
                </>
              ) : (
                <>
                  { vote ? (
                    <a className="cart-btn">already Voted</a>
                  ) : (
                    <a onClick={createVote} className="cart-btn">Vote!</a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VoteProductDetail;
