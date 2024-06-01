import React, { useEffect, useState } from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import RateService from '../Services/RateService';
import CustomNavbar from '../CustomNavbar';
import Footer from '../Footer';

const Rate = () => {
  const [vleresimi, setVleresimi] = useState(null);
  const [komenti, setKomenti] = useState('');
  const [dataKrijimit, setDataKrijimit] = useState(null);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const name=sessionStorage.getItem('name');
  const surname=sessionStorage.getItem('surname');


  const { employeeId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    setFormattedDate();
  }, []);

  const setFormattedDate = () => {
    const date = new Date();
    const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}-${date.getFullYear()}`;
    setDataKrijimit(formattedDate);
  };

  const handleClick = (value) => {
    setVleresimi(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!vleresimi || !komenti.trim()) {
      setError('Please provide a star rating and a comment.');
      return;
    }

    const rate = { vleresimi, komenti, data_krijimit: dataKrijimit, employeeId, name, surname }; 
    console.log(rate);

    try {
      const response = await RateService.createRate(rate);
      console.log(response.data);
      
      setVleresimi(null);
      setKomenti('');
      
      setShowModal(true);
      
      setTimeout(() => {
        setShowModal(false);
        navigate('/EmployeePage');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CustomNavbar/>
      <div className="d-flex flex-column align-items-center">
        <h1 className="custom-margin">
          <b>Na vlerësoni</b>
        </h1>

        <p className="w-50 mt-3">
          Për ne vlerësimi juaj është fryma e përmirësimeve! Ju lutemi ndani përvojën tuaj dhe na jepni një vlerësim me yje.
          Komentet e juaja na ndihmojnë të kuptojmë se ku mund të përmirësojmë dhe të ofrojmë shërbim më të mirë për ju!
        </p>

        <div>
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index} style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue.toString()}
                  onClick={() => handleClick(ratingValue)}
                  style={{ display: 'none' }}
                />
                <FaStar
                  className="star"
                  color={ratingValue <= vleresimi ? '#ffc107' : '#e4e5e9'}
                  size={30}
                />
              </label>
            );
          })}
        </div>

        <div className="mt-4 mb-4">
          <textarea
            id="komenti"
            value={komenti}
            onChange={(e) => setKomenti(e.target.value)}
            placeholder="Shkruani komentin tuaj!"
            className="form-control"
            style={{
              height: '150px',
              paddingTop: '10px',
              paddingLeft: '10px',
              resize: 'none',
              verticalAlign: 'top',
              textAlign: 'left',
            }}
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button onClick={handleSubmit} className="btn btn-primary">
          Dërgo
        </button>
      </div>
      <br/>
      <Footer/>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <FaCheckCircle size={60} color="green" />
          <h4 className="mt-3">Faleminderit për feedback</h4>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Rate;
