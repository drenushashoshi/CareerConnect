package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.CompanyStaffService;
import com.example.EmoloyerSystem.dto.CompanyStaffDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class CompanyStaffController {
    @Autowired
    private CompanyStaffService companyStaffService;

    @PostMapping("/company/registerStaff")
    public ResponseEntity<CompanyStaffDto> createCompanyStaff(
            @RequestParam("image") MultipartFile file,
            @RequestParam("companyStaff") String companyStaffJson) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        CompanyStaffDto companyStaffDto = objectMapper.readValue(companyStaffJson, CompanyStaffDto.class);

        return ResponseEntity.ok(companyStaffService.createCompanyStaff(companyStaffDto, file));
    }

    @GetMapping("/company/getStaff/{id}")
    public ResponseEntity<CompanyStaffDto> getCompanyStaffById(@PathVariable("id") Integer companyStaffId) {
        CompanyStaffDto companyStaffDto = companyStaffService.getCompanyStaffId(companyStaffId);
        return ResponseEntity.ok(companyStaffDto);
    }

    @GetMapping("/public/CompanyStaff")
    public ResponseEntity<List<CompanyStaffDto>> getAllCompanyStaff(@RequestParam(required = false) int companyId) {
        List<CompanyStaffDto> companyStaffs = null;
        if (companyId != 0) {
            companyStaffs = companyStaffService.getAllCompanyStaff(companyId);
        }
        return ResponseEntity.ok(companyStaffs);
    }

    @PutMapping("/company/updateStaff/{id}")
    public ResponseEntity<CompanyStaffDto> updateCompanyStaff(
            @PathVariable("id") Integer companyStaffId,
            @RequestPart("companyStaff") String companyStaffJson,
            @RequestPart(value = "image", required = false) MultipartFile file) throws IOException {

        ObjectMapper objectMapper = new ObjectMapper();
        CompanyStaffDto updatedCompanyStaff = objectMapper.readValue(companyStaffJson, CompanyStaffDto.class);

        CompanyStaffDto companyStaffDto = companyStaffService.updateCompanyStaff(companyStaffId, updatedCompanyStaff, file);
        return ResponseEntity.ok(companyStaffDto);
    }

    @DeleteMapping("/company/deleteStaff/{id}")
    public ResponseEntity<String> deleteCompanyStaff(@PathVariable("id") Integer companyStaffId) {
        companyStaffService.deleteCompanyStaff(companyStaffId);
        return ResponseEntity.ok("CompanyStaff Deleted");
    }

    @GetMapping("/public/downloadImagee/{id}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable("id") Integer companyStaffId) {
        byte[] image = companyStaffService.downloadImage(companyStaffId);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"image.jpg\"")
                .body(image);
    }

}
