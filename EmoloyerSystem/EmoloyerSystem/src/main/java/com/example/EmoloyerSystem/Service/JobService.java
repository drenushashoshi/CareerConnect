package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.dto.JobDto;

import java.util.List;

public interface JobService {
    JobDto createJob(JobDto jobDto);

    JobDto getJobById(Integer jobId);

    List<JobDto> getAllJobs();

    List<JobDto> getAllCompanyJobs(int companyId);

    JobDto updateJob(Integer jobId, JobDto updatedJob);

    void deleteJob(Integer jobId);

    List<JobDto> searchJobs(String query, String locationName, String IndustriaName);
}