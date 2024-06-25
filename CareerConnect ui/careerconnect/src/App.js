
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
import LocationDashboard from "./Location/LocationDashboard";
import IndustriaDashboard from "./Industria/IndustriaDashboard";
import AdditionalInfo from './CV/AdditionalInfo';
import CV from './CV/CV';

import RatesList from './Rate/RatesList';
import CvInfo from './CV/CvInfo';
import CompanysInternships from './Internships/CompanysInternships';
import Dashboard from './Dashboard';
import CvEdit from './CV/CvEdit';
import JobApplication from './Applications/JobApplication';
import InternshipApplication from './Applications/InternshipApplication';
import ApplicationJob from './Applications/ApplicationJob'
import ApplicationInternship from './Applications/ApplicationsInternship'
import CompanyCV from './CV/CompanyCV';
import NotificationDropdown from "./Notification/Notification";



function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/EmployeeSignUp' element={<EmployeeSignUp/>}></Route>
          <Route path='/CompanyList' element={<CompanyList/>}></Route>
          <Route path='/CompanyPage' element={<CompanyPage/>}></Route>
          <Route path='/postJob' element={<PostJob/>}></Route>
          <Route path='/jobListing' element={<JobListing/>}></Route>
          <Route path='/alljobs' element={<AllJobs/>}></Route>
          <Route path='/edit-job/:id' element={<EditJob/>}></Route>
          <Route exact path="/job/:id" element={<JobDetails/>} />
          <Route path='/CompanyPage/:id' element={<CompanyPage/>}></Route>
          <Route path='/EditCompanyProfile' element={<EditCompanyProfile/>}></Route>
          <Route path='/EditCompanyProfile/:id' element={<EditCompanyProfile/>}></Route>
          <Route path='/applications/:id' element={<JobApplication/>}></Route>
          <Route path='/EmployeePage/:id' element={<EmployeePage/>}></Route>
          <Route path='/EmployeePage' element={<EmployeePage/>}></Route>
          <Route path='/EmployeeCV' element={<CompanyCV/>}></Route>
          <Route path='/EmployeeList' element={<EmployeeList/>}></Route>
          <Route path='/EditEmployee' element={<EditEmployee/>}></Route>
          <Route path='/EditEmployee/:id' element={<EditEmployee/>}></Route>
          <Route path='/Rate' element={<Rate/>}></Route>
          <Route path='/Rate/:employeeId' element={<Rate/>}></Route>
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
          <Route path='/LocationDashboard' element={<LocationDashboard/>}></Route>
          <Route path='/IndustriaDashboard' element={<IndustriaDashboard/>}></Route>
          <Route path='/CvInfo' element={<AdditionalInfo/>}></Route>
          <Route path='/Cv' element={<CV/>}></Route>
          <Route path='/CvEdit' element={<CvEdit/>}></Route>
          <Route path='/InternshipApplication/:id' element={<InternshipApplication/>}></Route>
          <Route path='/ApplicationsJob/:id' element={<ApplicationJob/>}></Route>
          <Route path='/ApplicationsInternship/:id' element={<ApplicationInternship/>}></Route>
          <Route path='/Notification' element={<NotificationDropdown/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
