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
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherCard from "./WeatherCard";
import WeatherSummaryCard from "./WeatherSummaryCard";


const WeatherDetails = () => {
/*Qui vengono dichiarati gli stati iniziali utilizzati nella componente. forecastData contiene i
dati delle previsioni del tempo ricevuti dall'API di OpenWeatherMap. currentTime tiene traccia 
dell'ora corrente. showMore è uno stato booleano che determina se visualizzare tutte le previsioni
del giorno o solo alcune. visibleResults tiene traccia del numero di risultati visibili. 
buttonLabel e buttonColor sono utilizzati per gestire l'etichetta e il colore del pulsante 
"Show More/Show Less". */
  const { city } = useParams();
  const [forecastData, setForecastData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showMore, setShowMore] = useState(false);
  const [visibleResults, setVisibleResults] = useState(1);
  const [buttonLabel, setButtonLabel] = useState("Show More");
  const [buttonColor, setButtonColor] = useState("primary");


/*Recupera i dati delle previsioni del tempo tramite l'API di OpenWeatherMap per la città 
specificata nella rotta. Inoltre, imposta un intervallo che aggiorna l'orario corrente ogni 
secondo. L'intervallo viene cancellato quando la componente viene smontata */
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

    return () => clearInterval(intervalId);
  }, [city]);


/*Questa funzione estrae e formatta i dati delle previsioni del tempo dalla risposta dell'API. */
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


/*Questa funzione gestisce il toggle tra la visualizzazione completa e parziale delle previsioni
del giorno. Cambia lo stato di showMore, imposta il numero di risultati visibili e aggiorna 
l'etichetta e il colore del pulsante di conseguenza. */
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


/*Questa funzione visualizza le previsioni del tempo in base allo stato di showMore. Se showMore
è true, mostra tutte le previsioni del giorno. Altrimenti, mostra solo un numero specifico di 
risultati. Inoltre, mostra un pulsante "Show More/Show Less" se ci sono più di una previsione 
disponibile. */
  const displayWeatherData = () => {
    const weatherData = extractWeatherData();

    const currentDayData = weatherData.filter((data) => {
      const currentDate = new Date();
      const forecastDate = new Date(data.date);

      return (
        forecastDate.getDate() === currentDate.getDate() &&
        forecastDate.getMonth() === currentDate.getMonth() &&
        forecastDate.getFullYear() === currentDate.getFullYear()
      );
    });

    const visibleData = showMore
      ? currentDayData
      : currentDayData.slice(0, visibleResults);

    return (
      <div className="show">
        <h1 className="my-4">
          Weather Forecast for <br /> {city}
        </h1>
        {visibleData.map((data, index) => (
          <Card key={index} style={{ width: "auto", margin: "10px" }}>
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
                currentDayData={currentDayData}
                data={data}
                index={index} 
              />
            </Card.Body>
          </Card>
        ))}
        {currentDayData.length > 1 && (
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

//soluzione precedente che mostra tutti i risultati della giornata nelle diverse fascie orarie
/*import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureThreeQuarters,
  faCalendarDays,
  faDroplet,
  faWind,
  faCloudRain,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const WeatherDetails = () => {
  const { city } = useParams();
  const [forecastData, setForecastData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
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
    // Aggiorna il tempo corrente ogni secondo
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Pulisce l'intervallo quando il componente viene smontato
    return () => clearInterval(intervalId);
  }, [city]);

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

  const displayWeatherData = () => {
    const weatherData = extractWeatherData();

    const currentDayData = weatherData.filter((data) => {
      const currentDate = new Date();
      const forecastDate = new Date(data.date);

      //return forecastDate > currentDate;
      return (
        forecastDate.getDate() === currentDate.getDate() &&
        forecastDate.getMonth() === currentDate.getMonth() &&
        forecastDate.getFullYear() === currentDate.getFullYear()
      );
    });

    return (
      <div className="show">
        <h2>Weather Forecast for {city}</h2>
        <p>Current Time: {currentTime.toLocaleTimeString()}</p>
        {currentDayData.map((data, index) => (
          <Card key={index} style={{ width: "auto", margin: "10px" }}>
            <Card.Body>
              <Card.Title>
                Date and Time: {data.date}{" "}
                <FontAwesomeIcon icon={faCalendarDays} />
              </Card.Title>

              <Container className="d-block mt-3 w-100 p-0">
                <Container className="d-flex mt-3">
                  <Row className="w-100 mx-0">
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col md={2}>
                              <FontAwesomeIcon icon={faTemperatureThreeQuarters}/>
                            </Col>
                            <Col md={6}>Temperature</Col>
                            <Col md={4}>{(data.temperature - 273.15).toFixed(1)}°C</Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col md={2}>
                              <FontAwesomeIcon icon={faDroplet} />
                            </Col>
                            <Col md={6}>Humidity</Col>
                            <Col md={4}>{data.humidity}%</Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>

                <Container className="d-flex mt-3">
                  <Row className="w-100 mx-0">
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col md={2}>
                              <FontAwesomeIcon icon={faWind} />
                            </Col>
                            <Col md={6}>Wind Speed</Col>
                            <Col md={4}>{data.windSpeed} m/s</Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card>
                        <Card.Body>
                          <Row className="d-flex">
                            <Col md={2}>
                              <FontAwesomeIcon icon={faCloudRain} />
                            </Col>
                            <Col md={6}>Rain Chance</Col>
                            <Col md={4}>{data.rainChance}%</Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </Container>
              
              <Container className="d-block mt-4">
                <Row className="w-50">
                <Card>
                <Card.Body>
                {data.description}
                </Card.Body>
                </Card>
                </Row>
              </Container>

            </Card.Body>
          </Card>
        ))}
      </div>
    );
  };

  return <div>{displayWeatherData()}</div>;
};

export default WeatherDetails;*/
