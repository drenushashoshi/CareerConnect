package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.CvService;
import com.example.EmoloyerSystem.dto.CVDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static com.example.EmoloyerSystem.Constant.Constant.Resume_Directiory;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class CvController {

    private final CvService CVService;

    @PostMapping("/employee/create")
    public ResponseEntity<CVDto> createCv(@RequestBody CVDto CV) {
        CVDto savedCV = CVService.createCv(CV);
        return new ResponseEntity<>(savedCV, HttpStatus.CREATED);
    }

    @GetMapping("/employee/getall")
    public ResponseEntity<List<CVDto>> getAllCVs() {
        List<CVDto> CVs = CVService.getAllCvs();
        return ResponseEntity.ok(CVs);
    }

    @GetMapping("/employee/Cv/{id}")
    public ResponseEntity<CVDto> getCVById(@PathVariable int id) {
        try {
            CVDto cv = CVService.getCvById(id);
            return ResponseEntity.ok(cv);
        } catch (Exception e) {
            // Handle the exception appropriately, for example, returning a 404 Not Found response
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/employee/Cv/Employee/{id}")
    public ResponseEntity<CVDto> getCvByEmployeeId(@PathVariable int id)
    {
        CVDto Cvs = CVService.getCvByEmployeeId(id);
        return ResponseEntity.ok(Cvs);
    }
    
    @PutMapping("/employee/{id}")
    public ResponseEntity<CVDto> updateCv(@PathVariable("id") Integer CVID, @RequestBody CVDto updatedCV) {
        CVDto CV = CVService.updateCv(CVID, updatedCV);
        return ResponseEntity.ok(CV);
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<String> deleteCv(@PathVariable("id") Integer CVID) {
        CVService.deleteCv(CVID);
        return ResponseEntity.ok("CV Deleted");
    }

    // @PostMapping("/employee/upload")
    // public ResponseEntity<String> uploadPicture(@RequestParam("id") Integer cvId, @RequestParam("file") MultipartFile file) {
    //     return ResponseEntity.ok().body(CVService.uploadPicture(cvId, file));
    // }

    @GetMapping("/employee/image/{filename}")
    public byte[] getPhoto(@PathVariable("filename") String filename) throws IOException {
        return Files.readAllBytes(Paths.get(Resume_Directiory + filename));
    }
}
