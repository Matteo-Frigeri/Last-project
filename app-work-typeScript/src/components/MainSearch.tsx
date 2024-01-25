import React, { useState, ChangeEvent, FormEvent } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Job from "./Job";

/*Questo componente React gestisce la ricerca principale dei lavori. Include un campo di 
input per inserire la query di ricerca, un pulsante per avviare la ricerca e visualizza i 
risultati ottenuti attraverso il componente Job. Inoltre, mostra un avviso se la ricerca non 
produce risultati */
// Interfaccia per la struttura dei dati di un lavoro
interface JobData {
  _id: string;
}

const MainSearch: React.FC = () => {
  // Utilizzo di useState per gestire lo stato locale del componente
  const [query, setQuery] = useState<string>("");
  const [jobs, setJobs] = useState<JobData[]>([]);

  // Hook di react-router-dom per la navigazione
  const navigate = useNavigate();

  // Alert per errore nella ricerca
  const [showNoResultsAlert, setShowNoResultsAlert] = useState<boolean>(false);

  // URL di base per la chiamata API
  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?search=";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Verifica se il valore digitato è una stringa alfabetica
    if (/^[A-Za-z]+$/.test(e.target.value) || e.target.value === "") {
      setQuery(e.target.value);
    }
  };

  const handleSearch = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(baseEndpoint + query + "&limit=20");
      if (response.ok) {
        const { data }: { data: JobData[] } = await response.json();
        setJobs(data);

        // Se la ricerca non ha prodotto risultati, mostra il popup
        setShowNoResultsAlert(data.length === 0);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.error(error);
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
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Type"
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
