package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.WorkExperienceMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.WorkExperience;
import com.example.EmoloyerSystem.Repository.CvRepository;
import com.example.EmoloyerSystem.Repository.ReferenceRepository;
import com.example.EmoloyerSystem.Repository.WorkExperienceRepository;
import com.example.EmoloyerSystem.dto.ReferenceDto;
import com.example.EmoloyerSystem.dto.WorkExperienceDto;
import com.example.EmoloyerSystem.Service.WorkExperienceService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class WorkExperienceServiceImpl implements WorkExperienceService{

   private  WorkExperienceRepository WorkExperienceRepository;
   private CvRepository CvRepository;

   @Override
   public WorkExperienceDto createWorkExperience(WorkExperienceDto WorkExperienceDto,CV CV) {
       WorkExperience WorkExperience= WorkExperienceMapper.mapToWorkExperience(WorkExperienceDto,CV);
       WorkExperience savedWorkExperience=WorkExperienceRepository.save(WorkExperience);
       return WorkExperienceMapper.mapToWorkExperienceDto(savedWorkExperience);
   }

   @Override
   public WorkExperienceDto getWorkExperienceById(int WorkExperienceID) {
       WorkExperience WorkExperience=WorkExperienceRepository.findById(WorkExperienceID)
               .orElseThrow(()->
                       new ResourceNotFoundException("WorkExperience does not exist"));

       return WorkExperienceMapper.mapToWorkExperienceDto(WorkExperience);
   }
   @Override
   public List<WorkExperience> getWorkExperienceByCvId(int CvId) {
        CV CV = CvRepository.findById(CvId).orElseThrow(()-> new ResourceNotFoundException("Reference does not exist"));
       List<WorkExperience> WorkExperience = WorkExperienceRepository.findByCV(CV).orElseThrow(
               ()-> new ResourceNotFoundException("WorkExperience does not exist")
       );
       return WorkExperience;
   }

   @Override
   public void deleteWorkExperience(int WorkExperienceID) {
       WorkExperience WorkExperience=WorkExperienceRepository.findById(WorkExperienceID).orElseThrow(
               ()-> new ResourceNotFoundException("WorkExperience does not exist")
       );
       WorkExperienceRepository.deleteById(WorkExperienceID);
   }

   @Override
   public WorkExperienceDto updateWorkExperience(int WorkExperienceID, WorkExperienceDto updatedWorkExperience) {
       WorkExperience WorkExperience=WorkExperienceRepository.findById(WorkExperienceID).orElseThrow(
               ()-> new ResourceNotFoundException("Work Experience does not exist")
       );
       WorkExperience.setStartingyear(updatedWorkExperience.getStartingyear());
       WorkExperience.setLastyear(updatedWorkExperience.getLastyear());
       WorkExperience.setCompanyname(updatedWorkExperience.getCompanyname());
       WorkExperience.setStreet(updatedWorkExperience.getStreet());
       WorkExperience.setCity(updatedWorkExperience.getCity());
       WorkExperience.setJobposition(updatedWorkExperience.getJobposition());
       WorkExperience.setDescription(updatedWorkExperience.getDescription());
       WorkExperience updateWorkExperiencen=WorkExperienceRepository.save(WorkExperience);

       return WorkExperienceMapper.mapToWorkExperienceDto(updateWorkExperiencen);
   }

   @Override
   public List<WorkExperienceDto> getAllWorkExperiences(){
       List<WorkExperience> WorkExperiences=WorkExperienceRepository.findAll();
       return WorkExperiences.stream().map(WorkExperienceMapper::mapToWorkExperienceDto)
               .collect(Collectors.toList());
   }

}