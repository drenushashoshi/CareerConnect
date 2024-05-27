package com.example.EmoloyerSystem.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.EmoloyerSystem.dto.CVDto;

@Service
public interface CvService {

   CVDto createCv(CVDto CV);
   CVDto updateCv(int Id,CVDto Cv);
   CVDto getCvById(int id);
   List<CVDto>getAllCvs();
   void deleteCv(int id);
   CVDto getCvByEmployeeId(int id);
   // String uploadPicture(Integer cvId, MultipartFile file);
}
