import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const WeatherForm = () => {
  const [city, setCity] = useState('');
  const navigate = useNavigate();
  const apiKey = "ecb72fbff26c6aed95a0182dd72d423d";

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async () => {
    if (city) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Error during API request');
        }

        const data = await response.json();
        console.log(data);

        // Se non ci sono dati ritornati dalla API, mostra l'alert
        if (!data || !data.list || data.list.length === 0) {
          throw new Error('No data available for the given city');
        }

        navigate(`/weather/${city}`);
      } catch (error) {
        console.error('Error during API request:', error.message);
        alert('Your search produced no results.'); 
      }
    }
  };

  return (
    <div>
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

      <button
        onClick={handleSubmit}
        disabled={!city}
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



