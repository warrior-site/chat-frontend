import React from 'react'
import { Route, Router,Routes } from 'react-router-dom'
import HomePage from '../components/HomePage'
import ChatRoom from '../components/ChatRoom'

function Routing() {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/chat' element={<ChatRoom/>}></Route>
    </Routes>
  )
}

export default Routing