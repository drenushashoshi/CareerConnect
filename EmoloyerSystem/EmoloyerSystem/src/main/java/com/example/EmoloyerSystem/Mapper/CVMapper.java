package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.dto.CVDto;

public class CVMapper {
    public static CVDto mapToCvDto(CV Cv)
    {
        return new CVDto(
            Cv.getCv_id(),
            Cv.getProfilepic(),
            Cv.getName(),
            Cv.getSurname(),
            Cv.getEmail(),
            Cv.getPhone_nr(),
            Cv.getStreet(),
            Cv.getCity(),
            Cv.getDescription(),
            Cv.getCollege(),
            Cv.getDegree(),
            Cv.getHighschool(),
            Cv.getReferences(),
            Cv.getWorkExperiences()
        );
    }
    public static CV mapToCv(CVDto Cv)
    {
        return new CV(
            Cv.getCv_id(),
            Cv.getProfilepic(),
            Cv.getName(),
            Cv.getSurname(),
            Cv.getEmail(),
            Cv.getPhone_nr(),
            Cv.getStreet(),
            Cv.getCity(),
            Cv.getDescription(),
            Cv.getCollege(),
            Cv.getDegree(),
            Cv.getHighschool(),
            Cv.getReferences(),
            Cv.getWorkExperiences()
        );
    }
}