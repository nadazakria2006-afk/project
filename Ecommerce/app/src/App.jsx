import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home/Home'
import About from './components/About/About'
import Gallary from './components/Gallary/Gallary'


function App() {
  return <div>
    <h2>App Page</h2>
    <Home/>
    <About/>
    <Gallary/>
  </div>
}
export default App
