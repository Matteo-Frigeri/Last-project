import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom"; 
import MainSearch from "./components/MainSearch";
import CompanySearchResults from "./components/CompanySearchResults";
import Favorites from "./components/Favorites";
import FooterDarck from "./components/FooterDrack";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./App.css"//stile globale

/* Questa pplicazione serve per la ricerca di offerte di lavoro. Dalla barra di navigazione è possibile
ritornare alla sezione Home (definita dalla comp. MainSearch) o vedere i preferiti salvati (comp.Favorites).
Tramite MainSerach e possibile ricerare sulla base del nome del lavoro digitato le offerte di lavoro
disponibili. I riusltati presentati possono essere slvati nei preferiti; dettagliati della pagina dettaglio
(copm. CompanySearchResults) o visitati nella pagina ufficiale dell'azienda. */
function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">Trova Lavoro</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/favorites">Preferiti</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      <Routes>
        <Route path="/" element={<MainSearch />} />
        <Route path="/:company" element={<CompanySearchResults />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      <FooterDarck/>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
