package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.CvService;
import com.example.EmoloyerSystem.dto.CVDto;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class CvController {

    private final CvService CVService;

    @PostMapping("/employee/createCv")
    public ResponseEntity<CVDto> createCv(@RequestParam("image") MultipartFile file,@RequestParam("CV") String CV)throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        CVDto savedCV = objectMapper.readValue(CV, CVDto.class);
        return ResponseEntity.ok(CVService.createCv(savedCV, file));
    }

    @GetMapping("/employee/getall")
    public ResponseEntity<List<CVDto>> getAllCVs() {
        List<CVDto> CVs = CVService.getAllCvs();
        return ResponseEntity.ok(CVs);
    }

    @GetMapping("/public/Cv/{id}")
    public ResponseEntity<CVDto> getCVById(@PathVariable int id) {
        try {
            CVDto cv = CVService.getCvById(id);
            return ResponseEntity.ok(cv);
        } catch (Exception e) {
            // Handle the exception appropriately, for example, returning a 404 Not Found response
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/public/Cv/Employee/{id}")
    public ResponseEntity<CVDto> getCvByEmployeeId(@PathVariable int id)
    {
        CVDto Cvs = CVService.getCvByEmployeeId(id);
        return ResponseEntity.ok(Cvs);
    }
    
    @PutMapping("/employee/update/cv/{id}")
    public ResponseEntity<CVDto> updateCv(@PathVariable("id") Integer CVID, @RequestPart("CV") String CvJson,@RequestPart(value = "image",required = false) MultipartFile file) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        CVDto updatedCV = objectMapper.readValue(CvJson, CVDto.class);
        CVDto CV = CVService.updateCv(CVID, updatedCV,file);
        return ResponseEntity.ok(CV);
    }

    @DeleteMapping("/employee/deleteCv/{id}")
    public ResponseEntity<String> deleteCv(@PathVariable("id") Integer CVID) {
        CVService.deleteCv(CVID);
        return ResponseEntity.ok("CV Deleted");
    }
        @GetMapping("/public/downloadImage/{id}")
    public ResponseEntity<byte[]> downloadImage(@PathVariable("id") int cvid) {
        byte[] image = CVService.downloadImage(cvid);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"image.jpg\"")
                .body(image);
    }
}
