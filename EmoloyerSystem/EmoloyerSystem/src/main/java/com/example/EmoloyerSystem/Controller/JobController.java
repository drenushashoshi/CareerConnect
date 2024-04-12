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

@AllArgsConstructor
@RestController
@RequestMapping("/api/jobs")
public class JobController {
    private JobService jobService;

    // Create Job REST API
    @PostMapping
    public ResponseEntity<JobDto> createJob(@RequestBody JobDto jobDto) {
        JobDto savedJob = jobService.createJob(jobDto);
        return new ResponseEntity<>(savedJob, HttpStatus.CREATED);
    }

    // Read Job by id REST API
    @GetMapping("{id}")
    public ResponseEntity<JobDto> getJobById(@PathVariable("id") Integer jobId) {
        JobDto jobDto = jobService.getJobById(jobId);
        return ResponseEntity.ok(jobDto);
    }

    // Read All Jobs REST API
    @GetMapping
    public ResponseEntity<List<JobDto>> getAllJobs() {
        List<JobDto> jobs = jobService.getAllJobs();
        return ResponseEntity.ok(jobs);
    }

    // Update Job REST API
    @PutMapping("{id}")
    public ResponseEntity<JobDto> updateJob(@PathVariable("id") Integer jobId,
                                            @RequestBody JobDto updatedJob) {
        JobDto jobDto = jobService.updateJob(jobId, updatedJob);
        return ResponseEntity.ok(jobDto);
    }

    // Delete Job REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteJob(@PathVariable("id") Integer jobId) {
        jobService.deleteJob(jobId);
        return ResponseEntity.ok("Job Deleted");
    }
}