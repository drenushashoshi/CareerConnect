import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorkExperienceService from '../Services/WorkExperienceService';
import WorkExperienceShort from './WorkExperienceShort';

const WorkExperience = () => {
  const { id } = useParams();
  const idAsInteger = parseInt(id, 10);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const fetchWorkExperience = async () => {
    try {
        const response = await WorkExperienceService.getWorkExperienceByCvId(idAsInteger);
        console.log('Fetched experience:', response); // Debugging line
        setWorkExperience(response || []); // Ensure languages is an array
    } catch (error) {
        console.error('Error fetching experience:', error);
    }
  };

  useEffect(() => {
    fetchWorkExperience();
  }, [idAsInteger]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(id);
      console.log(formData);

      // Include cvId in the request data
      const { data: Reference } = await WorkExperienceService.createWorkExperience(formData,idAsInteger); // Send formData including cvid

      setFormData({
        startingyear: '',
        lastyear: '',
        companyname: '',
        street: '',
        city: '',
        jobposition: '',
        description: '',
      });
      fetchWorkExperience();
    } catch (error) {
      console.error('Error creating experience:', error);
    }
  };

  return (
    <div className="reference-form p-4">
      <hr />
      {workExperience && workExperience.length > 0 ? (
                workExperience.map((workExperience, index) => (
                    <div key={index}>
                        <WorkExperienceShort workExperience={workExperience} />
                    </div>
                ))
            ) : (
                <p></p>
            )}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Viti fillestar:</label>
              <input type="number" name="startingyear" value={formData.startingyear} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Lagja:</label>
              <input type="text" name="street" value={formData.street} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Emri i kompanis:</label>
              <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} className="form-control" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Viti perfundimtar:</label>
              <input type="number" name="lastyear" value={formData.lastyear} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Qyteti:</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" />
            </div>
            <div className="form-group">
              <label>Pozita e punes:</label>
              <input type="text" name="jobposition" value={formData.jobposition} onChange={handleChange} className="form-control" />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="description">Pershkrim:</label>
          <textarea className="form-control" id="description" name="description" style={{ height: '200px' }} placeholder='' value={formData.description} onChange={handleChange}></textarea>
        </div>
        <button type="submit" className="btn btn-primary mt-3 col-12">Shtoni Eksperienc Tjeter</button>
      </form>
    </div>
  );
};

export default WorkExperience;
