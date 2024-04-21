import React, { useState, useEffect } from 'react';
import { listCompanyStaffs } from '../Services/CompanyStaffService';
import {
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBCardText
} from 'mdb-react-ui-kit';

const ListStaff = ({ companyId }) => {
    const [companyStaff, setCompanyStaff] = useState([]);

    useEffect(() => {
        listCompanyStaffs(companyId)
            .then((response) => {
                setCompanyStaff(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [companyId]);

    return (
        <div className="container">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                {companyStaff.map(companyStaff => (
                    <div key={companyStaff.id} className="col mb-4">
                        <MDBCard className="h-100" style={{ backgroundColor: '#e3f2fd', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
                            <MDBCardBody className="text-center">
                                <MDBRow>
                                    <MDBCardText>{companyStaff.name} {companyStaff.surname}</MDBCardText>
                                </MDBRow>
                                <MDBCardText>{companyStaff.role}</MDBCardText>
                            </MDBCardBody>
                        </MDBCard>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListStaff;
