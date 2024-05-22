package com.example.EmoloyerSystem.Controller;


import com.example.EmoloyerSystem.Service.InternshipService;
import com.example.EmoloyerSystem.dto.InternshipDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InternshipController {
    @Autowired
    private InternshipService internshipService;

    @PostMapping("/company/createInternship")
    public ResponseEntity<InternshipDto> createInternship(@RequestBody InternshipDto internshipDto) {
        InternshipDto savedInternship = internshipService.createInternship(internshipDto);
        return new ResponseEntity<>(savedInternship, HttpStatus.CREATED);
    }

    // Read Internship by id REST API
    @GetMapping("/public/readInternship/{id}")
    public ResponseEntity<InternshipDto> getInternshipById(@PathVariable("id") Integer internshipId) {
        InternshipDto internshipDto = internshipService.getInternshipById(internshipId);
        return ResponseEntity.ok(internshipDto);
    }

    @GetMapping("/public/readInternships")
    public ResponseEntity<List<InternshipDto>> getAllInternships() {
        List<InternshipDto> internships = internshipService.getAllInternships();
        return ResponseEntity.ok(internships);
    }

    @GetMapping("/public/companyInternships")
    public ResponseEntity<List<InternshipDto>> getAllCompanyInternships(@RequestParam(required = false) Integer companyId) {
        List<InternshipDto> companyInternships = null;
        if (companyId != 0) {
            companyInternships = internshipService.getAllCompanyInternships(companyId);
        }
        return ResponseEntity.ok(companyInternships);
    }


    // Update Internship REST API
    @PutMapping("/company/updateInternship/{id}")
    public ResponseEntity<InternshipDto> updateInternship(@PathVariable("id") Integer internshipId,
                                            @RequestBody InternshipDto updatedInternship) {
        InternshipDto internshipDto = internshipService.updateInternship(internshipId, updatedInternship);
        return ResponseEntity.ok(internshipDto);
    }

    // Delete Internship REST API
    @DeleteMapping("/company/deleteInternship/{id}")
    public ResponseEntity<String> deleteInternship(@PathVariable("id") Integer internshipId) {
        internshipService.deleteInternship(internshipId);
        return ResponseEntity.ok("Internship Deleted");
    }

    @GetMapping("/public/search")
    public ResponseEntity<List<InternshipDto>> searchInternships(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "location", required = false) String locationName,
            @RequestParam(value = "Industria", required = false) String IndustriaName) {
        List<InternshipDto> internships = internshipService.searchInternships(query, locationName, IndustriaName);
        return ResponseEntity.ok(internships);
    }
}
