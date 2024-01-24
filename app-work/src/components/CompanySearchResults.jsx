import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Job from "./Job";
import { useParams } from "react-router-dom";
import "../App.css"


/* il componente:
Utilizza lo stato (jobs e setJobs) per memorizzare i dati delle offerte di lavoro.
Utilizza il parametro company dalla route per formare l'endpoint della chiamata API.
Esegue una chiamata API asincrona quando il componente si monta (useEffect).
Visualizza i risultati delle offerte di lavoro tramite il componente Job ricevuto da chimara api*/
const CompanySearchResults = () => {

  const [jobs, setJobs] = useState([]);
  const params = useParams();

  const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";

  useEffect(() => {
    getJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getJobs = async () => {
    try {
      const response = await fetch(baseEndpoint + params.company);
      if (response.ok) {
        const { data } = await response.json();
        setJobs(data);
      } else {
        alert("Error fetching results");
      }
    } catch (error) {
      console.log(error);
    }
  };
// Ritorna la struttura del componente
  return (
    <Container>
      <Row>
        <Col className="my-3">
          <h1 className="display-4">Job posting for: {params.company}</h1>
          {jobs.map(jobData => (
             <Job key={jobData._id} data={jobData} showDetails={false} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default CompanySearchResults;