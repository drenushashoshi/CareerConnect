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
import java.util.stream.Collectors;

import java.io.IOException;


@Service
@AllArgsConstructor
public class CvServiceImpl implements CvService{

   private  CvRepository CvRepository;
   private EmployeeRepository EmployeeRepository;

   @Override
   public CVDto createCv(CVDto CvDto,MultipartFile file) throws IOException {
    Employee employee = EmployeeRepository.findById(CvDto.getEmployee()).orElseThrow(()->
    new ResourceNotFoundException("Cv does not exist"));
    
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
   public CVDto updateCv(int CvID, CVDto updatedCv,MultipartFile file) throws IOException {
       CV Cv=CvRepository.findById(CvID).orElseThrow(
               ()-> new ResourceNotFoundException("Cv does not exist")
       );
       if (file != null && !file.isEmpty()) {
        Cv.setImage(ImageUtils.compressImage(file.getBytes()));
        }
       Cv.setName(updatedCv.getName());
       Cv.setSurname(updatedCv.getSurname());
       Cv.setEmail(updatedCv.getEmail());
       Cv.setPhone_nr(updatedCv.getPhone_nr());
       Cv.setStreet(updatedCv.getStreet());
       Cv.setCity(updatedCv.getCity());
       Cv.setDescription(updatedCv.getDescription());
       Cv.setCollege(updatedCv.getCollege());
       Cv.setHighschool(updatedCv.getHighschool());

       CV updateCvn=CvRepository.save(Cv);

       return CVMapper.mapToCvDto(updateCvn);
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
