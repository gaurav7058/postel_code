import React from 'react'
import PostelPinCode from './Compoent/PostelPinCode'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import PrintPostelData from './Compoent/PrintPostelData'
export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<PostelPinCode></PostelPinCode>}></Route>
        <Route path='/postel/:pincode' element={<PrintPostelData></PrintPostelData>}></Route>
      </Routes>
    </div>
  )
}
