package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.dto.CVDto;

public class CVMapper {
    public static CVDto mapToCvDto(CV Cv)
    {
        return new CVDto(
            Cv.getCvid(),
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
            Cv.getHighschool()
        );
    }
    public static CV mapToCv(CVDto Cv)
    {
        CV CV = new CV();
        CV.setCvid(Cv.getCvid());
        CV.setProfilepic(Cv.getProfilepic());
        CV.setName(Cv.getName());
        CV.setSurname(Cv.getSurname());
        CV.setEmail(Cv.getEmail());
        CV.setPhone_nr(Cv.getPhone_nr());
        CV.setStreet(Cv.getStreet());
        CV.setCity(Cv.getCity());
        CV.setDescription(Cv.getDescription());
        CV.setCollege(Cv.getCollege());
        CV.setDegree(Cv.getDegree());
        CV.setHighschool(Cv.getHighschool());
        return CV;
    }
}