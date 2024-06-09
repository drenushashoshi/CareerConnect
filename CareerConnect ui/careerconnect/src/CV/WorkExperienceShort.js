import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import WorkExperienceService from '../Services/WorkExperienceService';
import editSvg from '../assets/edit-svg.svg';
import deleteSvg from '../assets/delete-svg.svg';

const WorkExperienceShort = ({ workExperience: initialWorkExperience }) => {
  const { ID } = useParams();
  const idAsInteger = parseInt(ID, 10);
  const [workExperience, setWorkExperience] = useState(initialWorkExperience);
  const { experience_id, companyname, startingyear, lastyear, street, city, jobposition, description, CV } = workExperience || {};
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    experience_id: experience_id || '',
    startingyear: startingyear || '',
    lastyear: lastyear || '',
    companyname: companyname || '',
    street: street || '',
    city: city || '',
    jobposition: jobposition || '',
    description: description || '',
    CV: CV || idAsInteger
  });

  useEffect(() => {
    setFormData({
      experience_id: experience_id || '',
      startingyear: startingyear || '',
      lastyear: lastyear || '',
      companyname: companyname || '',
      street: street || '',
      city: city || '',
      jobposition: jobposition || '',
      description: description || '',
      CV: CV || idAsInteger
    });
  }, [workExperience]);

  const iconStyle = {
    height: '30px',
    width: '30px',
    cursor: 'pointer',
    transition: 'filter 0.2s ease'
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.filter = 'brightness(0.8)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.filter = 'brightness(1)';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    try {
      await WorkExperienceService.deleteWorkExperience(experience_id);
      window.location.reload(); // Reload the page after successful update
      // Optionally, handle the state update or callback after deletion
    } catch (error) {
      console.error('Error deleting work experience:', error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const handleConfirmEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedExperience = await WorkExperienceService.updateWorkExperience(experience_id, formData);
      setWorkExperience(updatedExperience); // Update local state with new data
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating work experience:', error);
    }
  };

  return (
    <div className="container">
      <hr />
      <div className="row">
        <div className="col-md-6 d-flex flex-column justify-content-start">
          <div>
            <label>{companyname}</label>
          </div>
          <div>
            <label>{startingyear} - {lastyear}</label>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <img
            src={editSvg}
            style={iconStyle}
            alt="Edit"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleEditClick}
          />
          <img
            src={deleteSvg}
            style={iconStyle}
            alt="Delete"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleDeleteClick}
          />
        </div>
      </div>
      <hr />
      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmo Fshirjen</Modal.Title>
        </Modal.Header>
        <Modal.Body>A jeni te sigurt qe doni ta fshini eksperiencen?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Anulo
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edito Eksperiencen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Anulo
          </Button>
          <Button variant="danger" onClick={handleConfirmEdit}>
            Ruaj Ndryshimet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default WorkExperienceShort;
