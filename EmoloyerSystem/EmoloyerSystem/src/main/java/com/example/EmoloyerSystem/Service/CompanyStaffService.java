package com.example.EmoloyerSystem.Service;


import com.example.EmoloyerSystem.dto.CompanyDto;
import com.example.EmoloyerSystem.dto.CompanyStaffDto;

import java.util.List;

public interface CompanyStaffService {
    CompanyStaffDto createCompanyStaff(CompanyStaffDto companyStaffDto);
    CompanyStaffDto getCompanyStaffId(Integer companyStaffId);
    List<CompanyStaffDto> getAllCompanyStaff();

    CompanyStaffDto updateCompanyStaff(Integer id, CompanyStaffDto updatedCompanyStaff);

    void deleteCompanyStaff(Integer id);
}
