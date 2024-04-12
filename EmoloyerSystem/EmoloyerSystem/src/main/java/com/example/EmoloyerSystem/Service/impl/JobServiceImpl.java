package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.Job;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.JobMapper;
import com.example.EmoloyerSystem.Repository.JobRepository;
import com.example.EmoloyerSystem.Service.JobService;
import com.example.EmoloyerSystem.dto.JobDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobRepository jobRepository;

    @Override
    public JobDto createJob(JobDto jobDto) {
        Job job = JobMapper.mapToJob(jobDto);
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
    public JobDto updateJob(Integer jobId, JobDto updatedJob) {
        Job job = jobRepository.findById(jobId.longValue())
                .orElseThrow(() -> new ResourceNotFoundException("Job not found with id: " + jobId));

        job.setTitle(updatedJob.getTitle());
        job.setDescription(updatedJob.getDescription());
        job.setRequirements(updatedJob.getRequirements());
        job.setLocation(updatedJob.getLocation());
        job.setSalary(updatedJob.getSalary());
        job.setJobType(updatedJob.getJobType());
        // Assuming deadline is of type Date
        job.setDeadline(updatedJob.getDeadline());

        Job updatedJobObj = jobRepository.save(job);
        return JobMapper.mapToJobDto(updatedJobObj);
    }

    @Override
    public void deleteJob(Integer jobId) {
        if (!jobRepository.existsById(jobId.longValue())) {
            throw new ResourceNotFoundException("Job not found with id: " + jobId);
        }
        jobRepository.deleteById(jobId.longValue());
    }
}