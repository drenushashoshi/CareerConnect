package com.example.EmoloyerSystem.Mapper;

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
           WorkExperience.getCv_id()
       );
   }
   public static WorkExperience mapToWorkExperience(WorkExperienceDto WorkExperience)
   {
       return new WorkExperience(
           WorkExperience.getExperience_id(),
           WorkExperience.getStartingyear(),
           WorkExperience.getLastyear(),
           WorkExperience.getCompanyname(),
           WorkExperience.getStreet(),
           WorkExperience.getCity(),
           WorkExperience.getJobposition(),
           WorkExperience.getDescription(),
           WorkExperience.getCv_id()
       );
   }

}
