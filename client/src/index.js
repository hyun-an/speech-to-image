import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import SuperHero from './pages/stories/MysteriousCave'
import App from './App'
import Hero from './pages/LandingPage'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Hero />} />
      <Route path='/main' element={<App />} />
      <Route path='/main-super' element={<SuperHero />} />
    </Routes>
  </BrowserRouter>
)
