import React, { useRef, useState } from 'react'
import { getApplications, saveApplication, updateResume } from '../Services/ApplicationService';

const Application = () => {

    const fileRef = useRef();
    const [file, setFile] =useState(undefined);
    const [values,setValues] = useState({
        name: '',
        email:'',
        City: '',
        Age: '',
        Description: '',
        Gender: '',
    });
    const onChange = (event) => {
        setValues({...values,[event.target.name]:event.target.value})
    }
    const handleNewApplication = async (event) => {
        event.preventDefault();
        try{
            const {data} = await saveApplication(values);
            const formData = new formData();
            formData.append('file',file,file.name);
            formData.append('id',data.id);
            const {data:Resume} = await updateResume(formData);
            setFile(undefined);
            fileRef.current.value = null;
            setValues({
                name: '',
                email:'',
                City: '',
                Age: '',
                Description: '',
                Gender: '',
            })
        }
        catch(error)
        {
            console.log(error);
        }

        const updateResume = async (formData) =>{
            try{
                const {data:Resume} = await updateResume(formData);
            }
            catch(error)
            {
                console.log(error);
            }
        };
        const updateApplication = async () =>{};

    }
    return (
            <div class="container">
                <div className='modal__header'>
                </div>
                <div class="row mx-0 justify-content-center">
                    <div class="col-md-7 col-lg-5 px-lg-2 col-xl-4 px-xl-0 px-xxl-3">
                        <form onSubmit={handleNewApplication}
                            method="POST"
                            class="w-100 rounded-1 p-4 border bg-white"
                            action="https://herotofu.com/start"
                            enctype="multipart/form-data"
                        >
                            <label class="d-block mb-4">
                                <span class="form-label d-block">Your name</span>
                                <input
                                    required
                                    name="name"
                                    type="text"
                                    class="form-control"
                                    placeholder="Filan Fisteku"
                                    value={values.name}
                                    onChange={onChange}
                                />
                            </label>

                            <label class="d-block mb-4">
                                <span class="form-label d-block">Email address</span>
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    class="form-control"
                                    placeholder="Filan.Fisteku@example.com"
                                    value={values.email}
                                    onChange={onChange}
                                />
                            </label>
                            <label class="d-block mb-4">
                                <span class="form-label d-block">City</span>
                                <input
                                    required
                                    name="City"
                                    type="text"
                                    class="form-control"
                                    placeholder="Prishtine"
                                    value={values.city}
                                    onChange={onChange}
                                />
                            </label>

                            <label class="d-block mb-4">
                                <span class="form-label d-block">Age</span>
                                <input
                                    required
                                    name="Age"
                                    type="number"
                                    class="form-control"
                                    placeholder=""
                                    value={values.Age}
                                    onChange={onChange}
                                />
                            </label>

                            <label class="d-block mb-4">
                                <span class="form-label d-block">Tell us more about yourself</span>
                                <textarea
                                    name="Description"
                                    class="form-control"
                                    rows="3"
                                    placeholder="What motivates you?"
                                    value={values.Description}
                                    onChange={onChange}
                                ></textarea>
                            </label>

                            <label class="d-block mb-4">
                                <span class="form-label d-block">Your CV (Must be a PDF file)</span>
                                <input required name="cv" type="file" onChange={(event)=>setFile(event.target.files[0])} ref={fileRef} class="form-control" />
                            </label>

                            <div class="mb-4">
                                <span class="form-label d-block">Gender</span>
                                <div>
                                    <div class="form-check">
                                        <label class="d-block">
                                            <input
                                                type="radio"
                                                class="form-check-input"
                                                name="Gender"
                                                value="male"
                                                checked={values.Gender === 'M'}
                                            />
                                            <span class="form-check-label"
                                            >Male</span
                                            >
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <label class="form-check">
                                        <input
                                            type="radio"
                                            class="form-check-input"
                                            name="Gender"
                                            value="female"
                                            checked={values.Gender === 'F'}
                                        />
                                        <span class="form-check-label">Female</span>
                                    </label>
                                </div>
                            </div>

                            <div class="mb-3">
                                <button type="submit" class="btn btn-primary px-3 rounded-3">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
  )
}

export default Application