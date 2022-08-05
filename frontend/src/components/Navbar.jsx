import { Link } from 'react-router-dom'
import React, { useContext, useState, useEffect } from 'react'
import { WalletContext } from '../context/WalletContext';

const Navbar = () => {
  const { connectWallet, currentAccount, checkIfAccountIsCreated, user } = useContext(WalletContext);

  useEffect(() => {
    checkIfAccountIsCreated();
    console.log(currentAccount);
  }, [currentAccount])

  return (
    <div>
      <button>
        <Link to='/items'>商品一覧</Link>
      </button>
      <button>
        <Link to='/items/new'>商品登録</Link>
      </button>
      {!currentAccount && (
        <button
          onClick={() => {connectWallet()}}
        >
          ConnectWallet
        </button>
      )}
      {user && (
        <button>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
        </button>
      )}
    </div>
  )
}

export default Navbar
