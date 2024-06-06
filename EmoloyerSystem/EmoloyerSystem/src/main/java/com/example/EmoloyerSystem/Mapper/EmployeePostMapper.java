package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Employee;
import com.example.EmoloyerSystem.dto.EmployeePostDto;
import com.example.EmoloyerSystem.Entity.EmployeePost;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Date;

@Component
public class EmployeePostMapper {

    public static EmployeePostDto mapToEmployeePostDto(EmployeePost employeePost) {
        return new EmployeePostDto(
        employeePost.getId(),
        employeePost.getEmployee().getId(),
        employeePost.getTitle(),
        employeePost.getContent(),
        employeePost.getImage(),
        employeePost.getTimestamp()
        );
    }

    public static EmployeePost mapToEmployeePost(EmployeePostDto employeePostDto, Employee employee) {
        EmployeePost employeePost = new EmployeePost();
        employeePost.setId(employeePostDto.getId());
        employeePost.setEmployee(employee);
        employeePost.setTitle(employeePostDto.getTitle());
        employeePost.setContent(employeePostDto.getContent());
        employeePost.setImage(employeePostDto.getImage());
        employeePost.setTimestamp(employeePostDto.getTimestamp() != null ? employeePostDto.getTimestamp() : new Date());
        return employeePost;
    }
}
