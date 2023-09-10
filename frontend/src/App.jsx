// import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Images from './pages/Images'
import Videos from './pages/Videos'
import Slides from './pages/Slides'
import { Path } from './data'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Home />} />

        <Route path='/images' element={<Images />}>
            <Route path=':id' element={<Images />} /> 
        </Route>

        <Route  path="/videos" element={<Videos />} />
        <Route  path="/slides" element={<Slides />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
