import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FooterDarck = () => {
  return (
    <footer className="bg-dark text-light text-center py-0 m-0 w-100" style={{ position: "fixed", bottom: 0, width: "100%" }}>
      <Container>
        <Row>
          <Col>
            <p className="small">© 2024 MF Company </p>
          </Col>
          <Col className="d-flex small">
          <p>Gurda altri progetti: </p>
            <a href="https://github.com/Matteo-Frigeri" target="_blank" rel="noopener noreferrer" className="text-white ms-2 mt-0.5">
             QUI
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default FooterDarck;
