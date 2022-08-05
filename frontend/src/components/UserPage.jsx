import React, { useContext, useState } from 'react'
import { WalletContext } from '../context/WalletContext'
import { useCallNFTLogin } from '../hooks/useCallNFTLogin'
import { Link } from 'react-router-dom'

const UserPage = () => {
  const { currentAccount, user } = useContext(WalletContext);
  const [authenticated, setAuthenticated] = useState(false)
  const hasValidNFT = useCallNFTLogin()

  return (
    // <div>
    //   {user.id}
    //   {user.name}
    //   {user.wallet_address}
    //   {currentAccount && (
    //     <div>
    //       <button
    //         onClick={async () => {
    //           setAuthenticated(await hasValidNFT(currentAccount))
    //         }}
    //       >
    //         Show the limited contents?
    //       </button>
    //     </div>
    //   )}
    //   {currentAccount && authenticated && (
    //     <div mt="1rem">
    //       <p fontSize="2xl" fontWeight="600">
    //         You are a special user!
    //       </p>
    //     </div>
    //   )}
    // </div>
    <>
      <div className="container">
      
        <div className="left-column">
          <img src={user.image.url} alt="User" />
        </div>
      
      
        <div className="right-column">
      
          <div className="product-description">
            <h1>{user.name}</h1>
            <p>Email : {user.email}</p>
            <p>WalletAddress : {`${user.wallet_address.slice(0, 5)}...${user.wallet_address.slice(user.wallet_address.length - 4)}`}</p>
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
            <a className="cart-btn"><Link to={`/users/${user.id}/edit`}>Edit</Link></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserPage
