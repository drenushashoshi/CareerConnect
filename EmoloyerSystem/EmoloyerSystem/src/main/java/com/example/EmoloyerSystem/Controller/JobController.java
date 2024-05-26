package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.JobService;
import com.example.EmoloyerSystem.dto.JobDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;


import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping
public class JobController {
    private JobService jobService;

    // Create Job REST API
    @PostMapping("/company/createJob")
    public ResponseEntity<JobDto> createJob(@RequestBody JobDto jobDto) {
        JobDto savedJob = jobService.createJob(jobDto);
        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }

    // Read Job by id REST API
    @GetMapping("/public/readJob/{id}")
    public ResponseEntity<JobDto> getJobById(@PathVariable("id") Integer jobId) {
        JobDto jobDto = jobService.getJobById(jobId);
        return ResponseEntity.ok(jobDto);
    }

    // Read All Jobs REST API
    @GetMapping("/public/getAllJobs")
    public ResponseEntity<List<JobDto>> getAllJobs() {
        List<JobDto> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    //Read Jobs of the Company
    @GetMapping("/public/companyJobs")
    public ResponseEntity<List<JobDto>> getAllCompanyJobs(@RequestParam(required = false) Integer companyId) {
        List<JobDto> companyJobs = null;
        if (companyId != 0) {
            companyJobs = jobService.getAllCompanyJobs(companyId);
        }
        return ResponseEntity.ok(companyJobs);
    }

    // Update Job REST API
    @PutMapping("/company/updateJob/{id}")
    public ResponseEntity<JobDto> updateJob(@PathVariable("id") Integer jobId,
                                            @RequestBody JobDto updatedJob) {
        JobDto jobDto = jobService.updateJob(jobId, updatedJob);
        return ResponseEntity.ok(jobDto);
    }

    // Delete Job REST API
    @DeleteMapping("/company/deleteJob/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable("id") Integer jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.ok("Job Deleted");
    }

    // Search Jobs REST API
    @GetMapping("/public/searchJobs")
    public ResponseEntity<List<JobDto>> searchJobs(
            @RequestParam(value = "query", required = false) String query,
            @RequestParam(value = "location", required = false) String locationName,
            @RequestParam(value = "Industria", required = false) String IndustriaName) {
        List<JobDto> jobs = jobService.searchJobs(query, locationName, IndustriaName);
        return ResponseEntity.ok(jobs);
    }
}