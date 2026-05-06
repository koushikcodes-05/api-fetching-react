import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import RdmJokes from './components/RdmJokes.jsx'
import RdmQuote from './components/RdmQuote.jsx'
import RdmUser from './components/RdmUser.jsx'
import RdmProducts from './components/RdmProducts.jsx'
import RdmCat from './components/RdmCat.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RdmQuote/> */}
    {/* <RdmUser/> */}
    {/* <RdmJokes /> */}
    <App/>
    {/* <RdmProducts /> */}
    {/* <RdmCat /> */}
    
  </StrictMode>,
)
