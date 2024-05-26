package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.EmployeePostService;
import com.example.EmoloyerSystem.dto.EmployeePostDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

public class EmployeePostController {
@Autowired
    private  EmployeePostService employeePostService;

    
    @PostMapping("/employee/registerPost")
    public ResponseEntity<EmployeePostDto> createEmployeePost(@RequestBody EmployeePostDto employeePostDto) {
        return  ResponseEntity.ok(employeePostService.createEmployeePost(employeePostDto));
    }

    
    @GetMapping("/employee/getPost/{id}")
    public ResponseEntity<EmployeePostDto> getEmployeePostById(@PathVariable("id") Long employeePostId) {
        EmployeePostDto employeePostDto = employeePostService.getEmployeePostById(employeePostId);
        return ResponseEntity.ok(employeePostDto);
    }

    
    @GetMapping("/employee/EmployeePost")
    public ResponseEntity<List<EmployeePostDto>> getAllEmployeePost() {
        List<EmployeePostDto> employeePosts = null;

        employeePosts=employeePostService.getAllEmployeePost();

        return ResponseEntity.ok(employeePosts);
    }

    // Update Employee REST API
    @PutMapping("/employee/updatePost/{id}")
    public ResponseEntity<EmployeePostDto> updateEmployeePost(@PathVariable("id") Long employeePostId,
                                                      @RequestBody EmployeePostDto updatedEmployeePost) {
        EmployeePostDto employeePostDto = employeePostService.updateEmployeePost(employeePostId, updatedEmployeePost);
        return ResponseEntity.ok(employeePostDto);
    }

    // Delete Employee REST API
    @DeleteMapping("/employee/deletePost/{id}")
    public ResponseEntity<String> deleteEmployeePost(@PathVariable("id") Long employeePostId) {
        employeePostService.deleteEmployeePost(Math.toIntExact(employeePostId));
        return ResponseEntity.ok("Employee post deleted successfully");
    }


}
