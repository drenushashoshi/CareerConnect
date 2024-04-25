import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CV = () => {
    return (
        <div className="container">
            <div className="row justify-content-center">
                {/* Left Part */}
                <div className="col-lg-4 bg-dark text-light">
                    <div className="section">
                        <div className="text-center mb-4">
                            <img src="profile-pic.jpg" alt="Profile Picture" className="img-fluid rounded-circle" style={{ maxWidth: '150px' }} />
                        </div>
                        <div>
                            <p><strong>Name:</strong> John Doe</p>
                            <p><strong>Email:</strong> johndoe@example.com</p>
                            <p><strong>Phone:</strong> +1 (123) 456-7890</p>
                            <p><strong>Address:</strong> 123 Main St, City, Country</p>
                        </div>
                        <div className="mt-4">
                            <h2 className="mb-4">Education</h2>
                            <p><strong>University:</strong> University Name</p>
                            <p><strong>Degree:</strong> Bachelor of Science in Computer Science</p>
                            <p><strong>Year:</strong> 2010 - 2014</p>
                            <p><strong>College:</strong> College Name</p>
                            <p><strong>Stream:</strong> Science</p>
                            <p><strong>Year:</strong> 2008 - 2010</p>
                        </div>
                    </div>
                </div>
                
                {/* Right Part */}
                <div className="col-lg-8">
                    <div className="section">
                        <h1 className="mb-2">NAME AND SURNAME</h1>
                        <h3 className="mb-4">JOB POSITION</h3>
                        <p>Description place</p>
                    </div>
                    <div className="section">
                        <h2 className="mb-4">Experience</h2>
                        <p><strong>Starting Year-Last Year</strong></p>
                        <p><strong>Company Name,Street,City</strong></p>
                        <p><strong>Job Position</strong></p>
                        <p>Description</p>
                    </div>
                    <div className="section">
                        <h2 className="mb-4">Reference</h2>
                        <p>Name And Surname</p>
                        <p>Job Position Company Name</p>
                        <p>Phone: xxx-xxx-xxx</p>
                        <p>Email: Name.Surname@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CV;
