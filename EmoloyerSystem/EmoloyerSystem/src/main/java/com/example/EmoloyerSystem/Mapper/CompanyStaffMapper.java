package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.Entity.CompanyStaff;
import com.example.EmoloyerSystem.dto.CompanyStaffDto;

public class CompanyStaffMapper {
    public static CompanyStaffDto mapToCompanyStaffDto(CompanyStaff companyStaff){
        return new CompanyStaffDto(
                companyStaff.getId(),
                companyStaff.getName(),
                companyStaff.getSurname(),
                companyStaff.getRole(),
                companyStaff.getCompany().getId(),
                companyStaff.getImage() // Add this line
        );
    }
    public static CompanyStaff mapToCompanyStaff(CompanyStaffDto companyStaffDto, Company company){
        CompanyStaff companyStaff = new CompanyStaff();

        companyStaff.setId(companyStaffDto.getId());
        companyStaff.setName(companyStaffDto.getName());
        companyStaff.setSurname(companyStaffDto.getSurname());
        companyStaff.setRole(companyStaffDto.getRole());
        companyStaff.setCompany(company);
        companyStaff.setImage(companyStaffDto.getImage()); // Add this line

        return companyStaff;
    }
}
