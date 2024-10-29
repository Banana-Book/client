import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

import { ConfigProvider } from './contexts/ConfigContext'
import {ToastContainer} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL || "https://bb-bend-production.up.railway.app/api"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
      <ToastContainer theme='dark' position='bottom-right'/>
      </ConfigProvider>
  </React.StrictMode> 
)