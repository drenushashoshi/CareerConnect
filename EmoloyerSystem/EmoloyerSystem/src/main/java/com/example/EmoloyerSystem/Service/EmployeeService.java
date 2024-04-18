package com.example.EmoloyerSystem.Service;


import com.example.EmoloyerSystem.Entity.Employee;
import com.example.EmoloyerSystem.dto.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);

    List <EmployeeDto>getAllEmployee();

    EmployeeDto updateEmployee(Long employeeId,EmployeeDto updatedEmployee);

    void deleteEmployee (Long employeeId);

}
