import React from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { REMOVE_FAVORITE } from "../actions/favoriteActions";
import "../App.css";
/* Componente che mostra tutti i risultati salvati in questa sezione dando la possibilità 
di rimuoverli*/
// Interfaccia per la struttura dei preferiti, migliorando la gestione dei tipi.
interface Favorite {
  title: string;
  companyName: string;
}

/* Componente Favorites in TypeScript, useSelector riceve lo stato completo Redux come parametro
 e restituisce solo la parte dello stato che è di interesse per il componente Favorites, cioè 
 l'array di preferiti. In questo modo, TypeScript può definire correttamente il tipo degli 
 elementi nell'array favorites.*/
const Favorites: React.FC = () => {
  const dispatch = useDispatch();
 // Indicato il tipo dello stato Redux
  const favorites: Favorite[] = useSelector((state: { list: Favorite[] }) => state.list);
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="d-block my-3 mx-auto text-center">
        <Col>
          <h1 className="display-1">Preferiti</h1>
        </Col>
        <Col>
          <ListGroup>
            {favorites.length > 0 ? (
              favorites.map((fav, index, data) => (
                <ListGroup.Item key={index} className="d-flex align-items-center mb-2"
                style={{ border: '1px solid #00000033', borderRadius: 4,
                background: 'linear-gradient(#E7E6E8, #ffffff, #ffffff, #E7E6E8)'}}>
                  <Button
                    variant="outline-danger"
                    onClick={() => dispatch({ type: REMOVE_FAVORITE, payload: fav })}
                  >
                    Elimina
                  </Button>
                  <Container>
                    <p className="h5">Posizione</p>
                    <a href={fav.data} target="_blank" rel="noreferrer">
                    {fav.title}
                    </a>
                  </Container>
                  <Container>
                    <p className="h5">Azienda</p>
                    <Link to={`/${fav.companyName}`} className="text-center">
                    {fav.companyName}
                    </Link>
                  </Container>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item className="bg-transparent border-0 text-white h5">
                Non ci sono preferiti da mostrare
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default Favorites;

