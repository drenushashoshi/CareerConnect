package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.ApplicationMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.EmoloyerSystem.Entity.Application;
import com.example.EmoloyerSystem.Entity.Employee;
import com.example.EmoloyerSystem.Entity.Internship;
import com.example.EmoloyerSystem.Entity.Job;
import com.example.EmoloyerSystem.Repository.ApplicationRepository;
import com.example.EmoloyerSystem.Repository.EmployeeRepository;
import com.example.EmoloyerSystem.Repository.InternshipRepository;
import com.example.EmoloyerSystem.Repository.JobRepository;
import com.example.EmoloyerSystem.dto.ApplicationDto;
import com.example.EmoloyerSystem.Service.ApplicationService;

import java.util.List;
import java.util.stream.Collectors;


@Service
@AllArgsConstructor
public class ApplicationServiceImpl implements ApplicationService{

    private  ApplicationRepository applicationRepository;
    private EmployeeRepository employeeRepository;
    private JobRepository jobRepository;
    private InternshipRepository internshipRepository;

    @Override
    public ApplicationDto createApplication(ApplicationDto ApplicationDto) {
        Employee employee = employeeRepository.findById(ApplicationDto.getEmployeeid()).orElseThrow(()-> new ResourceNotFoundException("Employee does not exist"));
        
        Job job = null;
        if (ApplicationDto.getJobid() != 0) {
            job = jobRepository.findById(ApplicationDto.getJobid()).orElseThrow(()-> new ResourceNotFoundException("Job does not exist"));
        }
        
        Internship internship = null;
        if (ApplicationDto.getInternshipid() != 0) {
            internship = internshipRepository.findById(ApplicationDto.getInternshipid()).orElseThrow(()-> new ResourceNotFoundException("internship does not exist"));
        }

        Application Application= ApplicationMapper.mapToApplication(ApplicationDto,job,internship,employee);
        Application savedApplication=applicationRepository.save(Application);
        return ApplicationMapper.mapToApplicationDto(savedApplication);
    }

    @Override
    public ApplicationDto getApplicationById(Integer ApplicationID) {
        Application Application=applicationRepository.findById(ApplicationID)
                .orElseThrow(()->
                        new ResourceNotFoundException("Application does not exist"));

        return ApplicationMapper.mapToApplicationDto(Application);
    }

    @Override
    public void deleteApplication(Integer ApplicationID) {
        Application Application=applicationRepository.findById(ApplicationID).orElseThrow(
                ()-> new ResourceNotFoundException("Application does not exist")
        );
        applicationRepository.delete(Application);
    }

    @Override
    public ApplicationDto updateApplication(Integer ApplicationID, ApplicationDto updatedApplication) {
        Application Application=applicationRepository.findById(ApplicationID).orElseThrow(
                ()-> new ResourceNotFoundException("Application does not exist")
        );
        Application.setName(updatedApplication.getName());
        Application.setEmail(updatedApplication.getEmail());
        Application.setPhone_nr(updatedApplication.getPhone_nr());
        Application.setAge(updatedApplication.getAge());
        Application.setCity(updatedApplication.getCity());
        Application.setDescription(updatedApplication.getDescription());
        Application.setGender(updatedApplication.getGender());

        Application updateApplicationn=applicationRepository.save(Application);

        return ApplicationMapper.mapToApplicationDto(updateApplicationn);
    }

    @Override
    public List<ApplicationDto> getAllApplications(){
        List<Application> Applications=applicationRepository.findAll();
        return Applications.stream().map(ApplicationMapper::mapToApplicationDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ApplicationDto> getApplicationsByEmployeeid(int id)
    {
        List<Application> Applications = applicationRepository.findByEmployeeidId(id).orElseThrow(()-> new ResourceNotFoundException("Application does not exist"));

        return Applications.stream()
        .map(ApplicationMapper::mapToApplicationDto)
        .collect(Collectors.toList());
    }
    @Override
    public List<ApplicationDto> getApplicationsByInternshipid(int id)
    {
        List<Application> Applications = applicationRepository.findByInternshipidId(id).orElseThrow(()-> new ResourceNotFoundException("Application does not exist"));

        return Applications.stream()
        .map(ApplicationMapper::mapToApplicationDto)
        .collect(Collectors.toList());
    }
    @Override
    public List<ApplicationDto> getApplicationsByJobid(long id)
    {
        List<Application> Applications = applicationRepository.findByJobidId(id).orElseThrow(()-> new ResourceNotFoundException("Application does not exist"));

        return Applications.stream()
        .map(ApplicationMapper::mapToApplicationDto)
        .collect(Collectors.toList());
    }
    
    
}
