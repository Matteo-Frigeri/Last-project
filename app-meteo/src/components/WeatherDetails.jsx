import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureThreeQuarters,
  faCalendarDays,
  faDroplet,
  faWind,
  faCloudRain,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Container, Button, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherCard from "./WeatherCard";
import WeatherSummaryCard from "./WeatherSummaryCard";
import TableWeather from "./TableWeather";

// Stati per salvare i dati delle previsioni
const WeatherDetails = () => {
  const { city } = useParams();
  const [forecastData, setForecastData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMore, setShowMore] = useState(false);
  const [visibleResults, setVisibleResults] = useState(1);
  const [buttonLabel, setButtonLabel] = useState("Show More");
  const [buttonColor, setButtonColor] = useState("primary");
  const [selectedDay, setSelectedDay] = useState(null);

// Effetto che recupera i dati delle previsioni del tempo quando il componente si monta e imposta un intervallo per aggiornare l'orario corrente.
  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=ecb72fbff26c6aed95a0182dd72d423d`
        );

        if (!response.ok) {
          throw new Error("Error during API request");
        }

        const data = await response.json();
        setForecastData(data);
      } catch (error) {
        console.error("Error during API request:", error.message);
      }
    };

    fetchWeatherForecast();
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

// Pulisce l'intervallo quando il componente si smonta
    return () => clearInterval(intervalId);
  }, [city]);

// Estrae e formatta i dati delle previsioni del tempo dalla risposta dell'API
  const extractWeatherData = () => {
    if (!forecastData) return [];

    return forecastData.list.map((forecast) => ({
      date: forecast.dt_txt,
      temperature: forecast.main.temp,
      description: forecast.weather[0].description,
      humidity: forecast.main.humidity,
      windSpeed: forecast.wind.speed,
      rainChance: forecast.pop,
    }));
  };

//Permette di visualizzare gli altri risultati di giornata e li nasconde se ripremuto rendendone visibile di base solo 1
  const handleToggleShowMore = () => {
    setShowMore((prev) => !prev);
    setVisibleResults(1);
    setButtonLabel((prevLabel) =>
      prevLabel === "Show More" ? "Show Less" : "Show More"
    );
    setButtonColor((prevColor) =>
      prevColor === "primary" ? "warning" : "primary"
    );
  };

// Gestisce la selezione di un giorno dal menu a tendina
  const handleDaySelect = (day) => {
    setSelectedDay(day);
  };

//// Visualizza i dati delle previsioni del tempo in base allo stato di showMore e al giorno selezionato
  const displayWeatherData = () => {
    const weatherData = extractWeatherData();

    let filteredData = weatherData;

    if (selectedDay) {
      filteredData = weatherData.filter((data) => {
        const forecastDate = new Date(data.date);
        return forecastDate.toLocaleDateString() === selectedDay;
      });
    } else {
      filteredData = weatherData.filter((data) => {
        const currentDate = new Date();
        const forecastDate = new Date(data.date);

        return (
          forecastDate.getDate() === currentDate.getDate() &&
          forecastDate.getMonth() === currentDate.getMonth() &&
          forecastDate.getFullYear() === currentDate.getFullYear()
        );
      });
    }

    const visibleData = showMore
      ? filteredData
      : filteredData.slice(0, visibleResults);

    return (
      <div className="show mt-3 position-relative">
        <Dropdown className="position-absolute start-0 ms-1">
          <Dropdown.Toggle variant="primary" id="dropdown-basic">
            {selectedDay ? `Selected Day: ${selectedDay}` : "Select Day"}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {Array.from(new Set(weatherData.map((data) => new Date(data.date).toLocaleDateString()))).map((day, index) => (
              <Dropdown.Item key={index} onClick={() => handleDaySelect(day)}>
                {day}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <h1 className="my-4">
          Weather for <br /> {city}
        </h1>
        {visibleData.map((data, index) => (
          <Card key={index} style={{ width: "auto", margin: "10px", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
            <Card.Body>
              <Card.Title>
                Date and Time: {data.date}{" "}
                <FontAwesomeIcon icon={faCalendarDays} />
              </Card.Title>

              <Container className="d-block my-3 w-100 p-0">
                <WeatherCard
                  icon={faTemperatureThreeQuarters}
                  title="Temperature"
                  value={(data.temperature - 273.15).toFixed(1)}
                  unit="°C"
                  icon1={faDroplet}
                  title1="Humidity"
                  value1={data.humidity}
                  unit1="%"
                />
                <WeatherCard
                  icon={faWind}
                  title="Wind Speed"
                  value={data.windSpeed}
                  unit="m/s"
                  icon1={faCloudRain}
                  title1="Rain Chance"
                  value1={data.rainChance}
                  unit1="%"
                />
              </Container>
              <WeatherSummaryCard
                city={city}
                currentTime={currentTime}
                showMore={showMore}
                currentDayData={filteredData}
                data={data}
                index={index}
              />
              {index === 0 && <TableWeather currentDayData={filteredData} />}
            </Card.Body>
          </Card>
        ))}
        {filteredData.length > 1 && (
          <Button onClick={handleToggleShowMore} variant={buttonColor}>
            {buttonLabel}
          </Button>
        )}
      </div>
    );
  };

  return <div>{displayWeatherData()}</div>;
};

export default WeatherDetails;