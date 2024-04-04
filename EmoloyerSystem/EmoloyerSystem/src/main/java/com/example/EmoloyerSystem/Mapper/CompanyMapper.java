package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.dto.CompanyDto;

public class CompanyMapper {
    public static CompanyDto mapToCompanyDto(Company company){
        return new CompanyDto(
                company.getId(),
                company.getName(),
                company.getEmail(),
                company.getAddress(),
                company.getPhone_number(),
                company.getPassword(),
                company.getOpening_year(),
                company.getDescription()
        );
    }
    public static Company mapToCompany(CompanyDto companyDto){
        return new Company(
                companyDto.getId(),
                companyDto.getName(),
                companyDto.getEmail(),
                companyDto.getAddress(),
                companyDto.getPhone_number(),
                companyDto.getPassword(),
                companyDto.getOpening_year(),
                companyDto.getDescription()
        );
    }
}
