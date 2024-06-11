import React, { useEffect, useState } from 'react';
import WorkExperienceService from '../Services/WorkExperienceService';
import WorkExperienceShort from './WorkExperienceShort';
import CvService from '../Services/CvService';

const WorkExperience = () => {
  const employee = sessionStorage.getItem('employeeId');
  const [cv, setCv] = useState(null);
  const [workExperience, setWorkExperience] = useState([]);
  const [formData, setFormData] = useState({
    startingyear: '',
    lastyear: '',
    companyname: '',
    street: '',
    city: '',
    jobposition: '',
    description: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const fetchWorkExperience = async (cvId) => {
    try {
      const response = await WorkExperienceService.getWorkExperienceByCvId(cvId);
      console.log('Fetched work experience:', response);
      setWorkExperience(response || []);
    } catch (error) {
      console.error('Error fetching work experience:', error);
    }
  };

  useEffect(() => {
    if (cv && cv.cvid) {
      fetchWorkExperience(cv.cvid);
    }
  }, [cv]);

  const validateForm = () => {
    const errors = {};
    if (!formData.startingyear) errors.startingyear = 'Ju lutem plotesoni fushen!';
    if (!formData.lastyear) errors.lastyear = 'Ju lutem plotesoni fushen!';
    if (!formData.companyname) errors.companyname = 'Ju lutem plotesoni fushen!';
    if (!formData.street) errors.street = 'Ju lutem plotesoni fushen!';
    if (!formData.city) errors.city = 'Ju lutem plotesoni fushen!';
    if (!formData.jobposition) errors.jobposition = 'Ju lutem plotesoni fushen!';
    if (!formData.description) errors.description = 'Ju lutem plotesoni fushen!';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    try {
      console.log(formData);

      const { data: newWorkExperience } = await WorkExperienceService.createWorkExperience(formData, cv.cvid);

      setFormData({
        startingyear: '',
        lastyear: '',
        companyname: '',
        street: '',
        city: '',
        jobposition: '',
        description: '',
      });
      fetchWorkExperience(cv.cvid);
    } catch (error) {
      console.error('Error creating experience:', error);
    }
  };

  return (
    <div className="reference-form p-4">
      <hr />
      {workExperience && workExperience.length > 0 ? (
        workExperience.map((workExperienceItem, index) => (
          <div key={index}>
            <WorkExperienceShort workExperience={workExperienceItem} />
          </div>
        ))
      ) : (
        <p>No work experience available.</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Viti fillestar:</label>
              <input type="number" name="startingyear" value={formData.startingyear} onChange={handleChange} className="form-control" />
              {errors.startingyear && <small className="text-danger">{errors.startingyear}</small>}
            </div>
            <div className="form-group">
              <label>Lagja:</label>
              <input type="text" name="street" value={formData.street} onChange={handleChange} className="form-control" />
              {errors.street && <small className="text-danger">{errors.street}</small>}
            </div>
            <div className="form-group">
              <label>Emri i kompanis:</label>
              <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} className="form-control" />
              {errors.companyname && <small className="text-danger">{errors.companyname}</small>}
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Viti perfundimtar:</label>
              <input type="number" name="lastyear" value={formData.lastyear} onChange={handleChange} className="form-control" />
              {errors.lastyear && <small className="text-danger">{errors.lastyear}</small>}
            </div>
            <div className="form-group">
              <label>Qyteti:</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" />
              {errors.city && <small className="text-danger">{errors.city}</small>}
            </div>
            <div className="form-group">
              <label>Pozita e punes:</label>
              <input type="text" name="jobposition" value={formData.jobposition} onChange={handleChange} className="form-control" />
              {errors.jobposition && <small className="text-danger">{errors.jobposition}</small>}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Pershkrim:</label>
          <textarea className="form-control" id="description" name="description" style={{ height: '200px' }} placeholder='' value={formData.description} onChange={handleChange}></textarea>
          {errors.description && <small className="text-danger">{errors.description}</small>}
        </div>
        <button type="submit" className="btn btn-primary mt-3 col-12">Shtoni Eksperienc Tjeter</button>
      </form>
    </div>
  );
};

export default WorkExperience;
