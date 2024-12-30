import React from 'react'
import ReactDOM from 'react-dom/client'
//import App from './App.jsx'
import App from './APIGatewayMicroFrontend.jsx'
//import App from './ServiceDictionaryMicroFrontend.jsx' 
//changed App to ServiceDictionaryMicroFrontend
import './index.css'
//
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
