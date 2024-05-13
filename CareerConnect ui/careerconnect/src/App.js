
import React from 'react'
import { BrowserRouter,Routes,Route }from 'react-router-dom'
import Login from './Login';
import Signup from './Company/Signup';
import CompanyList from './Company/CompanyList';
import CompanyPage from './Company/CompanyPage';
import EditCompanyProfile from './Company/EditCompanyProfile';
import PostJob from "./Jobs/PostJob";
import JobListing from './Jobs/JobListing';
import AllJobs from "./Jobs/AllJobs";
import EditJob from "./Jobs/EditJob";
import JobDetails from './Jobs/JobDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import Application from './Applications/Application';
import ApplicationList from './Applications/ApplicationList';
import ApplicationDetail from './Applications/ApplicationDetail';
import EditEmployee from './Employee/EditEmployee';
import EmployeePage from "./Employee/EmployeePage";
import EmployeeList from "./Employee/EmployeeList";
import EmployeeSignUp from './Employee/EmployeeSignUp';
import Rate from './Rate/Rate';
import PostInternship from './Internships/PostInternship';
import InternshipsList from './Internships/InternshipsList';
import InternshipDetails from './Internships/InternshipDetails';
import EditInternship from './Internships/EditInternship';
import CompanyStaff from './Company/CompanyStaff';
import ListStaff from './Company/ListStaff';


import EmployeePostList from './Employee/EmployeePostList';
import EmployeePostSignup from './Employee/EmployeePostSignup';

import RatesList from './Rate/RatesList';
import CvInfo from './CV/CvInfo';
import CompanysInternships from './Internships/CompanysInternships';
import Dashboard from './Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/EmployeeSignUp' element={<EmployeeSignUp/>}></Route>
          <Route path='/CompanyList' element={<CompanyList/>}></Route>
          <Route path='/CompanyPage' element={<CompanyPage/>}></Route>
          <Route path='/CompanyStaff' element={<CompanyStaff/>}></Route>
          <Route path='/postJob' element={<PostJob/>}></Route>
          <Route path='/jobListing' element={<JobListing/>}></Route>
          <Route path='/alljobs' element={<AllJobs/>}></Route>
          <Route path='/edit-job/:id' element={<EditJob/>}></Route>
          <Route exact path="/job/:id" element={<JobDetails/>} />
          <Route path='/CompanyPage/:id' element={<CompanyPage/>}></Route>
          <Route path='/EditCompanyProfile' element={<EditCompanyProfile/>}></Route>
          <Route path='/EditCompanyProfile/:id' element={<EditCompanyProfile/>}></Route>
          <Route path='/Applications' element={<Application/>}></Route>
          <Route path='/ApplicationList' element={<ApplicationList/>}></Route>
          <Route path='/Application/:id' element={<ApplicationDetail/>}></Route>
          <Route path='/EmployeePage/:id' element={<EmployeePage/>}></Route>
          <Route path='/EmployeePage' element={<EmployeePage/>}></Route>
          <Route path='/EmployeeList' element={<EmployeeList/>}></Route>
          <Route path='/EditEmployee' element={<EditEmployee/>}></Route>
          <Route path='/EditEmployee/:id' element={<EditEmployee/>}></Route>
          <Route path='/EmployeePostSignup' element={<EmployeePostSignup/>}></Route>
          <Route path='/EmployeePostList' element={<EmployeePostList/>}></Route>
          <Route path='/Rate' element={<Rate/>}></Route>
          <Route path='/ListStaff' element={<ListStaff/>}></Route>
          <Route path='/RatesList' element={<RatesList/>}></Route>
          <Route path='/PostInternship' element={<PostInternship/>}></Route>
          <Route path='/PostInternship/:companyId' element={<PostInternship/>}></Route>
          <Route path='/InternshipsList' element={<InternshipsList/>}></Route>
          <Route path='/InternshipDetails' element={<InternshipDetails/>}></Route>
          <Route path='/CompanysInternships' element={<CompanysInternships/>}></Route>
          <Route path='/InternshipDetails/:id' element={<InternshipDetails/>}></Route>
          <Route path='/EditInternship' element={<EditInternship/>}></Route>
          <Route path='/EditInternship/:id' element={<EditInternship/>}></Route>
          <Route path='/CvCreate' element={<CvInfo/>}></Route>
          <Route path='/Dashboard' element={<Dashboard/>}></Route>
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
