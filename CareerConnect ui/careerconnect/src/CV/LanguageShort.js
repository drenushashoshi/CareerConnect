import React, { useState } from 'react';
import { Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LanguageService from '../Services/LanguageService';
import editSvg from '../assets/edit-svg.svg'; // Adjust the path as necessary
import deleteSvg from '../assets/delete-svg.svg'; // Adjust the path as necessary

const LanguageShort = ({ language }) => {
  const { ID } = useParams();
  const idAsInteger = parseInt(ID, 10);
  const { language: lang, level, cvid, languageID } = language || {}; // Destructure with default values
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    cvid: cvid || idAsInteger,
    language: lang || '',
    level: level || '',
    languageID: languageID
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
    setFormData({
      cvid: cvid,
      language: lang,
      level: level,
      languageID:languageID
    });
  };

  const handleConfirmDelete = async () => {
    try {
      await LanguageService.deleteLanguage(languageID); // Use languageID for deletion
      setShowDeleteModal(false);
      // Optionally trigger a refresh of the language list in the parent component
    } catch (error) {
      console.error('Error deleting language:', error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSelect = (e) => {
    setFormData({ ...formData, level: e });
  };

  const handleConfirmEdit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating with data:', formData); // Debugging log
      const { data } = await LanguageService.updateLanguage(languageID, formData); // Use languageID for update
      console.log('Update response:', data); // Debugging log
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating language:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <hr/>
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div>
            <label htmlFor="topParameter">{lang}</label>
          </div>
          <div>
            <label htmlFor="bottomParameter">{level}</label>
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
      <hr/>
      {/* Delete Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this language?
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
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Language</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Language:</label>
                <input type="text" name="language" value={formData.language} onChange={handleChange} className="form-control" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Level:</label>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={formData.level || "Select Level"}
                  onSelect={handleSelect}
                >
                  <Dropdown.Item eventKey="Beginner">Beginner</Dropdown.Item>
                  <Dropdown.Item eventKey="Pre-intermediate">Pre-intermediate</Dropdown.Item>
                  <Dropdown.Item eventKey="Intermediate">Intermediate</Dropdown.Item>
                  <Dropdown.Item eventKey="Upper-Intermediate">Upper-Intermediate</Dropdown.Item>
                  <Dropdown.Item eventKey="Advanced">Advanced</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LanguageShort;
