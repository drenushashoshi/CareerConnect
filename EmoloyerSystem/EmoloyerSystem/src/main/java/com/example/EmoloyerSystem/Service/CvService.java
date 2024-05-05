package com.example.EmoloyerSystem.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.EmoloyerSystem.dto.CVDto;

public interface CvService {

   CVDto createCv(CVDto CV);
   CVDto updateCv(int Id,CVDto Cv);
   CVDto getCvById(int id);
   List<CVDto>getAllCvs();
   void deleteCv(int id);
   String uploadPicture(Integer ID,MultipartFile file);
}
