
import React, { useEffect, useState } from 'react';
import {FaStar}from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import {createRate}from '../Services/RateService';




const Rate=()=> {
    const [rating ,setRating]= useState(null);
    const [komenti,setKomenti]=useState('');
    const [currentDate,setCurrentDate]=useState(null);

    const navigator=useNavigate();
    const[komentiTouched,setKomentiTouched]=useState(false);

    const handleSubmit=()=>{
        const isKomentiValid=komenti.trim()!=='';

        setKomentiTouched(!isKomentiValid);
        if(!isKomentiValid){
            return;
        }

        
        
    };
    useEffect(()=>{
        const getCurrentDate=()=>{
            const date=new Date();
            setCurrentDate(date.toISOString());
        };


    })
    


    const handleClick=(value)=>{
        setRating(value);

        console.log('Selected rating',value);
        console.log('Comment',komenti);
        console.log('Date',currentDate);
    };



  return (


      <div className='d-flex flex-column align-items-center'>
        <h1 className="custom-margin"><b>Rate Us</b></h1>
        
        <p className='w-50 mt-3'>
            For us your rating is the spirit of improvements!
            Please share your experince and give us a star rating.
            Your feedback helps us understand where we can improve and provide a better service to you! 
        </p>
        <h1>


        </h1>
    <div>
        {[...Array(5)].map((star,index)=>{
            const ratingValue=index+1;

            return (
                <label key={index}>
                    <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={()=> handleClick(ratingValue)}
                    />
                    <FaStar
                    className="star"
                    color={ratingValue <= rating?'#ffc107':'e4e5e9'}
                    size={30}
                    />

                </label>
            );
        })}
      </div>

      <h1></h1>
      <h1></h1>
      <h1></h1>
      <h1></h1>

      <div className='mt-4 mb-4'>
      <textarea
        input type="komenti" id="komenti" value={komenti} onChange={(e)=>setKomenti(e.target.value)} placeholder='Shkruani komentin tuaj!' className='form-control'

        
        style={{
                        height: '150px',
                        paddingTop: '10px',
                        paddingLeft: '10px',
                        resize: 'none', 
                        verticalAlign: 'top',
                        textAlign: 'left'
                      }}
                      />

      </div>


      <h1></h1>
      <button onClick={handleSubmit}className="btn btn-primary ">Submit</button>
      {currentDate && <p className="mt-3">Current Date: {currentDate}</p>}


      
    </div>
    
  );
};

export default Rate;
