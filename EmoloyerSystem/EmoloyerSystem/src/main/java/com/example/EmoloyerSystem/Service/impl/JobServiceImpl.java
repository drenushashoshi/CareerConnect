package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.*;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.JobMapper;
import com.example.EmoloyerSystem.Repository.CompanyRepository;
import com.example.EmoloyerSystem.Repository.IndustriaRepository;
import com.example.EmoloyerSystem.Repository.JobRepository;
import com.example.EmoloyerSystem.Repository.LocationRepository;
import com.example.EmoloyerSystem.Service.JobService;
import com.example.EmoloyerSystem.dto.JobDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;
    private final LocationRepository locationRepository;
    private final IndustriaRepository IndustriaRepository;
    private final CompanyRepository companyRepository;

    @Override
    public JobDto createJob(JobDto jobDto) {
        Company company=companyRepository.findById(jobDto.getCompanyId())
                .orElseThrow(()->new ResourceNotFoundException("Company not found with id: "+jobDto.getCompanyId()));

        Location location = locationRepository.findByName(jobDto.getLocationName())
                .orElseThrow(() -> new ResourceNotFoundException("Location not found with id: " + jobDto.getLocationName()));

        Industria Industria = IndustriaRepository.findByName(jobDto.getIndustriaName())
                .orElseThrow(() -> new ResourceNotFoundException("Industria not found with id: " + jobDto.getIndustriaName()));

        Job job = JobMapper.mapToJob(jobDto, location, Industria, company);
        Job savedJob = jobRepository.save(job);
        return JobMapper.mapToJobDto(savedJob);
    }


    @Override
    public JobDto getJobById(Integer jobId) {
        Job job = jobRepository.findById(jobId.longValue())
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));
        return JobMapper.mapToJobDto(job);
    }

    @Override
    public List<JobDto> getAllJobs() {
        List<Job> jobs = jobRepository.findAll();
        return jobs.stream()
                .map(JobMapper::mapToJobDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<JobDto> getAllCompanyJobs(int companyId) {
        List<Job> companyJobs = jobRepository.findByCompanyId(companyId);
        return companyJobs.stream()
                .map(JobMapper::mapToJobDto)
                .collect(Collectors.toList());
    }

    @Override
    public JobDto updateJob(Integer jobId, JobDto updatedJob) {
        Job job = jobRepository.findById(jobId.longValue())
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));

        // Update the job entity with values from the updatedJob DTO
        job.setTitle(updatedJob.getTitle());
        job.setDescription(updatedJob.getDescription());
        job.setRequirements(updatedJob.getRequirements());
        job.setSalary(updatedJob.getSalary());
        job.setDeadline(updatedJob.getDeadline());

        // Retrieve the Location and Industria entities based on the IDs provided in the updatedJob DTO
        Location location = locationRepository.findByName(updatedJob.getLocationName())
                .orElseThrow(() -> new ResourceNotFoundException("Location not found with id: " + updatedJob.getLocationName()));

        Industria Industria = IndustriaRepository.findByName(updatedJob.getIndustriaName())
                .orElseThrow(() -> new ResourceNotFoundException("Industria not found with id: " + updatedJob.getIndustriaName()));

        // Set the Location and Industria entities in the job entity
        job.setLocation(location);
        job.setIndustria(Industria);

        // Save the updated job entity
        Job updatedJobObj = jobRepository.save(job);

        // Map the updated job entity to a DTO and return it
        return JobMapper.mapToJobDto(updatedJobObj);
    }


    @Override
    public void deleteJob(Integer jobId) {
        if (!jobRepository.existsById(jobId.longValue())) {
            throw new ResourceNotFoundException("Job not found with id: " + jobId);
        }
        jobRepository.deleteById(jobId.longValue());
    }

    @Override
    public List<JobDto> searchJobs(String query, String locationName, String IndustriaName) {
        List<Job> jobs;

        if (query != null && !query.isEmpty() && locationName != null && !locationName.isEmpty() && IndustriaName != null && !IndustriaName.isEmpty()) {
            jobs = jobRepository.findByTitleContainingIgnoreCaseAndLocationNameAndIndustriaName(query, locationName, IndustriaName);
        } else if (query != null && !query.isEmpty() && locationName != null && !locationName.isEmpty()) {
            jobs = jobRepository.findByTitleContainingIgnoreCaseAndLocationName(query, locationName);
        } else if (query != null && !query.isEmpty() && IndustriaName != null && !IndustriaName.isEmpty()) {
            jobs = jobRepository.findByTitleContainingIgnoreCaseAndIndustriaName(query, IndustriaName);
        } else if (query != null && !query.isEmpty()) {
            jobs = jobRepository.findByTitleContainingIgnoreCase(query);
        } else if (locationName != null && !locationName.isEmpty() && IndustriaName != null && !IndustriaName.isEmpty()) {
            jobs = jobRepository.findByLocationNameAndIndustriaName(locationName, IndustriaName);
        } else if (locationName != null && !locationName.isEmpty()) {
            jobs = jobRepository.findByLocationName(locationName);
        } else if (IndustriaName != null && !IndustriaName.isEmpty()) {
            jobs = jobRepository.findByIndustriaName(IndustriaName);
        } else {
            jobs = jobRepository.findAll();
        }

        return jobs.stream()
                .map(JobMapper::mapToJobDto)
                .collect(Collectors.toList());
    }
}