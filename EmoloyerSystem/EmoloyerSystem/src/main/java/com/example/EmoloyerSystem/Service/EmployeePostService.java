package com.example.EmoloyerSystem.Service;


import com.example.EmoloyerSystem.Entity.Employee;
import com.example.EmoloyerSystem.dto.EmployeePostDto;

import java.util.List;

public interface EmployeePostService {
    EmployeePostDto createEmployeePost(EmployeePostDto employeePostDto);

    EmployeePostDto getEmployeePostById(Long employeePostId);

    List <EmployeePostDto>getAllEmployeePost(int employeeId);

    EmployeePostDto updateEmployeePost(Long employeePostId,EmployeePostDto updatedEmployeePost);

    void deleteEmployeePost (int employeePostId);



}
