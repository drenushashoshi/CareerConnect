package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.ApplicationMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.EmoloyerSystem.Entity.Application;
import com.example.EmoloyerSystem.Repository.ApplicationRepository;
import com.example.EmoloyerSystem.dto.ApplicationDto;
import com.example.EmoloyerSystem.Service.ApplicationService;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.example.EmoloyerSystem.Constant.Constant.Resume_Directiory;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

import java.io.IOException;

@Service
@AllArgsConstructor
public class ApplicationServiceImpl implements ApplicationService{

    private  ApplicationRepository applicationRepository;

    @Override
    public ApplicationDto createApplication(ApplicationDto ApplicationDto) {
        Application Application= ApplicationMapper.mapToApplication(ApplicationDto);
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
        applicationRepository.deleteById(ApplicationID);
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

    public String uploadResume(Integer Id, MultipartFile resume) {
        ApplicationDto applicationDto = getApplicationById(Id);
        Application application = ApplicationMapper.mapToApplication(applicationDto);
    
        try {
            String resumeContent = new String(resume.getBytes()); // Convert MultipartFile to string
            application.setFile(resumeContent); // Set the document content to the string
            applicationRepository.save(application); // Save the updated Application entity
        } catch (IOException e) {
            throw new RuntimeException("Unable to read resume content", e);
        }
    
        return "Resume uploaded successfully";
    }
    
    

    public final Function<String,String> fileExtension = filename-> Optional.of(filename).filter(name-> name.contains("."))
            .map(name-> "."+name.substring(filename.lastIndexOf(".")+1)).orElse(".pdf");

    public final BiFunction<String,MultipartFile,String> ResumeFunction = (ID,Document)->
    {
        try
        {
            Path fileStorageLocation = Paths.get(Resume_Directiory).toAbsolutePath().normalize();
            if (!Files.exists(fileStorageLocation))
            {
                Files.createDirectories(fileStorageLocation);
            }
            Files.copy(Document.getInputStream(),fileStorageLocation.resolve(ID+fileExtension.apply(Document.getOriginalFilename())),REPLACE_EXISTING);
            return ServletUriComponentsBuilder.fromCurrentContextPath().path("/applications/resume"+ID+fileExtension.apply(Document.getOriginalFilename())).toUriString();
        }
        catch (Exception exception)
        {
            throw  new RuntimeException("Unable to save resume");
        }
    };
    
}
