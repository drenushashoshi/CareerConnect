package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Entity.Application;
import com.example.EmoloyerSystem.Service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.example.EmoloyerSystem.Constant.Constant.Resume_Directiory;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/Applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<Application> createApplication(@RequestBody Application Application)
    {
        return ResponseEntity.ok().body(applicationService.createApplication(Application));
        //return ResponseEntity.created(URI.create("api/Applications/ApplicationID")).body(applicationService.createApplication(Application));
    }
    @GetMapping
    public ResponseEntity<Page<Application>> getAllApplications(@RequestParam(value = "page",defaultValue = "0") int page,
                                                             @RequestParam(value = "size", defaultValue = "10") int size)
    {
        return ResponseEntity.ok().body(applicationService.getAllApplications(page,size));
    }
    @GetMapping("/{ID}")
    public ResponseEntity<Application> getApplication(@PathVariable(value = "ID") Long ID)
    {
        return ResponseEntity.ok().body(applicationService.getApplication(ID));
    }
    @PutMapping("/resume")
    public ResponseEntity<String> uploadResume(@RequestParam("ID")Long ID, @RequestParam("file")MultipartFile file)
    {
        return ResponseEntity.ok().body(applicationService.UploadResume(ID,file));
    }
    @GetMapping(path = "/resume/{filename}")
    public byte[] getResume(@PathVariable("filename") String filename) throws IOException
    {
        return Files.readAllBytes(Paths.get(Resume_Directiory + filename));
    }
}
