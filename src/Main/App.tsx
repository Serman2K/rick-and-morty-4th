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
          <Route path="/episode/:episodeId/characters" element={<Characters />} />
          <Route path="/episode/:episodeId/character/:characterId/details" element={<CharacterDetails />} />
          <Route path="*" element={<Episodes />} />
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

function Header() {
  return (
    <header className="header">
      <p className="header__text">LOREM IPSUM</p>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">LOREM IPSUM ©2021</p>
    </footer>
  );
}
