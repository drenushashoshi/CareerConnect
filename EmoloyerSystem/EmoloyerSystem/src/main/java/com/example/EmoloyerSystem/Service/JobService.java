package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.dto.JobDto;

import java.util.List;

public interface JobService {
    JobDto createJob(JobDto jobDto);

    JobDto getJobById(Integer jobId);

    List<JobDto> getAllJobs();

    JobDto updateJob(Integer jobId, JobDto updatedJob);

    void deleteJob(Integer jobId);
}