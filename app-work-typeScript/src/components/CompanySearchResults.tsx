import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Job from "./Job";
import { useParams } from "react-router-dom";
import { JobData, CompanySearchResultsState } from "./types"; // Importa le interfacce necessarie
import "../App.css";

// Componente React per visualizzare i risultati della ricerca per azienda
const CompanySearchResults: React.FC = () => {
  // Utilizzo dello stato per memorizzare i dati dei lavori per l'azienda specificata
  const [jobs, setJobs] = useState<CompanySearchResultsState>({ jobs: [] });

  // Estrazione dei parametri dall'URL utilizzando il hook useParams di react-router-dom
  const params = useParams<{ company: string }>();

  // URL di base per la chiamata API per ottenere i lavori di un'azienda specifica
  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  // Effetto collaterale: ottenimento dei lavori quando il componente viene montato
  useEffect(() => {
    getJobs();
  }, []); // L'array vuoto come dipendenza indica che l'effetto collaterale viene eseguito solo una volta al montaggio

  // Funzione asincrona per ottenere i lavori dall'API
  const getJobs = async () => {
    try {
      
      const response = await fetch(baseEndpoint + params.company);

      // Verifica se la risposta è OK
      if (response.ok) {
        
        const { data } = await response.json();

        // Aggiorna lo stato con i dati dei lavori ottenuti
        setJobs({ jobs: data });
      } else {
        // Gestisci errori nel caso la risposta non sia OK
        alert("Error fetching results");
      }
    } catch (error) {
      // Gestisci errori generici durante la chiamata API
      console.log(error);
    }
  };

  // Ritorno del JSX per la visualizzazione dei risultati della ricerca per azienda
  return (
    <Container>
      <Row>
        <Col className="my-3">
          
          <h1 className="display-4">Job posting for: {params.company}</h1>

          {/* Mappa attraverso i dati dei lavori e rendi un componente Job per ciascun lavoro
          ho inserito la bossibilità di nascondere l'azienda se necessario inpostando showDetails={false} */}
          {jobs.jobs.map((jobData) => (
            <Job key={jobData._id} data={jobData} showDetails={true} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;

