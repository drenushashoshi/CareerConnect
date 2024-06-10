package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.dto.CompanyDto;
import java.util.stream.Collectors;

public class CompanyMapper {

    public static CompanyDto mapCompanyToDto(Company company) {
        CompanyDto companyDto = new CompanyDto();
        companyDto.setId(company.getId());
        companyDto.setName(company.getName());
        companyDto.setEmail(company.getEmail());
        companyDto.setAddress(company.getAddress());
        companyDto.setPhone_number(company.getPhone_number());
        companyDto.setPassword(company.getPassword());
        companyDto.setOpening_year(company.getOpening_year());
        companyDto.setDescription(company.getDescription());
        companyDto.setRole(company.getRole());
        // Convert nested entities to DTOs if necessary
        // Example for internships:
        if (company.getInternships() != null) {
            companyDto.setInternships(
                    company.getInternships().stream()
                            .map(InternshipMapper::mapToInternshipDto)
                            .collect(Collectors.toList())
            );
        }
        return companyDto;
    }

    public static Company mapDtoToCompany(CompanyDto companyDto) {
        Company company = new Company();
        company.setId(companyDto.getId());
        company.setName(companyDto.getName());
        company.setEmail(companyDto.getEmail());
        company.setAddress(companyDto.getAddress());
        company.setPhone_number(companyDto.getPhone_number());
        company.setPassword(companyDto.getPassword());
        company.setOpening_year(companyDto.getOpening_year());
        company.setDescription(companyDto.getDescription());
        company.setRole(companyDto.getRole());
        // Handle nested entities if necessary
        return company;
    }
}
