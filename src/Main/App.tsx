import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";
import Episodes from "../Episodes/Episodes";
import Characters from "../Characters/Characters";
import CharacterDetails from "../CharacterDetails/CharacterDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Episodes />} />
          <Route path="/characters" element={<Characters />} />
          <Route path="details" element={<CharacterDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

// function Main() {
//   return (
//     <>
//       <p className="main__title">
//         Episodes of the <b>4th</b>
//         <br /> season of the series <br />
//         <span className="cyan">Rick and Morty</span>
//       </p>
//       <img src={Image} className="image" />
//     </>
//   );
// }

function Header() {
  return (
    <header className="header">
      <p>LOREM IPSUM</p>
    </header>
  );
}

function Footer() {
  return <footer>LOREM IPSUM ©2021</footer>;
}
