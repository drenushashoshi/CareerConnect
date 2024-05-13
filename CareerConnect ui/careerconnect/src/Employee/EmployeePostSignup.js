import React, { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';

import { createEmployeePost } from '../Services/EmployeePostService';

const EmployeePost = ({ employeePostId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date] = useState(new Date().toISOString()); // Set the date automatically
    const [attachments, setAttachments] = useState([]); // State to store uploaded attachments
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        
        setTitleError('');
        setContentError('');

        
        let isValid = true;

       
        if (!title.trim()) {
            setTitleError('Ju lutem shtoni titullin!');
            isValid = false;
        }

        if (!content.trim()) {
            setContentError('Ju lutem shtoni përmbajtjen!');
            isValid = false;
        }

        
        
            
            
          
            if (isValid) {
              const employeePost = { title, content, date, attachments};
              console.log(employeePost);
              createEmployeePost(employeePost).then((response) => {
                console.log(response.data);
                navigator('/');
              });
            }
            
          

    };

  
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setAttachments(files);
    };

    return (
        <MDBContainer className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <MDBRow>
                <MDBCol md="10">
                    <p className="text-center mb-4">Fill out the form below to create a new post:</p>
                    <form onSubmit={handleSubmit}>
                        <MDBInput label="Titulli" value={title} onChange={(e) => setTitle(e.target.value)} />
                        {titleError && <div className="error">{titleError}</div>}
                        <MDBInput type="textarea" label="Përmbajtja" value={content} onChange={(e) => setContent(e.target.value)} />
                        {contentError && <div className="error">{contentError}</div>}
                        <MDBInput type="file" label="Attachments" multiple onChange={handleFileChange} />
                        {/* Hidden input for date */}
                        <input type="hidden" value={date} />
                        <MDBBtn color="primary" type="submit">Submit</MDBBtn>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
};

export default EmployeePost;
