import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import ReferenceService from '../Services/ReferenceService';
import editSvg from '../assets/edit-svg.svg'; // Adjust the path as necessary
import deleteSvg from '../assets/delete-svg.svg'; // Adjust the path as necessary

const ReferenceShort = ({ reference: initialReference }) => {
  const [reference, setReference] = useState(initialReference);
  const { reference_id, companyname, name, surname, jobposition, phone_nr, email } = reference || {};
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    reference_id: reference_id || '',
    name: name || '',
    surname: surname || '',
    jobposition: jobposition || '',
    companyname: companyname || '',
    phone_nr: phone_nr || '',
    email: email || '',
  });
  const [errors, setErrors] = useState({});

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
      await ReferenceService.deleteReference(reference_id);
      window.location.reload(); // Reload the page after successful deletion
    } catch (error) {
      console.error('Error deleting reference:', error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Ju lutem plotesoni fushen!';
    if (!formData.surname) errors.surname = 'Ju lutem plotesoni fushen!';
    if (!formData.jobposition) errors.jobposition = 'Ju lutem plotesoni fushen!';
    if (!formData.companyname) errors.companyname = 'Ju lutem plotesoni fushen!';
    if (!formData.phone_nr) {errors.phone_nr = 'Ju lutem plotesoni fushen!';
    } else if (!/^\d{9}$/.test(formData.phone_nr)) {
      errors.phone_nr = 'Numri duhet te kete 9 karaktera';
    }
    if (!formData.email) {
      errors.email = 'Ju lutem plotesoni fushen!';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email nuk është i vlefshëm';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleConfirmEdit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const updatedReference = await ReferenceService.updateReference(reference_id, formData);
      setReference(updatedReference); // Update local state with new data
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating reference:', error);
    }
  };

  return (
    <div className="container">
      <hr />
      <div className="row">
        <div className="col-md-6 d-flex flex-column justify-content-between border-right">
          <div>
            <label>{companyname}</label>
          </div>
          <div>
            <label>{name}</label>
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
        <Modal.Body>A jeni te sigurt qe doni ta fshini referencen?</Modal.Body>
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
          <Modal.Title>Edito Referencen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Emri:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>
              <div className="form-group">
                <label>Mbiemri:</label>
                <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="form-control" />
                {errors.surname && <small className="text-danger">{errors.surname}</small>}
              </div>
              <div className="form-group">
                <label>Pozita e punes:</label>
                <input type="text" name="jobposition" value={formData.jobposition} onChange={handleChange} className="form-control" />
                {errors.jobposition && <small className="text-danger">{errors.jobposition}</small>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Emri i kompanis:</label>
                <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} className="form-control" />
                {errors.companyname && <small className="text-danger">{errors.companyname}</small>}
              </div>
              <div className="form-group">
                <label>Nr. telefonit:</label>
                <input type="text" name="phone_nr" value={formData.phone_nr} onChange={handleChange} className="form-control" />
                {errors.phone_nr && <small className="text-danger">{errors.phone_nr}</small>}
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Anulo
          </Button>
          <Button variant="primary" onClick={handleConfirmEdit}>
            Ruaj Ndryshimet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReferenceShort;
