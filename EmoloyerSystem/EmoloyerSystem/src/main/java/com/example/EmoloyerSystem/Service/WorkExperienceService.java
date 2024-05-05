package com.example.EmoloyerSystem.Service;

import java.util.List;

import com.example.EmoloyerSystem.dto.WorkExperienceDto;

public interface WorkExperienceService {

   WorkExperienceDto createWorkExperience(WorkExperienceDto WorkExperienceDto);
   WorkExperienceDto updateWorkExperience(int Id,WorkExperienceDto WorkExperienceDto);
   WorkExperienceDto getWorkExperienceById(int id);
   List<WorkExperienceDto> getWorkExperienceByCvId(int id);
   List<WorkExperienceDto>getAllWorkExperiences();
   void deleteWorkExperience(int id);

}
