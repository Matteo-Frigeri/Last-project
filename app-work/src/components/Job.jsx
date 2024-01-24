import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { addFavorite } from '../actions/favoriteActions'


/* Questo componente permette di visualizzare informazioni sulle offerte di lavoro, con la possibilità di
aggiungere il lavoro ai preferiti attraverso un pulsante e di accedere a dettagli più approfonditi
sull'azienda e il suo sito ufficiale.*/
const Job = ({ data }) => {

  const dispatch = useDispatch()

  return (
      <Row
        className="mx-0 mt-3 p-3 bg-white text-black small"
        style={{ border: '1px solid #00000033', borderRadius: 4 }}
      >
        <Col xs={4} className="d-flex align-items-center" >
          <Button 
            variant="outline-success"
            onClick={() => dispatch(addFavorite(data.title))}
          >
            Aggiungi ai preferiti
            </Button>
        </Col>
        <Col xs={4} className="d-flex flex-column align-items-center">
          <p style={{ fontSize: '1.2rem' }}>Dettagi:</p>
          <Link to={`/${data.company_name}`} className="text-center">{data.company_name}</Link>
        </Col>
        <Col xs={4} className="d-flex flex-column align-items-center text-center">
          <p style={{ fontSize: '1.2rem' }}>Visita il sito ufficile:</p>
          <a href={data.url} target="_blank" rel="noreferrer">
            {data.title}
          </a>
        </Col>
      </Row>
  )
}

export default Job