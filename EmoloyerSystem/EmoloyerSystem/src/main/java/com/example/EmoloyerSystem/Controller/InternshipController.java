package com.example.EmoloyerSystem.Controller;


import com.example.EmoloyerSystem.Service.InternshipService;
import com.example.EmoloyerSystem.dto.InternshipDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/Internship")
public class InternshipController {
    private InternshipService internshipService;

    // Create Internship REST API
    @PostMapping
    public ResponseEntity<InternshipDto> createInternship(@RequestBody InternshipDto internshipDto) {
        InternshipDto savedInternship = internshipService.createInternship(internshipDto);
        return new ResponseEntity<>(savedInternship, HttpStatus.CREATED);
    }

    // Read Internship by id REST API
    @GetMapping("{id}")
    public ResponseEntity<InternshipDto> getInternshipById(@PathVariable("id") Integer internshipId) {
        InternshipDto internshipDto = internshipService.getInternshipById(internshipId);
        return ResponseEntity.ok(internshipDto);
    }

    // Read All Internships REST API
    @GetMapping
    public ResponseEntity<List<InternshipDto>> getAllInternships() {
        List<InternshipDto> internships = internshipService.getAllInternships();
        return ResponseEntity.ok(internships);
    }

    // Update Internship REST API
    @PutMapping("{id}")
    public ResponseEntity<InternshipDto> updateInternship(@PathVariable("id") Integer internshipId,
                                            @RequestBody InternshipDto updatedInternship) {
        InternshipDto internshipDto = internshipService.updateInternship(internshipId, updatedInternship);
        return ResponseEntity.ok(internshipDto);
    }

    // Delete Internship REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteInternship(@PathVariable("id") Integer internshipId) {
        internshipService.deleteInternship(internshipId);
        return ResponseEntity.ok("Internship Deleted");
    }
}
