package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.CompanyMenagmentService;
import com.example.EmoloyerSystem.dto.CompanyDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class CompanyManagementController {
    @Autowired
    private CompanyMenagmentService companyMenagmentService;

    @PostMapping("/auth/register")
    public ResponseEntity<CompanyDto> register(@RequestBody CompanyDto companyDto) {
        return ResponseEntity.ok(companyMenagmentService.register(companyDto));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<CompanyDto> login(@RequestBody CompanyDto companyDto) {
        return ResponseEntity.ok(companyMenagmentService.login(companyDto));
    }

    @PostMapping("/auth/refresh")
    public ResponseEntity<CompanyDto> refreshToken(@RequestBody CompanyDto companyDto) {
        return ResponseEntity.ok(companyMenagmentService.refreshToken(companyDto));
    }

    @GetMapping("/admin/getAllCompanies")
    public ResponseEntity<CompanyDto> getAllCompanies() {
        return ResponseEntity.ok(companyMenagmentService.getAllCompanies());
    }

    @GetMapping("/public/getCompany/{id}")
    public ResponseEntity<CompanyDto> getCompanyById(@PathVariable Integer id) {
        return ResponseEntity.ok(companyMenagmentService.getCompanyById(id));
    }

    @PutMapping("/company/updateCompany/{id}")
    public ResponseEntity<CompanyDto> updateCompany(@PathVariable Integer id, @RequestBody CompanyDto companyDto) {
        return ResponseEntity.ok(companyMenagmentService.updateCompany(id, companyDto));
    }

    @GetMapping("/admincompany/getProfile")
    public ResponseEntity<CompanyDto> getProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        CompanyDto response = companyMenagmentService.getMyInfo(email);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/admin/deleteCompany/{id}")
    public ResponseEntity<CompanyDto> deleteCompany(@PathVariable Integer id) {
        return ResponseEntity.ok(companyMenagmentService.deleteCompany(id));
    }
}
