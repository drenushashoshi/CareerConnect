package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.dto.CompanyStaffDto;
import com.example.EmoloyerSystem.dto.EmployeePostDto;
import com.example.EmoloyerSystem.Service.EmployeePostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping
public class EmployeePostController {

    @Autowired
    private EmployeePostService employeePostService;

    @PostMapping("employee/createPost")
    public ResponseEntity<EmployeePostDto> createEmployeePost(
            @RequestParam(value = "image", required = false) MultipartFile file,
            @RequestParam("content") String content,
            @RequestParam("title") String title,
            @RequestParam("employeeId") int employeeId,
            @RequestParam("timestamp") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Date timestamp) throws IOException {

        // Log the file details to debug
        if (file != null) {
            System.out.println("Received file: " + file.getOriginalFilename());
            System.out.println("File size: " + file.getSize());
        } else {
            System.out.println("No file received");
        }

        EmployeePostDto post = new EmployeePostDto();
        post.setTitle(title);
        post.setContent(content);
        post.setEmployeeId(employeeId);
        post.setTimestamp(timestamp); // Set timestamp
        EmployeePostDto createdPost = employeePostService.createEmployeePost(post, file);
        return ResponseEntity.ok(createdPost);
    }

    @GetMapping("public/post/{id}")
    public ResponseEntity<EmployeePostDto> getEmployeePost(@PathVariable("id") Integer employeePostId) {
        EmployeePostDto employeePostDto = employeePostService.getEmployeePostId(employeePostId);
        return ResponseEntity.ok(employeePostDto);
    }

    @GetMapping("public/allpost")
    public ResponseEntity<List<EmployeePostDto>> getAllEmployeePosts(@RequestParam(required = false) Integer employeeId) {
        List<EmployeePostDto> employeePosts;
        if (employeeId != null) {
            employeePosts = employeePostService.getAllEmployeePost(employeeId);
        } else {
            employeePosts = employeePostService.getAllEmployeePost(0);
        }
        return ResponseEntity.ok(employeePosts);
    }

    @PutMapping("employee/updatepost/{id}")
    public ResponseEntity<EmployeePostDto> updateEmployeePost(
            @PathVariable("id") Integer employeePostId,
            @RequestPart("post") String employeePostJson,
            @RequestParam(value = "image", required = false) MultipartFile file) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        EmployeePostDto updatedEmployeePost = objectMapper.readValue(employeePostJson, EmployeePostDto.class);

        EmployeePostDto employeePostDto = employeePostService.updateEmployeePost(employeePostId, updatedEmployeePost, file);
        return ResponseEntity.ok(employeePostDto);
    }

    @DeleteMapping("employee/deletepost/{id}")
    public ResponseEntity<String> deleteEmployeePost(@PathVariable("id") Integer employeePostId) {
        employeePostService.deleteEmployeePost(employeePostId);
        return ResponseEntity.ok("Employee post deleted successfully");
    }

    @GetMapping("public/imagepost/{id}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable("id") Integer employeePostId) {
        byte[] image = employeePostService.downloadImage(employeePostId);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"image.jpg\"")
                .body(image);
    }
}
