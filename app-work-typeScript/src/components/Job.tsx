import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../actions/favoriteActions';

/* Questa componente React visualizza le informazioni su un lavoro e fornisce la
possibilità di aggiungere o rimuovere il lavoro dai preferiti. Utilizza il Redux per gestire
lo stato globale dei preferiti e reagisce dinamicamente alle azioni dell'utente, aggiornando 
il rendering in base allo stato corrente. */
// Definizione delle proprietà che il componente Job accetta
interface JobProps {
  data: {
    _id: string;
    company_name: string;
    url: string;
    title: string;
  };
  showDetails?: boolean; // Proprietà opzionale per mostrare dettagli
}

// Componente funzionale React Job
const Job: React.FC<JobProps> = ({ data, showDetails = true }) => {
  // Inizializzazione del dispatcher Redux
  const dispatch = useDispatch();

  // Stato locale per gestire la visualizzazione del messaggio "Aggiunto ai preferiti"
  const [isAdded, setIsAdded] = useState(false);

  // Verifica se l'elemento è già nei preferiti utilizzando lo stato globale
  const isFavorite = useSelector(state =>
    state.list.some(item => item.title === data.title && item.companyName === data.company_name)
  );

  // Effetto collaterale per aggiornare lo stato locale quando cambia la presenza nei preferiti
  useEffect(() => {
    setIsAdded(isFavorite);
  }, [isFavorite]);

  // Gestore per l'aggiunta ai preferiti
  const handleAddFavorite = () => {
    // Aggiungi ai preferiti solo se non è già presente
    if (!isFavorite) {
      dispatch(addFavorite(data.title, data.company_name, data.url));
      setIsAdded(true);
    }
  };

  // Gestore per la rimozione dai preferiti
  const handleRemoveFavorite = () => {
    dispatch(removeFavorite(data.title, data.company_name, data.url));
    setIsAdded(false);
  };

  // Ritorno del JSX del componente Job
  return (
    <Row
      className="d-flex flex-md-column mx-0 mt-3 p-3 bg-white text-black small"
      style={{
        border: '1px solid #00000033',
        borderRadius: 4,
        background: 'linear-gradient(#E7E6E8, #ffffff, #ffffff, #E7E6E8)',
      }}
    >
      {/* Colonna per il pulsante Aggiungi ai preferiti */}
      <Col xs={4} className="d-flex flex-md-column align-items-center">
        {!isAdded ? (
          <Button variant="outline-success" onClick={handleAddFavorite}>
            Aggiungi ai preferiti
          </Button>
        ) : (
          // Messaggio quando il lavoro è stato aggiunto ai preferiti
          <p
            className="text-center text-success h6 p-3"
            style={{
              borderRadius: '50%',
              border: '3px solid green',
              padding: '10px',
            }}
          >
            Aggiunto ai <br /> preferiti
          </p>
        )}
      </Col>
      {/* Colonna per i dettagli dell'azienda */}
      {showDetails && (
        <Col xs={4} className="d-flex flex-column align-items-center">
          <p className="h5">Azienda:</p>
          {/* Link alla pagina dell'azienda */}
          <Link to={`/${data.company_name}`} className="text-center">
            {data.company_name}
          </Link>
        </Col>
      )}
      {/* Colonna per il link al sito ufficiale */}
      <Col xs={4} className="d-flex flex-column align-items-center text-center">
        <p className="h5">Posizione:</p>
        {/* Link esterno al sito ufficiale del lavoro */}
        <a href={data.url} target="_blank" rel="noreferrer">
          {data.title}
        </a>
      </Col>
    </Row>
  );
};

export default Job;


