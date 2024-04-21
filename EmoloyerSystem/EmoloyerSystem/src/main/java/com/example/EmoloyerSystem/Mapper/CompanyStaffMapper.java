package com.example.EmoloyerSystem.Mapper;


import com.example.EmoloyerSystem.Entity.CompanyStaff;
import com.example.EmoloyerSystem.dto.CompanyStaffDto;

public class CompanyStaffMapper {
    public static CompanyStaffDto mapToCompanyStaffDto(CompanyStaff companyStaff){
        return new CompanyStaffDto(
                companyStaff.getId(),
                companyStaff.getName(),
                companyStaff.getSurname(),
                companyStaff.getRole(),
                companyStaff.getCompanyId()
        );
    }
    public static CompanyStaff mapToCompanyStaff(CompanyStaffDto companyStaffDto){
        return new CompanyStaff(
                companyStaffDto.getId(),
                companyStaffDto.getName(),
                companyStaffDto.getSurname(),
                companyStaffDto.getRole(),
                companyStaffDto.getCompanyId()
        );
    }
}
