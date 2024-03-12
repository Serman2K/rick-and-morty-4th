// import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import './App.css'
import Image from '../assets/image.png'
import Episodes from "../Episodes/Episodes";
import Characters from "../Characters/Characters";
import CharacterDetails from "../CharacterDetails/CharacterDetails";

export default function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Episodes />} />
          <Route path="characters" element={<Characters />} />
          <Route path="details" element={<CharacterDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
    // <Layout />
  )
}

function Layout() {
  return (
    <>
      <Header />
      <p>Episodes of the <b>4th</b><br /> season of the series <br /><span className="cyan">Rick and Morty</span></p>
      <img src={Image} className='image' />
      <Footer />
      <Outlet />
    </>
  )
}

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