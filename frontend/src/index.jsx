import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from 'react-router-dom'
import App from "./App"
import { WalletProvider } from './context/WalletContext'
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <BrowserRouter>
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
    />
    <WalletProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </WalletProvider>
  </BrowserRouter>,
  document.getElementById("root")
)
