import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureThreeQuarters,
  faDroplet,
  faWind,
  faCloudRain,
} from "@fortawesome/free-solid-svg-icons";


/*Questo componente rende due colonne, ciascuna contenente un Card di Bootstrap che mostra 
informazioni specifiche sulla temperatura e l'umidità. Le icone sono fornite dalla libreria 
FontAwesome. Le informazioni vengono passate al componente tramite le proprietà (props), 
rendendo il componente flessibile */
const WeatherCard = ({ icon, title, value, unit, icon1, title1, value1, unit1, }) => (
  <Container className="d-flex mt-3">
                  <Row className="w-100 mx-0 ">
                    <Col md={6}>
                      <Card style={{background: 'linear-gradient(to right, #87CEEB, #FFFFFF)'}}>
                        <Card.Body>
                          <Row>
                            <Col md={2}>
                              <FontAwesomeIcon icon={icon}/>
                            </Col>
                            <Col md={6}>{title}</Col>
                            <Col md={4}>{value} {unit}</Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={6}>
                      <Card style={{background: 'linear-gradient(to left, #87CEEB, #FFFFFF)'}}>
                        <Card.Body>
                          <Row>
                            <Col md={2}>
                              <FontAwesomeIcon icon={icon1} />
                            </Col>
                            <Col md={6}>{title1}</Col>
                            <Col md={4}>{value1} {unit1}</Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
);
export default WeatherCard;
