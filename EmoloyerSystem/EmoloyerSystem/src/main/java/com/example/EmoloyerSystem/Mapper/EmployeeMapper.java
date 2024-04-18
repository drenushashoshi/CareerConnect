package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Employee;
import com.example.EmoloyerSystem.dto.EmployeeDto;

public class EmployeeMapper {
    public static EmployeeDto mapToEmployeeDto(Employee employee){
        return new EmployeeDto(
                employee.getId(),
                employee.getName(),
                employee.getSurname(),
                employee.getAge(),
                employee.getAddress(),
                employee.getEmail(),
                employee.getPassword(),
                employee.getPhoto(),
                employee.getPhone(),
                employee.getJobPreferences(),
                employee.getSkills()
        );
    }

    public static Employee mapToEmployee(EmployeeDto employeeDto){
        return new Employee(
                employeeDto.getId(),
                employeeDto.getName(),
                employeeDto.getSurname(),
                employeeDto.getAge(),
                employeeDto.getAddress(),
                employeeDto.getEmail(),
                employeeDto.getPassword(),
                employeeDto.getPhoto(),
                employeeDto.getPhone(),
                employeeDto.getJobPreferences(),
                employeeDto.getSkills()

        );
    }

}
