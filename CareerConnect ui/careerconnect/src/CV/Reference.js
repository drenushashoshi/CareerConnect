import React, { useState, useEffect } from 'react';
import { createReference, getReferenceByCvId } from '../Services/ReferenceService';
import { useParams } from 'react-router-dom';
import ReferenceShort from './ReferenceShort';

const Reference = () => {
  const { id } = useParams();
  const [references, setReferences] = useState([])
  const idAsInteger = parseInt(id, 10);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    jobposition: '',
    companyname: '',
    phone_nr: '',
    email: '',
    cv: idAsInteger
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchReferences = async () => {
      try {
        const { data } = await getReferenceByCvId(idAsInteger);
        setReferences(data);
      } catch (error) {
        console.error('Error fetching references:', error);
      }
    };
    fetchReferences();
  }, [idAsInteger]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(id);
      console.log(formData);

      // Include cvId in the request data
      const { data } = await createReference(formData); // Send formData including cvid

      setFormData({
        name: '',
        surname: '',
        jobposition: '',
        companyname: '',
        phone_nr: '',
        email: '',
        cv: idAsInteger
      });
    } catch (error) {
      console.error('Error creating reference:', error);
    }
  };

  return (
    <div className="reference-form p-4">
      <hr />
      {references.map((reference, index) => (
        <div key={index}>
          <ReferenceShort reference={reference} />
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Surname:</label>
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Job Position:</label>
              <input type="text" name="jobposition" value={formData.jobposition} onChange={handleChange} className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Company Name:</label>
              <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input type="text" name="phone_nr" value={formData.phone_nr} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3 col-12">Add Another Reference</button>
      </form>
    </div>
  );
};

export default Reference;