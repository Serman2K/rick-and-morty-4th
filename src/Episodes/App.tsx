// import { useState } from 'react'
import './App.css'
import Image from '../assets/image.png'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <p>Episodes of the <b>4th</b><br/> season of the series <br/><span className="cyan">Rick and Morty</span></p>
      <img src={Image} className='image'/>
      <Footer />
    </>
  )
}

export default App

function Header() {
  return (
    <header>
      LOREM IPSUM
    </header>
  )
}

function Footer() {
  return (
    <footer>
      LOREM IPSUM ©2021
    </footer>
  )
}