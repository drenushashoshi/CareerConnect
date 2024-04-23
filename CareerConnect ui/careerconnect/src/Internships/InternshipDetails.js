import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import { getInternship } from '../Services/InternshipService';

const InternshipDetails = () => {

    const [tittle, setTittle] = useState('');
    const [company_name, setCompany_name] = useState('');
    const [description, setDescription] = useState('');
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date] = useState('');
    const [requirements, setRequirements] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [deadline, setDeadline] = useState('');

    const { id } = useParams();
    const [internship, setInternship] = useState(null);

    useEffect(() => {
        if (id) {
          getInternship(id)
            .then((response) => {
              setTittle(response.data.tittle);
              setCompany_name(response.data.company_name);
              setStart_date(response.data.start_date);
              setEnd_date(response.data.end_date);
              setRequirements(response.data.requirements);
              setDescription(response.data.description);
              setLocation(response.data.location);
              setType(response.data.type);
              setDeadline(response.data.deadline);
            
            })
            .catch(error => {
              console.error(error);
            });
        }
      }, [id]);



    return (
        <>
            <CustomNavbar />
            <main>
                <div className="job-post-company pt-120 pb-120">
                    <div className="container">
                        <div className="row justify-content-between">
                            <div className="col-xl-7 col-lg-8">
                                <div className="single-job-items mb-50">
                                    <div className="job-items">
                                        <div className="job-tittle">
                                            <h2 style={{
                                                color: '#2B3940',
                                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                                            }}>{tittle}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-post-details">
                                    <div className="post-details1 mb-50">
                                        <div className="small-section-tittle">
                                            <h4>Internship Description</h4>
                                        </div>
                                        <p dangerouslySetInnerHTML={{__html: description}}></p>
                                    </div>
                                    <div className="post-details2 mb-50">
                                        <div className="small-section-tittle">
                                            <h4>Required Knowledge, Skills, and Abilities</h4>
                                        </div>
                                        <ul>
                                            <p dangerouslySetInnerHTML={{__html:requirements}}></p>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <div className="post-details3 mb-4"
                                     style={{backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px'}}>
                                    <div className="small-section-tittle">
                                        <h4>Internship Overview</h4>
                                    </div>
                                    <ul>
                                        <li>Location: <span>{location}</span></li>
                                        <li>Job nature: <span>{type}</span></li>
                                        <li>Start Date: <span>{start_date}</span></li>
                                        <li>End Date: <span>{end_date}</span></li>
                                        <li>Deadline: <span>{deadline}</span></li>
                                    </ul>
                                    <div className="apply-btn2">
                                        <Link to="/applications" className="btn btn-primary">Apply Now</Link>
                                    </div>
                                </div>
                                <div className="post-details4 mb-4"
                                     style={{backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px'}}>
                                    <div className="small-section-tittle">
                                        <h4>Company Information</h4>
                                    </div>
                                    <span>company</span>
                                    <p>company info</p>
                                    <ul>
                                        <li>Name of company: <span>{company_name}</span></li>
                                        <li>Email: <span>of company</span></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default InternshipDetails;