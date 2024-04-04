package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.dto.CompanyDto;

import java.util.List;

public interface CompanyService {
    CompanyDto createCompany(CompanyDto companyDto);

    CompanyDto getCompanyId(Integer companyId);
    List<CompanyDto> getAllCompanies();

    CompanyDto updateCompany(Integer companyId, CompanyDto updatedCompany);

    void deleteCompany(Integer companyId);
}
