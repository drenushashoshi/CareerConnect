package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.dto.CompanyStaffDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CompanyStaffService {

    CompanyStaffDto createCompanyStaff(CompanyStaffDto companyStaffDto, MultipartFile file) throws IOException;
    CompanyStaffDto getCompanyStaffId(Integer companyStaffId);
    List<CompanyStaffDto> getAllCompanyStaff(int companyId);
    CompanyStaffDto updateCompanyStaff(Integer companyStaffId, CompanyStaffDto updatedCompanyStaff, MultipartFile file) throws IOException;
    void deleteCompanyStaff(Integer companyStaffId);
    byte[] downloadImage(Integer companyStaffId);
}
