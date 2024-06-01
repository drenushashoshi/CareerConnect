import React, { useEffect, useState } from "react";
import { Card, Row, Col } from 'react-bootstrap'; 
import { FaStar } from 'react-icons/fa';
import RateService from "../Services/RateService";

const RatesForVisitors = () => {
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await RateService.getAllRates();
      setRates(response);
    } catch (error) {
      setError('Error fetching rates');
      console.error(error);
    }
  };

  const renderStars = (vleresimi) => {
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            color={index < vleresimi ? '#ffc107' : '#e4e5e9'}
            size={20}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="container">
        <Row xs={1} md={2} className="g-4">
          {rates.map(rate => (
            <Col key={rate.id}>
              <div className="d-flex h-100">
                <Card className="text-center w-100 h-100" style={{ backgroundColor: 'transparent', border: '1px solid white', color: 'white' }}>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{rate.name} {rate.surname}</Card.Title>
                    <Card.Title>{renderStars(rate.vleresimi)}</Card.Title>
                    <Card.Text className="flex-grow-1">
                      <strong>"</strong>{rate.komenti}<strong>"</strong><br />
                      {rate.data_krijimit}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
        {error && <p className="text-danger">{error}</p>}
      </div>
    </div>
  );
};

export default RatesForVisitors;
