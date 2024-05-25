import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { deleteWorkExperience, updateWorkExperience } from '../Services/WorkExperienceService';

const WorkExperienceShort = ({ workExperience }) => {
  const { ID } = useParams();
  const idAsInteger = parseInt(ID, 10);
  const { id, companyname, startingyear, lastyear } = workExperience;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState(
    {
      startingyear: '',
      lastyear: '',
      companyname: '',
      street: '',
      city: '',
      jobposition: '',
      description: '',
      cv: idAsInteger
    }
  );
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
    setShowEditModal(true)
  }
  const handleConfirmDelete = async (e) => {
    e.preventDefault();
    try {
      const { data } = await deleteWorkExperience(id);
    }
    catch (error) {
      console.error('Error creating reference:', error);
    }
    setShowDeleteModal(false);
  };
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };
  const handleCloseEditModal = () => {
    setShowEditModal(false);
  }
  const handleConfirmEdit = async (e) => {
    e.preventDefault();
    try {

      // Include cvId in the request data
      const { data } = await updateWorkExperience(id, formData); // Send formData including cvid

      setFormData({
        startingyear: '',
        lastyear: '',
        companyname: '',
        street: '',
        city: '',
        jobposition: '',
        description: '',
        cv: idAsInteger
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error creating reference:', error);
    }
  }
  return (
    <div className="container mt-5">
      <div className="row border p-3">
        <div className="col-md-6 d-flex flex-column justify-content-start">
          <div>
            <p>{companyname}</p>
          </div>
          <div>
            <p>{startingyear} - {lastyear}</p>
          </div>
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          <img
            src="c:\\Users\\MobiShop Selfie\\Downloads\\edit-2-svgrepo-com.svg"
            style={iconStyle}
            alt="Edit"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleEditClick}
          />
          <img
            src="c:\\Users\\MobiShop Selfie\\Downloads\\delete-svgrepo-com.svg"
            style={iconStyle}
            alt="Delete"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleDeleteClick}
          />
        </div>
      </div>
      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/*Edit Modal*/}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Work Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Start Year:</label>
                <input type="number" name="startingyear" value={formData.startingyear} onChange={handleChange} className="form-control" />
              </div>
              <div className="form-group">
                <label>Street:</label>
                <input type="text" name="street" value={formData.street} onChange={handleChange} className="form-control" />
              </div>
              <div className="form-group">
                <label>Company Name:</label>
                <input type="text" name="companyname" value={formData.companyname} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>End Year:</label>
                <input type="number" name="lastyear" value={formData.lastyear} onChange={handleChange} className="form-control" />
              </div>
              <div className="form-group">
                <label>City:</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="form-control" />
              </div>
              <div className="form-group">
                <label>Job Position:</label>
                <input type="text" name="jobposition" value={formData.jobposition} onChange={handleChange} className="form-control" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea className="form-control" id="description" name="description" style={{ height: '200px' }} placeholder='' value={formData.description} onChange={handleChange}></textarea>
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
  )
};

export default WorkExperienceShort;
