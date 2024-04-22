import React,{useEffect,useState} from "react";
 import {deleteRate, listRates} from '../Services/RateService'

 const RatesList=()=>{
     const [rate,setRate]=useState([])

     useEffect(()=>{
         listRates().then((response)=>{
             setRate(response.data);
         }).catch(error=>{
             console.error(error);
         })
     },[])
     function deleteRate(id) {
        deleteRate(id)
          .then((response) => {
            navigator('/');
          })
          .catch(error => {
            console.error(error);
          });
      }


     return(
         <div className='container'>
            <h2>Lista e Vleresimeve:</h2>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>RatesId</th>
                        <th>Vleresimi</th>
                        <th>Komenti</th>
                        <th>Data e Krijimit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
            

            <tbody>
                {
                    rate.map(rate=>
                    <tr key={rate.id}>
                        <td>{rate.id}</td>
                        <td>{rate.vleresimi}</td>
                        <td>{rate.komenti}</td>
                        <td>{rate.dataKrijimit}</td>
                        <td><button onClick={() => deleteRate(rate.id)}>Delete</button></td>
                    </tr>
                    )
                }
            </tbody>
            </table>
         </div>
     )




    }

export default RatesList;














