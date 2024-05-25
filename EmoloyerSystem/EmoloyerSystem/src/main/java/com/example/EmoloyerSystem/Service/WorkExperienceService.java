package com.example.EmoloyerSystem.Service;

import java.util.List;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.WorkExperience;
import com.example.EmoloyerSystem.dto.WorkExperienceDto;

public interface WorkExperienceService {

  WorkExperienceDto createWorkExperience(WorkExperienceDto WorkExperienceDto,CV CV);
  WorkExperienceDto updateWorkExperience(int Id,WorkExperienceDto WorkExperienceDto);
  WorkExperienceDto getWorkExperienceById(int id);
  List<WorkExperience> getWorkExperienceByCvId(int id);
  List<WorkExperienceDto>getAllWorkExperiences();
  void deleteWorkExperience(int id);

}
