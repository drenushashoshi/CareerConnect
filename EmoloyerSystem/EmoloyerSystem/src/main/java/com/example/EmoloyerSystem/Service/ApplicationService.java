package com.example.EmoloyerSystem.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.EmoloyerSystem.dto.ApplicationDto;

public interface ApplicationService {
    
    ApplicationDto createApplication(ApplicationDto ApplicationDto);

    ApplicationDto getApplicationById(Integer ApplicationId);

    List<ApplicationDto> getAllApplications();

    ApplicationDto updateApplication(Integer ApplicationId, ApplicationDto updatedApplication);

    void deleteApplication(Integer ApplicationId);

    String uploadResume(Integer ID,MultipartFile file);
}
