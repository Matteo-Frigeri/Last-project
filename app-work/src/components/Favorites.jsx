import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { REMOVE_FAVORITE } from "../actions/favoriteActions";
import "../App.css"


//Questo componente gestiscie l'interfaccia per la visualizzazione e la rimozione dei preferiti.
const Favorites = () => {
/* Vengono utilizzati gli hook useDispatch e useSelector per ottenere il dispatcher Redux e 
selezionare lo stato dalla store Redux*/
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.list)
    const navigate = useNavigate();

    return (
        <Container>
            <Row className="d-block my-3 mx-auto text-center">
                <Col>
                    <h1 className="display-1 ">Preferiti</h1>
                </Col>
                <Col>
                    <ListGroup>
                        {favorites.length > 0 ? (
                            /* La lista dei preferiti viene mappata e ogni elemento (se presente) viene 
                            visualizzato all'interno di un ListGroup.Item. Ogni elemento 
                            contiene un bottone "Elimina" che, quando cliccato, invia un'azione
                             Redux per rimuovere il preferito.*/
                            favorites.map((fav, index) => (
                            <ListGroup.Item key={index} className="d-flex align-items-center">
                                <Button variant="outline-danger" onClick={() => dispatch({ type: REMOVE_FAVORITE, payload: fav })}>Elimina</Button>
                                <Container className="me-5 h5">
                                  {fav}  
                                </Container> 
                            </ListGroup.Item>
                        ))
                        ) : (
                            //Se non ci sono preferiti, viene mostrato
                            <ListGroup.Item className="bg-transparent border-0 text-white h5">Non ci sono preferiti da mostrare</ListGroup.Item>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )

}

export default Favorites;