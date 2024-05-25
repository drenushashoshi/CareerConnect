import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteLanguage, updateLanguage } from '../Services/LanguageService';

const LanguageShort = ({ Language }) => {
  const { ID } = useParams();
  const idAsInteger = parseInt(ID, 10);
  const { id, companyname, name } = Language;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState(
    {
      language: '',
      level: '',
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
      const { data } = await deleteLanguage(id);
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
      const { data } = await updateLanguage(id, formData); // Send formData including cvid

      setFormData({
        language: '',
        level: '',
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
        <div className="col-md-6 d-flex flex-column justify-content-between border-right">
          <div>
            <label htmlFor="topParameter">{Language}</label>
            <input type="text" id="topParameter" className="form-control" />
          </div>
          <div>
            <label htmlFor="bottomParameter">{Level}</label>
            <input type="text" id="bottomParameter" className="form-control" />
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
          <Modal.Title>Edit Reference</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Language:</label>
                <input type="text" name="Language" value={values.Language} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Level:</label>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={values.Level || "Select Level"}
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="No-proficiency">Beginner</Dropdown.Item>
                  <Dropdown.Item eventKey="Elementary proficiency">Pre-intermediate</Dropdown.Item>
                  <Dropdown.Item eventKey="Limited working proficiency">Intermediate</Dropdown.Item>
                  <Dropdown.Item eventKey="Professional working proficiency">Upper-Intermediate</Dropdown.Item>
                  <Dropdown.Item eventKey="Primary fluency / bilingual proficiency">Advanced</Dropdown.Item>
                </DropdownButton>
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

export default LanguageShort;
