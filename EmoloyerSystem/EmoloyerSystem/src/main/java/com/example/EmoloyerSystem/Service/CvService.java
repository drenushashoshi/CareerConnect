package com.example.EmoloyerSystem.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.EmoloyerSystem.dto.CVDto;

@Service
public interface CvService {

   CVDto createCv(CVDto CV,MultipartFile file) throws IOException;
   CVDto updateCv(int Id,CVDto Cv,MultipartFile file) throws IOException;
   CVDto getCvById(int id);
   List<CVDto>getAllCvs();
   void deleteCv(int id);
   CVDto getCvByEmployeeId(int id);
   byte[] downloadImage(int cvid);
}
