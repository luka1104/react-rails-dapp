import React, { useContext } from 'react'
import "./App.css"
import "react-toastify/dist/ReactToastify.css";
import ReactLoading from 'react-loading'

import Header from './components/Header'
import Sidebar from "./components/Sidebar";
import { Router } from './components/routes/Router';
import { WalletContext } from './context/WalletContext';

const App = () => {
  const { loading } = useContext(WalletContext)
  
  return (
    <div className="App">
      { loading ? (
        <>
          <ReactLoading className="loader" type="spin" />
        </>
      ) : (
        <>
          <div className="AppGlass">
            <Sidebar/>
            <Header />
            <div className="main-content">
              <Router />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
