
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
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
          <Route path='/Applications' element={<Application/>}></Route>
          <Route path='/ApplicationList' element={<ApplicationList/>}></Route>
          <Route path='/Application/:id' element={<ApplicationDetail/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
