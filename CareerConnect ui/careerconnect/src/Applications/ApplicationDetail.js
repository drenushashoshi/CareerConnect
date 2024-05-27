import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import ApplicationService from '../Services/ApplicationService';
import Application from './Application';
import { Prev } from 'react-bootstrap/esm/PageItem';

const ApplicationDetail = (updateApplication,updateResume) => {
    const inputRef = useRef();
    const [Application,setApplication] = useState({
        id:'',
        name: '',
        email:'',
        City: '',
        Age: '',
        Description: '',
        Gender: '',
        cv:'',
    });
    const {id} = useParams();

    const fetchApplication = async (id) =>
    {
        try{
            const {data} = await ApplicationService.getApplication(id);
            setApplication(data);
        }
        catch(error)
        {
            console.log(error)
        }
    };

    const onChange = (event) => {
        setApplication({...Application,[event.target.name]:event.target.value})
    }

    const onUpdateApplication = async (event) =>
    {
        event.preventDefault();
        await updateApplication(Application);
        fetchApplication(id);
    }

    useEffect(()=>{fetchApplication(id);},[]);

    const selectFile = ()=>{
        inputRef.current.click();
    };

    const updateCV = async (file)=>{
        try{
            const formData = new formData();
            formData.append('file',file,file.name);
            formData.append('id',id);
            await updateResume(formData);
            setApplication((Prev)=>({...Prev,cv: `${Prev.cv}$updated_at=${new Date().getTime()}`}));
        }
        catch(error)
        {
            console.log(error)
        }
    };
  return (
    <>
        <Link to={'/ApplicationList'} className="Link" ><i className='bi bi-arrow-left'></i>Back to Applications</Link>
        <div>
            <div>
                <img src='CareerConnect\CareerConnect ui\careerconnect\src\Applications\PDF.jpg' alt='PDF'></img>
                <div>
                    <p>{Application.name}</p>
                    <p>PDF File</p>
                    <button className='btn' onClick={selectFile}><i className='bi bi-cloud-upload'></i>Change File</button>
                </div>
            </div>
            <div>
                <form onSubmit={onUpdateApplication} className='form'>
                    <div className='Application-detalis'>
                        <input type='hidden' defaultValue={Application.id} name ="id" required></input>
                        <div className='input-box'>
                            <span className='details'>Name</span>
                            <input type='text' value={Application.name} onChange={onChange} name ="name" required></input>
                        </div>
                        <div className='input-box'>
                            <span className='details'>Email</span>
                            <input type='email' value={Application.email} onChange={onChange} name ="email" required></input>
                        </div>
                        <div className='input-box'>
                            <span className='details'>City</span>
                            <input type='text' value={Application.City} onChange={onChange} name ="City" required></input>
                        </div>
                        <div className='input-box'>
                            <span className='details'>Age</span>
                            <input type='number' value={Application.Age} onChange={onChange} name ="Age" required></input>
                        </div>
                        <span class="form-label d-block">Tell us about yourself</span>
                                <textarea
                                    name="Description"
                                    class="form-control"
                                    rows="3"
                                    placeholder={Application.Description}
                                    onChange={onChange}
                                ></textarea>
                    </div>
                    <div className='form_footer'>
                        <button type='submit' className='btn'>Save</button>
                    </div>
                </form>
            </div>
        </div>
        <form style={{display:'none'}}>
            <input type='file' ref={inputRef} onChange={(event)=> updateCV(event.target.files[0])} name='file' accept='application/pdf'></input>
        </form>
    </>
  )
}

export default ApplicationDetail