package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.Entity.Application;
import com.example.EmoloyerSystem.Repository.ApplicationRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.example.EmoloyerSystem.Constant.Constant.Resume_Directiory;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;

    public Page<Application> getAllApplications(int page, int size)
    {
        return applicationRepository.findAll(PageRequest.of(page,size, Sort.by("name")));
    }

    public Application getApplication(Long Id)
    {
        return applicationRepository.findByID(Id).orElseThrow(()-> new RuntimeException("Application not Found"));
    }

    public Application createApplication(Application Application)
    {
        return applicationRepository.save(Application);
    }

    public void deleteApplication(Application Application)
    {
        applicationRepository.delete(Application);
    }

    public String UploadResume(Long Id, MultipartFile resume)
    {
        Application application = getApplication(Id);
        String Resume = null;
        application.setDocument(Resume);
        applicationRepository.save(application);
        return Resume;
    }
    public List<Application> getApplicationsByCompanyID(int ID)
    {
        return applicationRepository.findByCompanyID(ID);
    }
    public List<Application> getApplicationsByWorkerID(int ID)
    {
        return applicationRepository.findByWorkerID(ID);
    }


    private final Function<String,String> fileExtension = filename-> Optional.of(filename).filter(name-> name.contains("."))
            .map(name-> "."+name.substring(filename.lastIndexOf(".")+1)).orElse(".pdf");

    private final BiFunction<String,MultipartFile,String> ResumeFunction = (ID,Document)->
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
