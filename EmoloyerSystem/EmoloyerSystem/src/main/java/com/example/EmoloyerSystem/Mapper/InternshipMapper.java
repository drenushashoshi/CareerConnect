package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Internship;
import com.example.EmoloyerSystem.dto.InternshipDto;

public class InternshipMapper {
    public static InternshipDto mapToInternshipDto(Internship internship){
        return new InternshipDto(
                internship.getId(),
                internship.getTittle(),
                internship.getCompany_name(),
                internship.getDescription(),
                internship.getStart_date(),
                internship.getEnd_date(),
                internship.getRequirements(),
                internship.getLocation(),
                internship.getType(),
                internship.getDeadline()
        );
    }

    public static Internship mapToInternship(InternshipDto internshipDto){
        return new Internship(
                internshipDto.getId(),
                internshipDto.getTittle(),
                internshipDto.getCompany_name(),
                internshipDto.getDescription(),
                internshipDto.getStart_date(),
                internshipDto.getEnd_date(),
                internshipDto.getRequirements(),
                internshipDto.getLocation(),
                internshipDto.getType(),
                internshipDto.getDeadline()
        );
    }
}
