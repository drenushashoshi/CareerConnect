package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.Entity.Industria;
import com.example.EmoloyerSystem.Entity.Internship;
import com.example.EmoloyerSystem.Entity.Location;
import com.example.EmoloyerSystem.dto.InternshipDto;

public class InternshipMapper {
    public static InternshipDto mapToInternshipDto(Internship internship){
        return new InternshipDto(
                internship.getId(),
                internship.getTitle(),
                internship.getCompany_name(),
                internship.getDescription(),
                internship.getStart_date(),
                internship.getEnd_date(),
                internship.getRequirements(),
                internship.getLocation().getName(),
                internship.getIndustria().getName(),
                internship.getDeadline(),
                internship.getCompany().getId()
        );
    }

    public static Internship mapToInternship(InternshipDto internshipDto, Location location, Industria industria, Company company){

        Internship internship = new Internship();

        internship.setId(internshipDto.getId());
        internship.setTitle(internshipDto.getTitle());
        internship.setDescription(internshipDto.getDescription());
        internship.setRequirements(internshipDto.getRequirements());
        internship.setStart_date(internshipDto.getStart_date());
        internship.setEnd_date(internshipDto.getEnd_date());
        internship.setCompany_name(internship.getCompany_name());
        internship.setLocation(location);
        internship.setIndustria(industria);
        internship.setDeadline(internshipDto.getDeadline());
        internship.setCompany(company);


        return internship;


    }
}
