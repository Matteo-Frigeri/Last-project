import React from "react";
import { Table } from "react-bootstrap";

const TableWeather = ({ currentDayData }) => {
  const extractTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <Table striped bordered hover responsive className="mt-4">
      <thead>
        <tr>
          <th style={{ background: 'linear-gradient(to right, #87CEEB, #FFFFFF)' }} >Time</th>
          {currentDayData.map((data, index) => (
            <td key={index}>{extractTime(data.date)}0</td>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th style={{ background: 'linear-gradient(to right, #87CEEB, #FFFFFF)' }}>Temperature (°C)</th>
          {currentDayData.map((data, index) => (
            <td key={index}>{(data.temperature - 273.15).toFixed(1)}</td>
          ))}
        </tr>
      </tbody>
    </Table>
  );
};

export default TableWeather;
