import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import backgroundImage from './login-test2.avif';
import './styles.css';

function JobListing() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [searchText, setSearchText] = useState('');
  const locations = [
    'Deçan', 'Dragash', 'Drenas', 'Ferizaj', 'Fushë Kosovë', 'Gjakovë', 'Gjilan', 'Burim',
    'Kaçanik', 'Dardanë', 'Klinë', 'Lipjan', 'Malishevë', 'Mitrovicë', 'Kastriot', 'Pejë',
    'Besianë', 'Prishtinë', 'Prizren', 'Rahovec', 'Skenderaj', 'Suharekë', 'Shtërpcë', 'Shtime',
    'Viti', 'Vushtrri'
  ];

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleApplyClick = () => {
    // Logic for applying to the job
    console.log('Applied to the job');
  };

  const handleSearchClick = () => {
    // Logic for searching jobs based on selectedCategory, selectedLocation, and searchText
    console.log('Searching jobs in category: ', selectedCategory, ' at location: ', selectedLocation, ' with search text: ', searchText);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleWebpageLink = (url) => {
    window.open(url, '_blank');
  };

  return (
      <div className='job-listing template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary text-white' style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', opacity: 0.85 }}>
        <div className='d-flex flex-column align-items-center'>
          <h1 className="custom-margin"><b>CareerConnect</b></h1>
          <p className='w-50 mt-3'>
            Miresevini ne CareerConnect!
          </p>
          <div className='d-flex justify-content-center'>
            <Button variant="secondary" className="btn-gray me-2" onClick={() => handleWebpageLink('http://localhost:3000/JobListing')}>Go to Job Listings</Button>
            <Button variant="secondary" className="btn-gray me-2" onClick={() => handleWebpageLink('https://yourwebsite.com/internships')}>Internships</Button>
            <Button variant="secondary" className="btn-gray" onClick={() => handleWebpageLink('https://yourwebsite.com/courses')}>Courses</Button>
          </div>
          <div className='d-flex justify-content-center w-75 p-3 bg-transparent'>
            <select className="form-select me-2" style={{ width: '150px' }} onChange={handleCategoryChange} value={selectedCategory}>
              <option value="">All Categories</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
              {/* Add more options as needed */}
            </select>
            <select className="form-select me-2" style={{ width: '150px' }} onChange={handleLocationChange} value={selectedLocation}>
              <option value="">All Locations</option>
              {locations.map(location => (
                  <option key={location} value={location}>{location}</option>
              ))}
            </select>
            <Form.Control type="text" placeholder="Search Text" className="me-2" style={{ width: '150px' }} value={searchText} onChange={handleTextChange} />
            <Button variant="primary" onClick={handleSearchClick}>Search Jobs</Button>
          </div>
          <div className='w-75 p-3 bg-transparent'>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Frontend Developer</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Tech Co.</Card.Subtitle>
                <Card.Text>
                  We are looking for a talented Frontend Developer to join our team.
                  The ideal candidate should have experience with HTML, CSS, JavaScript, and React.js.
                </Card.Text>
                <Button variant="primary" onClick={handleApplyClick}>Apply</Button>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Backend Developer</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Soft Co.</Card.Subtitle>
                <Card.Text>
                  Soft Co. is seeking a skilled Backend Developer proficient in Node.js,
                  MongoDB, and RESTful APIs to join our backend team.
                </Card.Text>
                <Button variant="primary" onClick={handleApplyClick}>Apply</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="mt-3">
            <Button variant="primary" onClick={handleShowModal} style={{ backgroundColor: '#0047AB', width: '150px' }}>Post a Job</Button>
          </div>
        </div>

        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Body className='text-center custom-font'>
            <h5 className='mt-3'>Are you a company looking to hire?</h5>
            <div className='mt-4 mb-4'>
              {/* Link to the page where you can post a job */}
              <Button variant="primary" onClick={handleCloseModal}>Post a Job</Button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
  );
}

export default JobListing;
