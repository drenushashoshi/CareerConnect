package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.WorkExperience;
import com.example.EmoloyerSystem.dto.WorkExperienceDto;

public class WorkExperienceMapper {
   public static WorkExperienceDto mapToWorkExperienceDto(WorkExperience WorkExperience)
   {
       return new WorkExperienceDto(
           WorkExperience.getExperience_id(),
           WorkExperience.getStartingyear(),
           WorkExperience.getLastyear(),
           WorkExperience.getCompanyname(),
           WorkExperience.getStreet(),
           WorkExperience.getCity(),
           WorkExperience.getJobposition(),
           WorkExperience.getDescription(),
           WorkExperience.getCV().getCvid()
       );
   }
   public static WorkExperience mapToWorkExperience(WorkExperienceDto WorkExperience,CV CV)
   {
    WorkExperience workExperience = new WorkExperience();
           workExperience.setExperience_id(WorkExperience.getExperience_id());
           workExperience.setStartingyear(WorkExperience.getStartingyear());
           workExperience.setLastyear(WorkExperience.getLastyear());
           workExperience.setCompanyname(WorkExperience.getCompanyname());
           workExperience.setStreet(WorkExperience.getStreet());
           workExperience.setCity(WorkExperience.getCity());
           workExperience.setJobposition(WorkExperience.getJobposition());
           workExperience.setDescription(WorkExperience.getDescription());
           workExperience.setCV(CV);
           return workExperience;
   }

}
