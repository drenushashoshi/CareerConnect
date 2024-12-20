import React, { useEffect, useState } from 'react';
import Reference from './Reference';
import 'bootstrap/dist/css/bootstrap.min.css';
import WorkExperience from './WorkExperience';
import Language from './Language';
import { useNavigate, useParams } from 'react-router-dom';
import CustomNavbar from '../CustomNavbar';
import Footer from '../Footer';
import EmployeeService from '../Services/EmployeeService';

const AdditionalInfo = () => {
  const navigator = useNavigate();
  const [isReferenceVisible, setIsReferenceVisible] = useState(false);
  const [isExpereienceVisible, setIsExpereienceVisible] = useState(false);
  const [isLanguageVisible, setIsLanguageVisible] = useState(false);

  const handleReferenceClick = () => {
    setIsReferenceVisible(!isReferenceVisible);
  };

  const handleExperienceClick = () => {
    setIsExpereienceVisible(!isExpereienceVisible);
  };

  const handleLanguageClick = () => {
    setIsLanguageVisible(!isLanguageVisible);
  };
  const navigate = () => {
    navigator(`/Cv`)
  }
  useEffect(()=>{

    if (!EmployeeService.isAuthenticated()) {
        navigator('/');
    }
  },[navigator])

  return (
    <>
          <CustomNavbar />
      <div className='mt-5 text-center'><h1>Informacioni juaj:</h1></div>
      <div className="container mt-3">
        <div className="row justify-content-center">
          <div className='col-9'>
            <div className="card p-3 mt-5 shadow">
              <div onClick={handleReferenceClick} className="click-to-add mb-3 text-center"><span className="mr-2" role="button" aria-label="reference">📝 Referencat</span></div>
              {isReferenceVisible && <Reference onClose={() => setIsReferenceVisible(false)} />}
            </div>
            <div className="card p-3 mt-5 shadow">
              <div onClick={handleExperienceClick} className="click-to-add mb-3 text-center"><span className="mr-2" role="button" aria-label="briefcase">💼 Eksperienca Punes:</span></div>
              {isExpereienceVisible && <WorkExperience onClose={() => setIsExpereienceVisible(false)} />}
            </div>
            <div className="card p-3 mt-5 shadow">
              <div onClick={handleLanguageClick} className="click-to-add mb-3 text-center"><span className="mr-2" role="button" aria-label="briefcase">🌐 Gjuhet</span></div>
              {isLanguageVisible && <Language onClose={() => setIsLanguageVisible(false)} />}
            </div>
            <div className="card mt-5 shadow">
            <button onClick={navigate} className='btn btn-primary'>Perfundo</button>
            </div><br/><br/>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default AdditionalInfo;
