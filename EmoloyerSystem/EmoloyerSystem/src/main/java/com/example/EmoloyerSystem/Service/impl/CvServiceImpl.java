package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.CVMapper;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.Employee;
import com.example.EmoloyerSystem.Repository.CvRepository;
import com.example.EmoloyerSystem.Repository.EmployeeRepository;
import com.example.EmoloyerSystem.dto.CVDto;
import com.example.EmoloyerSystem.Service.CvService;
import com.example.EmoloyerSystem.Service.ImageUtils;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import java.io.IOException;


@Service
@AllArgsConstructor
public class CvServiceImpl implements CvService{

   private  CvRepository CvRepository;
   private EmployeeRepository EmployeeRepository;

   @Override
   public CVDto createCv(CVDto CvDto,MultipartFile file) throws IOException, IllegalArgumentException {
    Employee employee = EmployeeRepository.findById(CvDto.getEmployee()).orElseThrow(()->
    new ResourceNotFoundException("Cv does not exist"));
    Optional<CV> emailCheck = CvRepository.findByEmail(CvDto.getEmail());
    if (emailCheck.isPresent()) {
        throw new IllegalArgumentException("Email already in use by another CV");
    }

    // Check for phone number uniqueness
    Optional<CV> phoneCheck = CvRepository.findByPhonenr(CvDto.getPhone_nr());
    if (phoneCheck.isPresent()) {
        throw new IllegalArgumentException("Phone number already in use by another CV");
    }
    
    CV Cv= CVMapper.mapToCv(CvDto,employee);
       if (file != null && !file.isEmpty()) {
            Cv.setImage(ImageUtils.compressImage(file.getBytes()));
       }
       CV savedCv=CvRepository.save(Cv);
       return CVMapper.mapToCvDto(savedCv);
   }

   @Override
   public CVDto getCvById(int CvID) {
       CV Cv=CvRepository.findById(CvID)
               .orElseThrow(()->
                       new ResourceNotFoundException("Cv does not exist"));

       return CVMapper.mapToCvDto(Cv);
   }

   @Override
   public void deleteCv(int CvID) {
       CV Cv=CvRepository.findById(CvID).orElseThrow(
               ()-> new ResourceNotFoundException("Cv does not exist")
       );
       CvRepository.deleteById(CvID);
   }

   @Override
   public CVDto updateCv(int CvID, CVDto updatedCv, MultipartFile file) throws IOException, IllegalArgumentException {
    // Retrieve existing CV
    CV existingCv = CvRepository.findById(CvID).orElseThrow(
        () -> new ResourceNotFoundException("Cv does not exist")
    );

    // Check for email uniqueness
    Optional<CV> emailCheck = CvRepository.findByEmail(updatedCv.getEmail());
    if (emailCheck.isPresent() && emailCheck.get().getCvid() != existingCv.getCvid()) {
        throw new IllegalArgumentException("Email already in use by another CV");
    }

    // Check for phone number uniqueness
    Optional<CV> phoneCheck = CvRepository.findByPhonenr(updatedCv.getPhone_nr());
    if (phoneCheck.isPresent() && phoneCheck.get().getCvid() != existingCv.getCvid()) {
        throw new IllegalArgumentException("Phone number already in use by another CV");
    }

    // Update image if new file is provided
    if (file != null && !file.isEmpty()) {
        existingCv.setImage(ImageUtils.compressImage(file.getBytes()));
    }

    // Update CV fields
    existingCv.setName(updatedCv.getName());
    existingCv.setSurname(updatedCv.getSurname());
    existingCv.setEmail(updatedCv.getEmail());
    existingCv.setPhone_nr(updatedCv.getPhone_nr());
    existingCv.setStreet(updatedCv.getStreet());
    existingCv.setCity(updatedCv.getCity());
    existingCv.setDescription(updatedCv.getDescription());
    existingCv.setCollege(updatedCv.getCollege());
    existingCv.setHighschool(updatedCv.getHighschool());

    // Save the updated CV
    CV updatedCvEntity = CvRepository.save(existingCv);

    // Map to DTO and return
    return CVMapper.mapToCvDto(updatedCvEntity);
}


   @Override
   public List<CVDto> getAllCvs(){
       List<CV> Cvs=CvRepository.findAll();
       return Cvs.stream().map(CVMapper::mapToCvDto)
               .collect(Collectors.toList());
   }
   @Override
   public CVDto getCvByEmployeeId(int id)
   {
       CV CV = CvRepository.findByEmployeeId(id).orElseThrow(
               ()-> new ResourceNotFoundException("Employee does not exist")
       );
       return CVMapper.mapToCvDto(CV);
   }
    @Override
    public byte[] downloadImage(int Cvid) {
        CV Cv = CvRepository.findById(Cvid)
                .orElseThrow(() -> new ResourceNotFoundException("Cv does not exist"));
        return ImageUtils.decompressImage(Cv.getImage());
    }

}
