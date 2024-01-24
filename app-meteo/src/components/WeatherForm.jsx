import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


/*modulo che consente agli utenti di inserire il nome della città. Una volta inserita la città,
l'utente può fare clic su un pulsante "GET" per ottenere i dati meteorologici della città 
inserita dalla API di OpenWeatherMap. */
const WeatherForm = () => {
  // State per memorizzare il nome della città
  const [city, setCity] = useState('');
  
  // Hook di navigazione da React Router per reindirizzare l'utente
  const navigate = useNavigate();

  // Gestisce il cambiamento dell'input della città
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };
  // Chiave di accesso 
  const apiKey="ecb72fbff26c6aed95a0182dd72d423d";

  // Gestisce la presentazione del modulo
  const handleSubmit = async () => {
    if (city) {
      try {
        // Effettua una richiesta API per ottenere i dati meteorologici
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Error during API request');
        }

        const data = await response.json();
        console.log(data);

        // Naviga alla pagina dei dettagli del meteo per la città inserita
        navigate(`/weather/${city}`);
      } catch (error) {
        console.error('Error during API request:', error.message);
      }
    }
  };

  return (
    <div>
      {/* Input per inserire il nome della città */}
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={handleInputChange}
        style={{
          width: "40%",
          marginTop: "5%", 
        }}
      />

      {/* Pulsante per ottenere i dati meteorologici */}
      <button
        onClick={handleSubmit}
        disabled={!city} // Disabilita il pulsante se il campo della città è vuoto
        style={{
          width: "20%",
          maxWidth: "200px", 
          marginTop: "5%",  
        }}
      >
        GET
      </button>
    </div>
  );
};

export default WeatherForm;


