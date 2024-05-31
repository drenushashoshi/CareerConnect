package com.example.EmoloyerSystem.Service;

import java.util.List;

import com.example.EmoloyerSystem.dto.ApplicationDto;

public interface ApplicationService {
    
    ApplicationDto createApplication(ApplicationDto ApplicationDto);
    ApplicationDto getApplicationById(Integer ApplicationId);
    List<ApplicationDto> getAllApplications();
    ApplicationDto updateApplication(Integer ApplicationId, ApplicationDto updatedApplication);
    void deleteApplication(Integer ApplicationId);
    List<ApplicationDto> getApplicationsByEmployeeid(int id);
    List<ApplicationDto> getApplicationsByInternshipid(int id);
    List<ApplicationDto> getApplicationsByJobid(long id);
}
