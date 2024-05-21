package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.EmployeePost;
import com.example.EmoloyerSystem.dto.EmployeePostDto;



import java.util.List;

public class EmployeePostMapper {

    public static EmployeePostDto mapToEmployeePostDto(EmployeePost employeePost) {
        return new EmployeePostDto(
                employeePost.getId(),
                employeePost.getTitle(),
                employeePost.getContent(),
                employeePost.getAttachments()
        );
    }

    public static EmployeePost mapToEmployeePost(EmployeePostDto employeePostDto) {
        // Ensure that EmployeePost class has a constructor that accepts id, title, content, and attachments
        return new EmployeePost(
                employeePostDto.getId(),
                employeePostDto.getTitle(),
                employeePostDto.getContent(),
                employeePostDto.getAttachments()
        );
    }
}