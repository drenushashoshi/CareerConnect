import React, { useEffect, useState } from "react";
import { Card, Button, Modal } from 'react-bootstrap'; 
import { FaStar } from 'react-icons/fa';
import RateService from "../Services/RateService";
import SideNavBar from "../SideNavBar";
import EmployeeService from "../Services/EmployeeService";
import { useNavigate, Link } from "react-router-dom";

const RatesList = () => {
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRateId, setSelectedRateId] = useState(null);
  const navigator = useNavigate();

  useEffect(() => {
    if (!EmployeeService.isAdmin()) {
      navigator('/');
    }
  }, [navigator]);

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

  const openModal = (rateId) => {
    setSelectedRateId(rateId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRateId(null);
  };

  const deleteRate = async () => {
    try {
      await RateService.deleteRate(selectedRateId);
      closeModal();
      fetchRates();
    } catch (error) {
      setError('Error deleting rate');
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

  const DeleteConfirmationModal = ({ show, handleClose, handleDelete }) => (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className='text-center custom-font'>
        <h5 className='mt-3'>A jeni të sigurtë që dëshironi të fshini këtë koment?</h5>
        <div className='mt-4 mb-4'>
          <Link to='' className='btn' onClick={handleClose} style={{ marginRight: '40px', textDecoration: 'none', color: '#007bff', borderColor: '#007bff' }}>Anulo</Link>
          <Button onClick={handleDelete} className='btn btn-primary' style={{ marginRight: '40px', textDecoration: 'none', color: '#fff', width: '80px' }}>OK</Button>
        </div>
      </Modal.Body>
    </Modal>
  );

  return (
    <div className="d-flex justify-content-center"> 
      <SideNavBar />
      <div className="container" style={{ marginLeft: "300px", marginTop: "50px" }}>
        {rates.map(rate => (
          <div key={rate.id} className="col-md-6 mb-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>{rate.name} {rate.surname}</Card.Title>
                <Card.Title>{renderStars(rate.vleresimi)}</Card.Title>
                <Card.Text>
                  <strong> "</strong>{rate.komenti}<strong>"</strong><br />
                  {rate.data_krijimit}
                </Card.Text>
                <Button variant="danger" onClick={() => openModal(rate.id)}>Fshij komentin</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
        {error && <p className="text-danger">{error}</p>}
        <DeleteConfirmationModal 
          show={showModal} 
          handleClose={closeModal} 
          handleDelete={deleteRate} 
        />
      </div>
    </div>
  );
};

export default RatesList;
