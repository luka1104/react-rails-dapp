import React, { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';

export const WalletContext = createContext();
const { ethereum } = window

export const WalletProvider = ({ children }) => {
  const [loading, setLoading] = useState(true)
  const [currentAccount, setCurrentAccount] = useState('');
  const [user, setUser] = useState('')
  const navigate = useNavigate();
  const location = useLocation();

  const checkIfWalletIsConnected = async () => {
    try {
      if(!ethereum) {
        alert("Please install metamask");
        setLoading(false);
      }
      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if(accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No Accounts Found.");
        navigate('/notfound')
        setLoading(false);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.")
    }
  }

  const login = (address) => {
    const data = {
      wallet_address: address
    }
    axios.post('http://localhost:4001/api/v1/users/get_user', data)
    .then(resp => {
      console.log(resp);
      setUser(resp.data.user)
      setLoading(false);
      if (location.pathname === '/notfound') {
        toast.success(`Welcome Back ${resp.data.user.name}!!`)
        navigate('/')
      }
    })
    .catch(e => {
      console.log(e);
    })
  }

  const checkIfAccountIsCreated = () => {
    axios.get('http://localhost:4001/api/v1/users')
    .then(resp => {
      const wallet_addresses = [];
      resp.data.user.map((val) => {
        wallet_addresses.push(val.wallet_address);
      })
      if (wallet_addresses.includes(currentAccount)) {
        console.log(currentAccount);
        login(currentAccount)
      } else if(currentAccount) {
        navigate('/signup')
        toast.info("Create Account First!")
        console.log(wallet_addresses);
        setLoading(false);
      } else {
        return
      }
    })
    .catch(e => {
      console.log(e);
    })
  }

  const connectWallet = async () => {
    try {
      if(!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object.")
    }
  }

  const afterCreate = (address) => {
    setLoading(true);
    const data = {
      wallet_address: address
    }
    axios.post('http://localhost:4001/api/v1/users/get_user', data)
    .then(resp => {
      console.log(resp);
      setUser(resp.data.user)
      setLoading(false);
      navigate('/')
    })
    .catch(e => {
      console.log(e);
    })
  }

  useEffect(() => {
		checkIfWalletIsConnected();
	},[]);

  useEffect(() => {
		checkIfAccountIsCreated();
	},[currentAccount]);

  return (
    <WalletContext.Provider value={{ connectWallet, currentAccount, checkIfWalletIsConnected, checkIfAccountIsCreated, user, loading, setLoading, afterCreate }}>
      { children }
    </WalletContext.Provider>
  );
}
