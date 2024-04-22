import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { createRate } from '../Services/RateService';

const Rate = () => {
  const [vleresimi, setVleresimi] = useState(null);
  const [komenti, setKomenti] = useState('');
  const [data_krijimit, setDataKrijimit] = useState(null);

  const navigator = useNavigate();

  useEffect(() => {
    getDataKrijimit();
  }, []);

  const getDataKrijimit = () => {
    const date = new Date();
    setDataKrijimit(date.toISOString());
  };

  const handleClick = (value) => {
    setVleresimi(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const rate = { vleresimi, komenti, data_krijimit };
    console.log(rate);
    createRate(rate)
      .then((response) => {
        console.log(response.data);
        navigator('/RatesList');
      })
      .catch((error) => {
        console.error('Error creating rate:', error);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1 className="custom-margin">
        <b>Rate Us</b>
      </h1>

      <p className="w-50 mt-3">
        For us your rating is the spirit of improvements! Please share your experience and give us a star rating. Your
        feedback helps us understand where we can improve and provide better service to you!
      </p>

      <div>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={ratingValue.toString()}
                onClick={() => handleClick(ratingValue)}
              />
              <FaStar
                className="star"
                color={ratingValue <= vleresimi ? '#ffc107' : 'e4e5e9'}
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

      <button onClick={handleSubmit} className="btn btn-primary">
        Submit
      </button>

      {data_krijimit && <p className="mt-3">Current Date: {data_krijimit}</p>}
    </div>
  );
};

export default Rate;
