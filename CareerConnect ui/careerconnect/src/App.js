
import React from 'react'
import { BrowserRouter,Routes,Route }from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import JobListing from './JobListing';
import CompanyList from './CompanyList';
import CompanyPage from './CompanyPage';
import EditCompanyProfile from './EditCompanyProfile';
import PostJob from "./PostJob";
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
          <Route path='/jobListing' element={<JobListing/>}></Route>
          <Route path='/CompanyList' element={<CompanyList/>}></Route>
          <Route path='/CompanyPage' element={<CompanyPage/>}></Route>
          <Route path='/postJob' element={<PostJob/>}></Route>
          <Route path='/CompanyPage/:id' element={<CompanyPage/>}></Route>
          <Route path='/EditCompanyProfile' element={<EditCompanyProfile/>}></Route>
          <Route path='/EditCompanyProfile/:id' element={<EditCompanyProfile/>}></Route>
          <Route path='/ApplicationForm' element={<Application/>}></Route>
          <Route path='/ApplicationList' element={<ApplicationList/>}></Route>
          <Route path='/Application/:id' element={<ApplicationDetail/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
