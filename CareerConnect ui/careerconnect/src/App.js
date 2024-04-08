
import React from 'react'
import { BrowserRouter,Routes,Route }from 'react-router-dom'
import Login from './Login';
import Signup from './Signup';
import JobListing from './JobListing';
import CompanyList from './CompanyList';
import CompanyPage from './CompanyPage';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/jobListing' element={<JobListing/>}></Route>
          <Route path='/CompanyList' element={<CompanyList/>}></Route>
          <Route path='/CompanyPage' element={<CompanyPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
