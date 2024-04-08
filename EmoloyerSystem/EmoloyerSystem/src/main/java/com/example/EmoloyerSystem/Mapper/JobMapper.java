package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Job;
import com.example.EmoloyerSystem.dto.JobDto;

public class JobMapper {
    public static JobDto mapToJobDto(Job job){
        return new JobDto(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getRequirements(),
                job.getLocation(),
                job.getSalary(),
                job.getJobType(),
                job.getDeadline()
        );
    }

    public static Job mapToJob(JobDto jobDto){
        return new Job(
                jobDto.getId(),
                jobDto.getTitle(),
                jobDto.getDescription(),
                jobDto.getRequirements(),
                jobDto.getLocation(),
                jobDto.getSalary(),
                jobDto.getJobType(),
                jobDto.getDeadline()
        );
    }
}
