import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

/*Questo componente è responsabile della visualizzazione del riepilogo del meteo per una data 
città, includendo informazioni come il nome della città, l'orario corrente, la temperatura e la 
descrizione del meteo. 
La temperatura corrente delle fascie orarie diverse da quella corrente[0] non viene chiarmante data,
restituento "N/A".
*/
const WeatherSummaryCard = ({
  city,
  currentTime,
  showMore,
  currentDayData,
  data,
  index,
}) => (
  <Container className="d-block mt-4 mx-auto">
    <Row className="w-120">
      <Card style={{ background: "linear-gradient( #87CEEB, #FFFFFF)" }}>
        <Card.Body className="d-flex">
          <Container className="m-0 p-0">
            <Row>
              <Col sm={4}>
                <h3>{city}</h3>
                <p>Current Time: {currentTime.toLocaleTimeString()}</p>
              </Col>
              <hr className="d-sm-none"/>
              <Col sm={4} className="mt-1">
                <p className="h1">
                  {!showMore
                    ? (currentDayData[0]?.temperature - 273.15).toFixed(1) +
                      " °C"
                    : index === 0
                    ? (currentDayData[0]?.temperature - 273.15).toFixed(1) +
                      " °C"
                    : "N/A"}
                </p>
                <p>
                  {showMore && index === 0 || index===0
                    ? "Current Temperature"
                    : "Not available"}
                </p>
              </Col>
              <hr className="d-sm-none"/>
              <Col sm={4} className="mt-1">
                {data && (
                  <div>
                    <h5>Weather Description:</h5>
                    <p>{data.description}</p>
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </Row>
  </Container>
);

export default WeatherSummaryCard;
