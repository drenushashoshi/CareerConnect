import React, { useState } from 'react';
import { Button, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import LanguageService from '../Services/LanguageService';
import editSvg from '../assets/edit-svg.svg';
import deleteSvg from '../assets/delete-svg.svg';

const LanguageShort = ({ initialLanguage }) => {
  const { id } = useParams();
  const idAsInteger = parseInt(id, 10);
  const [Language, setLanguage] = useState(initialLanguage);
  const { language: lang, level, languageID } = Language || {};
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    cvid: idAsInteger,
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
  };

  const handleConfirmDelete = async () => {
    try {
      await LanguageService.deleteLanguage(languageID);
      setShowDeleteModal(false);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting language:', error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setShowEditModal(false);
  };

  const handleSelect = (e) => {
    setFormData({ ...formData, level: e });
  };

  const handleConfirmEdit = async (e) => {
    e.preventDefault();
    try {
      console.log('Updating with data:', formData);
      const updatedLanguage = await LanguageService.updateLanguage(languageID, formData);
      setLanguage(updatedLanguage);
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
      <Modal show={showDeleteModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Konfirmo Fshirjen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          A jeni te sigurt qe doni ta fshini gjuhen?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Anulo
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEditModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edito Gjuhen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Gjuha:</label>
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
                  <Dropdown.Item eventKey="Fillestar">Fillestar</Dropdown.Item>
                  <Dropdown.Item eventKey="Nen-Mesatar">Nen-Mesatar</Dropdown.Item>
                  <Dropdown.Item eventKey="Mesatar">Mesatar</Dropdown.Item>
                  <Dropdown.Item eventKey="Permbi-Mesatar">Permbi-Mesatar</Dropdown.Item>
                  <Dropdown.Item eventKey="Avancum">Avancum</Dropdown.Item>
                </DropdownButton>
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

export default LanguageShort;
