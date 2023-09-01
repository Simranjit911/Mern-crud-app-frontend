import React from 'react'
import { toast } from 'react-hot-toast'
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home'
import Edit from './pages/Edit'

const App = () => {
  return (
    <>   
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>

    </Routes>
    
    </>
  )
}

export default App