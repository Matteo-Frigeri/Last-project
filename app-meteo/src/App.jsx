// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import WeatherForm from "./components/WeatherForm";
import WeatherDetails from "./components/WeatherDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHouse, faCloud } from "@fortawesome/free-solid-svg-icons";
library.add(faHouse);
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


/*Questa è un app maeteo che permette di ricercare la città di qui si vuole conosciere il meteo.
Le previsioni verranno restituire in una pagina a parte intermaente dedicata (senza poter fare
alcuna altra ricera).
All'inerno di app troviamo nell'ordine: Brra di ricerca che permette di muoversi tra pagine
nella SPA. Le varie Routes*/
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <FontAwesomeIcon
                icon={faHouse}
                style={{ color: "rgb(56, 59, 227)" }}
              />
              <Link to="/">HOME</Link>
            </li>
            <li>
              <FontAwesomeIcon
                icon={faCloud}
                style={{ color: "rgb(56, 59, 227)" }}
              />
              <Link to="/weather">WEATHER</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/weather" element={<Weather />} />
          <Route path="/weather/:city" element={<WeatherDetails />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

/*Di seguito la componente Home e Weather, ho preferito dichiararle qui per esteso anzichè 
richimarle, per evitare di creare troppe conponenti o un alberatura di directory troppo complessa.
*/
function Home() {
  return (
    <div className="center">
      <h1>Meteo Free</h1>
      <h3>What is this app?</h3>
      <p>
        Welcome to our weather app. Here, you can find forecasts for your city
        in the hours and days to come. First, access the weather section in the
        top left corner, then follow the simple instructions.
        <br />
        Enjoy! 😊{" "}
      </p>
      <br />
      <h3>Why was it created?</h3>
      <p>
        This app is part of a front-end course project.
        <br />
        If you want to explore other projects developed by me, visit my GitHub
        repository: <br />
        <a href="https://github.com/Matteo-Frigeri">My free repo</a>
      </p>
    </div>
  );
}

function Weather() {
  return (
    <div className="center">
      <h1>Weather Page</h1>
      <p>
        Enter the name of the city for which you want to know the weather
        forecast for today and tomorrow.
        <br />
        <br />
        <b>Please note:</b> the name should be provided in English!
      </p>
      <WeatherForm />
    </div>
  );
}

export default App;
