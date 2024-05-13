package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.EmployeePostService;
import com.example.EmoloyerSystem.dto.EmployeePostDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeePostController {

    private final EmployeePostService employeePostService;

    // Add Employee REST API
    @PostMapping
    public ResponseEntity<EmployeePostDto> createEmployeePost(@RequestBody EmployeePostDto employeePostDto) {
        EmployeePostDto savedEmployeePost = employeePostService.createEmployeePost(employeePostDto);
        return new ResponseEntity<>(savedEmployeePost, HttpStatus.CREATED);
    }

    // Get Employee REST API
    @GetMapping("{id}")
    public ResponseEntity<EmployeePostDto> getEmployeePostById(@PathVariable("id") Long employeePostId) {
        EmployeePostDto employeePostDto = employeePostService.getEmployeePostById(employeePostId);
        return ResponseEntity.ok(employeePostDto);
    }

    // Get All Employee REST API
    @GetMapping
    public ResponseEntity<List<EmployeePostDto>> getAllEmployeePost() {
        List<EmployeePostDto> employeePost = employeePostService.getAllEmployeePost();
        return ResponseEntity.ok(employeePost);
    }

    // Update Employee REST API
    @PutMapping("{id}")
    public ResponseEntity<EmployeePostDto> updateEmployeePost(@PathVariable("id") Long employeePostId,
                                                      @RequestBody EmployeePostDto updatedEmployeePost) {
        EmployeePostDto employeePostDto = employeePostService.updateEmployeePost(employeePostId, updatedEmployeePost);
        return ResponseEntity.ok(employeePostDto);
    }

    // Delete Employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployeePost(@PathVariable("id") Long employeePostId) {
        employeePostService.deleteEmployeePost(Math.toIntExact(employeePostId));
        return ResponseEntity.ok("Employee post deleted successfully");
    }


}
