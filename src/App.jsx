import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ResponsivPagination from './components/ResponsivPagination'
import Scrol from './components/Scrol'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ResponsivPagination></ResponsivPagination>}></Route>
        <Route path = '/scroll' element = {<Scrol></Scrol>}></Route>
      </Routes>
    </div>
  )
}

export default App