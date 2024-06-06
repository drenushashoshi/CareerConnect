package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.dto.EmployeePostDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface EmployeePostService {
    EmployeePostDto createEmployeePost(EmployeePostDto employeePostDto, MultipartFile file) throws IOException;
    EmployeePostDto getEmployeePostId(Integer employeePostId);
    List<EmployeePostDto> getAllEmployeePost(int employeeId);
    EmployeePostDto updateEmployeePost(Integer employeePostId, EmployeePostDto updatedEmployeePost, MultipartFile file) throws IOException;
    void deleteEmployeePost(Integer employeePostId);
    byte[] downloadImage(Integer employeePostId);
}
