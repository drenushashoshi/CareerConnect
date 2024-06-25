import React, { useState, useEffect } from 'react';
import ReferenceService from '../Services/ReferenceService';
import ReferenceShort from './ReferenceShort';
import CvService from '../Services/CvService';

const Reference = () => {
  const [references, setReferences] = useState([]);
  const [cv, setCv] = useState(null);
  const employee = sessionStorage.getItem('employeeId');

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    jobposition: '',
    companyname: '',
    phone_nr: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCv();
  }, [employee]);

  const fetchCv = async () => {
    try {
      const response = await CvService.getCvByEmployeeId(employee);
      setCv(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReference = async (cvId) => {
    try {
      const response = await ReferenceService.getReferenceByCvId(cvId);
      console.log('Fetched references:', response);
      setReferences(response || []);
    } catch (error) {
      console.error('Error fetching references:', error);
    }
  };

  useEffect(() => {
    if (cv && cv.cvid) {
      fetchReference(cv.cvid);
    }
  }, [cv]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Ju lutem plotesoni fushen!';
    if (!formData.surname) newErrors.surname = 'Ju lutem plotesoni fushen!';
    if (!formData.jobposition) newErrors.jobposition = 'Ju lutem plotesoni fushen!';
    if (!formData.companyname) newErrors.companyname = 'Ju lutem plotesoni fushen!';
    if (!formData.phone_nr) {
      newErrors.phone_nr = 'Ju lutem plotesoni fushen!';
    } else if (!/^\d{9}$/.test(formData.phone_nr)) {
      newErrors.phone_nr = 'Numri i telefonit duhet të përmbajë 9 shifra';
    }
    if (!formData.email) {
      newErrors.email = 'Ju lutem plotesoni fushen!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email nuk është i vlefshëm';
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      console.log(formData);

      await ReferenceService.createReference(formData, cv.cvid);

      setFormData({
        name: '',
        surname: '',
        jobposition: '',
        companyname: '',
        phone_nr: '',
        email: '',
      });

      fetchReference(cv.cvid);
    } catch (error) {
      console.error('Error creating reference:', error);
    }
  };

  return (
    <div className="reference-form p-4">
      <hr />
      {references && references.length > 0 ? (
        references.map((reference, index) => (
          <div key={index}>
            <ReferenceShort reference={reference} />
          </div>
        ))
      ) : (
        <p></p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Emri:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label>Mbiemri:</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className={`form-control ${errors.surname ? 'is-invalid' : ''}`}
              />
              {errors.surname && <div className="invalid-feedback">{errors.surname}</div>}
            </div>
            <div className="form-group">
              <label>Pozita e punes:</label>
              <input
                type="text"
                name="jobposition"
                value={formData.jobposition}
                onChange={handleChange}
                className={`form-control ${errors.jobposition ? 'is-invalid' : ''}`}
              />
              {errors.jobposition && <div className="invalid-feedback">{errors.jobposition}</div>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Emri i kompanis:</label>
              <input
                type="text"
                name="companyname"
                value={formData.companyname}
                onChange={handleChange}
                className={`form-control ${errors.companyname ? 'is-invalid' : ''}`}
              />
              {errors.companyname && <div className="invalid-feedback">{errors.companyname}</div>}
            </div>
            <div className="form-group">
              <label>Nr telefonit:</label>
              <input
                type="text"
                name="phone_nr"
                value={formData.phone_nr}
                onChange={handleChange}
                className={`form-control ${errors.phone_nr ? 'is-invalid' : ''}`}
              />
              {errors.phone_nr && <div className="invalid-feedback">{errors.phone_nr}</div>}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3 col-12">Shto Reference tjeter</button>
      </form>
    </div>
  );
};

export default Reference;
