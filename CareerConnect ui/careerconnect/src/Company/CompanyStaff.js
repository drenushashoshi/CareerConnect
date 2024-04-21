import React, {useState } from 'react';
import { MDBCard, MDBCardBody, MDBInput, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import { createCompanyStaff } from '../Services/CompanyStaffService';




const CompanyStaff= ({ companyId }) =>{
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [role, setRole] = useState('');

    

    const handleSubmit = (e) => {
        e.preventDefault();
    
    
        
        const companyStaff = {name, surname, role, companyId};
        console.log(companyStaff);
        createCompanyStaff(companyStaff).then((response) => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        
    };
  return (
    <div className="container">
      <div className="row justify-content-start">
        <div className="col-lg-4">
          <MDBCard className="mb-4" style={{ backgroundColor: '#e3f2fd', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
            <form onSubmit={handleSubmit}>
                <MDBCardBody className="text-center">
                    <MDBRow>
                        <MDBCol>
                        <MDBInput 
                            type="text"
                            placeholder='Emri'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        </MDBCol>
                        <MDBCol>
                        <MDBInput 
                            type="text"
                            placeholder='Mbiemri'
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        </MDBCol>
                    </MDBRow><br/>
                    <MDBInput
                        type="text"
                        placeholder='Pozita e punes (p.sh CEO)'
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </MDBCardBody>
                <div className="d-flex justify-content-center">
                    <MDBBtn
                        className='mb-3'
                        type="submit"
                        style={{
                        backgroundColor: 'transparent',
                        color: 'black', 
                        border: '1px solid #0d6efd', 
                        width: '30px', 
                        height: '30px'
                        }}
                        >
                        +
                    </MDBBtn>
                </div>
            </form>
          </MDBCard>
        </div>
      </div>
    </div>
  );
}

export default CompanyStaff;