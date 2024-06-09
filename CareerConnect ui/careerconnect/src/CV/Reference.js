import React, { useState, useEffect } from 'react';
import ReferenceService from '../Services/ReferenceService';
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

  const fetchReference = async () => {
    try {
        const response = await ReferenceService.getReferenceByCvId(idAsInteger);
        console.log('Fetched languages:', response); // Debugging line
        setReferences(response || []); // Ensure languages is an array
    } catch (error) {
        console.error('Error fetching languages:', error);
    }
};

useEffect(() => {
    fetchReference();
}, [idAsInteger]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);

      // Include cvId in the request data
      const { data } = await ReferenceService.createReference(formData,idAsInteger); // Send formData including cvid

      setFormData({
        name: '',
        surname: '',
        jobposition: '',
        companyname: '',
        phone_nr: '',
        email: '',
        cv: idAsInteger
      });
      fetchReference();
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
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Mbiemri:</label>
              <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Pozita e punes:</label>
              <input type="text" name="jobposition" value={formData.jobposition} onChange={handleChange} className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Emri i kompanis:</label>
              <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Nr telefonit:</label>
              <input type="text" name="phone_nr" value={formData.phone_nr} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3 col-12">Shto Reference tjeter</button>
      </form>
    </div>
  );
};

export default Reference;
