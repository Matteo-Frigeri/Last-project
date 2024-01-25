import React from "react";
import { Container, Row, Col } from "react-bootstrap";

/* Componente che restituisce il footer di pagina con il link alla repo github per latri progetti*/
const FooterDarck = () => {
  return (
    <footer className="bg-dark text-light text-center pt-1 m-0 w-100" style={{ position: "fixed", bottom: 0, width: "100%" }}>
      <Container>
        <Row className="d-flex small">
          <Col>
            <p className="small">© 2024 MF Company </p>
          </Col>
          <Col className="d-flex small  justify-content-center text-center">
          <p>Gurda altri progetti: </p>
            <a href="https://github.com/Matteo-Frigeri" target="_blank" rel="noopener noreferrer" className="text-white ms-1 mt-0.5">
             QUI
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterDarck;
