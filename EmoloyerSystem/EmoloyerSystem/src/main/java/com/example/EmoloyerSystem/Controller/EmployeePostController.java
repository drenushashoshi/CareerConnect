//package com.example.EmoloyerSystem.Controller;
//
//import com.example.EmoloyerSystem.Service.EmployeePostService;
//import com.example.EmoloyerSystem.dto.EmployeePostDto;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//public class EmployeePostController {
//
//    private final EmployeePostService employeePostService;
//
//    public EmployeePostController(EmployeePostService employeePostService) {
//        this.employeePostService = employeePostService;
//    }
//
//    @PostMapping("/employee/registerPost")
//    public ResponseEntity<EmployeePostDto> createEmployeePost(@RequestBody EmployeePostDto employeePostDto) {
//        EmployeePostDto createdPost = employeePostService.createEmployeePost(employeePostDto);
//        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
//    }
//
//    @GetMapping("/public/getPost/{id}")
//    public ResponseEntity<EmployeePostDto> getEmployeePostById(@PathVariable("id") Long employeePostId) {
//        EmployeePostDto employeePostDto = employeePostService.getEmployeePostById(employeePostId);
//        return ResponseEntity.ok(employeePostDto);
//    }
//
//    @GetMapping("/public/EmployeePost")
//    public ResponseEntity<List<EmployeePostDto>> getAllEmployeePost() {
//        List<EmployeePostDto> employeePosts = employeePostService.getAllEmployeePost();
//        return ResponseEntity.ok(employeePosts);
//    }
//
//    @PutMapping("/employee/updatePost/{id}")
//    public ResponseEntity<EmployeePostDto> updateEmployeePost(@PathVariable("id") Long employeePostId,
//                                                              @RequestBody EmployeePostDto updatedEmployeePost) {
//        EmployeePostDto employeePostDto = employeePostService.updateEmployeePost(employeePostId, updatedEmployeePost);
//        return ResponseEntity.ok(employeePostDto);
//    }
//
//    @DeleteMapping("/employee/deletePost/{id}")
//    public ResponseEntity<Void> deleteEmployeePost(@PathVariable("id") Long employeePostId) {
//        employeePostService.deleteEmployeePost(Math.toIntExact(employeePostId));
//        return ResponseEntity.noContent().build();
//    }
//}
