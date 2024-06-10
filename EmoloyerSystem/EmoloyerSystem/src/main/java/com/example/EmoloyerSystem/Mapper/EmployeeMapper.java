package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Employee;
import com.example.EmoloyerSystem.dto.EmployeeDto;

public class EmployeeMapper {

    public static EmployeeDto mapEmployeeToDto(Employee employee) {
        EmployeeDto employeeDto = new EmployeeDto();
        employeeDto.setId(employee.getId());
        employeeDto.setName(employee.getName());
        employeeDto.setSurname(employee.getSurname());
        employeeDto.setAge(employee.getAge());
        employeeDto.setAddress(employee.getAddress());
        employeeDto.setEmail(employee.getEmail());
        employeeDto.setPhone(employee.getPhone());
        employeeDto.setJobPreferences(employee.getJobPreferences());
        employeeDto.setSkills(employee.getSkills());
        employeeDto.setRole(employee.getRole());
        return employeeDto;
    }

    public static Employee mapDtoToEmployee(EmployeeDto employeeDto) {
        Employee employee = new Employee();
        employee.setId(employeeDto.getId());
        employee.setName(employeeDto.getName());
        employee.setSurname(employeeDto.getSurname());
        employee.setAge(employeeDto.getAge());
        employee.setAddress(employeeDto.getAddress());
        employee.setEmail(employeeDto.getEmail());
        employee.setPhone(employeeDto.getPhone());
        employee.setJobPreferences(employeeDto.getJobPreferences());
        employee.setSkills(employeeDto.getSkills());
        employee.setRole(employeeDto.getRole());
        return employee;
    }
}

