package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.ApplicationService;
import com.example.EmoloyerSystem.dto.ApplicationDto;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/employee/createApplication")
    public ResponseEntity<ApplicationDto> createApplication(@RequestBody ApplicationDto Application)
    {
        ApplicationDto savedApplication = applicationService.createApplication(Application);
        return new ResponseEntity<>(savedApplication, HttpStatus.CREATED);
    }

    @GetMapping("/public/getAll")
    public ResponseEntity<List<ApplicationDto>> getAllApplications()
    {
        List<ApplicationDto>Applications=applicationService.getAllApplications();
        return ResponseEntity.ok(Applications);    
    }

    @GetMapping("/public/Application/{id}")
    public ResponseEntity<ApplicationDto> getApplicationById(@PathVariable(value = "id") Integer ID)
    {
        ApplicationDto Application= applicationService.getApplicationById(ID);
        return ResponseEntity.ok(Application);
    }
    @GetMapping("/public/Application/employee/{id}")
    public ResponseEntity<List<ApplicationDto>> getApplicationByEmployeeId(@PathVariable(value = "id") Integer ID)
    {
        List<ApplicationDto> Application= applicationService.getApplicationsByEmployeeid(ID);
        return ResponseEntity.ok(Application);
    }
    @GetMapping("/public/Application/internship/{id}")
    public ResponseEntity<List<ApplicationDto>> getApplicationByInternshipId(@PathVariable(value = "id") int ID)
    {
        List<ApplicationDto> Application= applicationService.getApplicationsByInternshipid(ID);
        return ResponseEntity.ok(Application);
    }
    @GetMapping("/public/Application/job/{id}")
    public ResponseEntity<List<ApplicationDto>> getApplicationByJobId(@PathVariable(value = "id") long ID)
    {
        List<ApplicationDto> Application= applicationService.getApplicationsByJobid(ID);
        return ResponseEntity.ok(Application);
    }
    @PutMapping("/public/update/application/{id}")
    public ResponseEntity<ApplicationDto> updateApplication(@PathVariable("id") Integer ApplicationID,
                                                   @RequestBody ApplicationDto updatedApplication){
        ApplicationDto Application=applicationService.updateApplication(ApplicationID, updatedApplication);
        return ResponseEntity.ok(Application);

    }
    @DeleteMapping("/public/delete/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable("id") Integer ApplicationID){
        applicationService.deleteApplication(ApplicationID);
        return ResponseEntity.ok("Application Deleted");
    }
}
