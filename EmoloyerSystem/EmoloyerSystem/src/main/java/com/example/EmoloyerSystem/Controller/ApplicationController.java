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
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping()
    public ResponseEntity<ApplicationDto> createApplication(@RequestBody ApplicationDto Application)
    {
        ApplicationDto savedApplication = applicationService.createApplication(Application);
        return new ResponseEntity<ApplicationDto>(savedApplication, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ApplicationDto>> getAllApplications()
    {
        List<ApplicationDto>Applications=applicationService.getAllApplications();
        return ResponseEntity.ok(Applications);    
    }

    @GetMapping("/{ID}")
    public ResponseEntity<ApplicationDto> getApplicationById(@PathVariable(value = "ID") Integer ID)
    {
        ApplicationDto Application= applicationService.getApplicationById(ID);
        return ResponseEntity.ok(Application);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ApplicationDto> updateApplication(@PathVariable("id") Integer ApplicationID,
                                                   @RequestBody ApplicationDto updatedApplication){
        ApplicationDto Application=applicationService.updateApplication(ApplicationID, updatedApplication);
        return ResponseEntity.ok(Application);

    }

    //Delete Company REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable("id") Integer ApplicationID){
        applicationService.deleteApplication(ApplicationID);
        return ResponseEntity.ok("Application Deleted");
    }

}
