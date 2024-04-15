import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJob } from '../Services/JobService';
import CustomNavbar from '../CustomNavbar';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        getJob(id)
            .then(response => {
                // Format the description and requirements text with line breaks
                const formattedDescription = response.data.description.replace(/\n/g, "<br>");
                const formattedRequirements = response.data.requirements.replace(/\n/g, "<br>");

                // Update the job object with formatted text
                setJob({ ...response.data, description: formattedDescription, requirements: formattedRequirements });
            })
            .catch(error => {
                console.error('Error fetching job details:', error);
            });
    }, [id]);

    if (!job) {
        return <div>Loading...</div>;
    }

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
                                            }}>{job.title}</h2>
                                            <p>Kompania</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="job-post-details">
                                    <div className="post-details1 mb-50">
                                        <div className="small-section-tittle">
                                            <h4>Job Description</h4>
                                        </div>
                                        <p dangerouslySetInnerHTML={{__html: job.description}}></p>
                                    </div>
                                    <div className="post-details2 mb-50">
                                        <div className="small-section-tittle">
                                            <h4>Required Knowledge, Skills, and Abilities</h4>
                                        </div>
                                        <ul>
                                            <p dangerouslySetInnerHTML={{__html: job.requirements}}></p>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4">
                                <div className="post-details3 mb-4"
                                     style={{backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px'}}>
                                    <div className="small-section-tittle">
                                        <h4>Job Overview</h4>
                                    </div>
                                    <ul>
                                        <li>Location: <span>{job.location}</span></li>
                                        <li>Job nature: <span>{job.jobType}</span></li>
                                        <li>Salary: <span>{job.salary}</span></li>
                                        <li>Deadline: <span>{job.deadline}</span></li>
                                    </ul>
                                    {/* Change the Button to Link */}
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
                                        <li>Name: <span>of company</span></li>
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

export default JobDetails;
