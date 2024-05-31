package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.Entity.Industria;
import com.example.EmoloyerSystem.Entity.Job;
import com.example.EmoloyerSystem.Entity.Location;
import com.example.EmoloyerSystem.dto.JobDto;

public class JobMapper {
    public static JobDto mapToJobDto(Job job) {
        return new JobDto(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getRequirements(),
                job.getLocation().getName(),
                job.getSalary(),
                job.getIndustria().getName(),
                job.getDeadline(),
                job.getCompany().getId()
        );
    }

    public static Job mapToJob(JobDto jobDto, Location location, Industria industria, Company company) {
        Job job = new Job();
        job.setId(jobDto.getId());
        job.setTitle(jobDto.getTitle());
        job.setDescription(jobDto.getDescription());
        job.setRequirements(jobDto.getRequirements());
        job.setLocation(location);
        job.setSalary(jobDto.getSalary());
        job.setIndustria(industria);
        job.setDeadline(jobDto.getDeadline());
        job.setCompany(company);
        return job;
    }
}
