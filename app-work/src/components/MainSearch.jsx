import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import Job from "./Job";


/*Questo componente fornisce una semplice interfaccia utente per cercare lavori remoti e 
visualizza i risultati in modo dinamico sulla pagina.*/
const MainSearch = () => {
  // Utilizzo di useState per gestire lo stato locale del componente
  const [query, setQuery] = useState("");
  const [jobs, setJobs] = useState([]);

  // Hook di react-router-dom per la navigazione
  const navigate = useNavigate();

  //Alert per errore nella ricerca
  const [showNoResultsAlert, setShowNoResultsAlert] = useState(false);

  // URL di base per la chiamata API
  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";
  
  const handleChange = e => {
    setQuery(e.target.value);
  };
  /*Questa è una funzione che viene chiamata quando viene inviato il form, cioè quando 
  l'utente preme il pulsante di invio all'interno del form.*/
  const handleSearch  = async e => {
    e.preventDefault();
  //prova a fare al fetch dei dati integrando nell'endPoint il distitao dell utente
    try {
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
       // Se la ricerca non ha prodotto risultati, mostra il popup
       if (data.length === 0) {
        setShowNoResultsAlert(true);
      } else {
        setShowNoResultsAlert(false);
      }
    } else {
      alert("Error fetching results");
    }
  } catch (error) {
    console.log(error);
    }
  };
  // Renderizza il componente con la struttura del layout
  return (
    <Container className="mb-5 vh-auto">
      <Row className="mb-3">
        <Col className="my-3 mx-auto text-center">
          <h1 className="display-1 ">Remote Jobs <br/> Search</h1>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col xs={8} className="mx-0 pe-1 ">
          <Form>
            <Form.Control
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Type and press Enter"
            />
          </Form>
        </Col>
        <Col xs={2} className="mx-0 p-0">
          <Button variant="primary" onClick={handleSearch}>
            Cerca
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={10} className="mx-auto">
          {jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} />
          ))}
        </Col>
      </Row>
      {/* Popup per avvisare che la ricerca non ha prodotto risultati */}
      {showNoResultsAlert && (
        <div className="alert alert-warning mt-3" role="alert">
          Spiacenti, la tua ricerca non ha prodotto alcun risultato.
        </div>
      )}
    </Container>
  );
};

export default MainSearch;