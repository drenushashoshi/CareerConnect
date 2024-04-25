package com.example.EmoloyerSystem.Controller;
import com.example.EmoloyerSystem.Service.CvService;
import com.example.EmoloyerSystem.dto.CVDto;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.example.EmoloyerSystem.Constant.Constant.Resume_Directiory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/CVs")
@RequiredArgsConstructor
public class CvController {

    private final CvService CVService;

    @PostMapping()
    public ResponseEntity<CVDto> createCv(@RequestBody CVDto CV)
    {
        CVDto savedCV = CVService.createCv(CV);
        return new ResponseEntity<CVDto>(savedCV, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CVDto>> getAllCVs()
    {
        List<CVDto>CVs=CVService.getAllCvs();
        return ResponseEntity.ok(CVs);    
    }

    @GetMapping("/{id}")
    public ResponseEntity<CVDto> getCVById(@PathVariable(value = "ID") Integer ID)
    {
        CVDto CV= CVService.getCvById(ID);
        return ResponseEntity.ok(CV);
    }
    @PutMapping("/{id}")
    public ResponseEntity<CVDto> updateCv(@PathVariable("id") Integer CVID,
                                                   @RequestBody CVDto updatedCV){
        CVDto CV=CVService.updateCv(CVID, updatedCV);
        return ResponseEntity.ok(CV);

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCv(@PathVariable("id") Integer CVID){
        CVService.deleteCv(CVID);
        return ResponseEntity.ok("CV Deleted");
    }
    @PutMapping("/CV")
    public ResponseEntity<String> uploadPicture(@PathVariable("id") Integer id, @RequestBody MultipartFile resume) {
        try {
            CVService.uploadPicture(id, resume);
            return ResponseEntity.ok("Resume uploaded successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unable to upload resume: " + e.getMessage());
        }
    }
    @GetMapping("/resume/{filename}")
    public byte[] getPicture(@PathVariable("filename") String filename) throws IOException
    {
        return Files.readAllBytes(Paths.get(Resume_Directiory+filename));
    }
}
