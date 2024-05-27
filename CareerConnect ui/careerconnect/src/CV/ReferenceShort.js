import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
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

  const handleConfirmEdit = async (e) => {
    e.preventDefault();
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
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Reference</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" />
              </div>
              <div className="form-group">
                <label>Surname:</label>
                <input type="text"               name="surname" value={formData.surname} onChange={handleChange} className="form-control" />
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReferenceShort;

