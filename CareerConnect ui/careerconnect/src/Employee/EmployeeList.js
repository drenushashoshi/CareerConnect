import React,{useEffect,useState}from 'react'
import EmployeeService from '../Services/EmployeeService'




const EmployeeList=()=>{
    const[employees,setEmployees]=useState([])

    useEffect(()=>{
        fetchEmployees();
    
    },[])

    const fetchEmployees=async()=>{
        try{
            const token=localStorage.getItem('token');
            const response=await EmployeeService.getAllEmployees();
            setEmployees(response.employeeList);
        }catch(error){
            console.log('Error fetching employees ', error);
        }
    }


return(
    <div className='container'>
        <h2>List of Employees:</h2>
        <table className='table tabl-bordered'>
            <thead>
                <tr>
                    <th>WorkerId</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Age</th>
                    <th>Adress</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>JobPreferences</th>
                    <th>Skills</th>
                </tr>
            </thead>

            <tbody>
                {
                    employees.map(employee=>
                    <tr key={employee.id}> 
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.surname}</td>
                        <td>{employee.age}</td>
                        <td>{employee.adress}</td>
                        <td>{employee.email}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.jobPreferences}</td>
                        <td>{employee.skills}</td>

                     </tr>
                    
                    )
                }

            </tbody>
        </table>
    </div>

)


}


export default EmployeeList
