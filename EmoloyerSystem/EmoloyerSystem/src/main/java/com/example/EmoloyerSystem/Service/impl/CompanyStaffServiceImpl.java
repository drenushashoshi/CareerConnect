package com.example.EmoloyerSystem.Service.impl;


import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.Entity.CompanyStaff;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.CompanyMapper;
import com.example.EmoloyerSystem.Mapper.CompanyStaffMapper;
import com.example.EmoloyerSystem.Repository.CompanyStaffRepository;
import com.example.EmoloyerSystem.Service.CompanyStaffService;
import com.example.EmoloyerSystem.dto.CompanyDto;
import com.example.EmoloyerSystem.dto.CompanyStaffDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
@Service
@AllArgsConstructor
public class CompanyStaffServiceImpl implements CompanyStaffService {
    private CompanyStaffRepository companyStaffRepository;
    @Override
    public CompanyStaffDto createCompanyStaff(CompanyStaffDto companyStaffDto) {
        CompanyStaff companyStaff= CompanyStaffMapper.mapToCompanyStaff(companyStaffDto);
        CompanyStaff savedCompanyStaff=companyStaffRepository.save(companyStaff);

        return CompanyStaffMapper.mapToCompanyStaffDto(savedCompanyStaff);
    }
    @Override
    public CompanyStaffDto getCompanyStaffId(Integer companyStaffId) {
        CompanyStaff companyStaff=companyStaffRepository.findById(companyStaffId)
                .orElseThrow(()->
                        new ResourceNotFoundException("CompanyStaff does not exist"));

        return CompanyStaffMapper.mapToCompanyStaffDto(companyStaff);
    }
    @Override
    public List<CompanyStaffDto> getAllCompanyStaff() {
        List<CompanyStaff> companyStaffs=companyStaffRepository.findAll();
        return companyStaffs.stream().map(CompanyStaffMapper::mapToCompanyStaffDto)
                .collect(Collectors.toList());
    }
    @Override
    public CompanyStaffDto updateCompanyStaff(Integer companyStaffId, CompanyStaffDto updatedCompanyStaff) {
        CompanyStaff companyStaff=companyStaffRepository.findById(companyStaffId).orElseThrow(
                ()-> new ResourceNotFoundException("CompanyStaff does not exist")
        );
        companyStaff.setName(updatedCompanyStaff.getName());
        companyStaff.setSurname(updatedCompanyStaff.getSurname());
        companyStaff.setRole(updatedCompanyStaff.getRole());


        CompanyStaff updatedCompanyStaffObj=companyStaffRepository.save(companyStaff);

        return CompanyStaffMapper.mapToCompanyStaffDto(updatedCompanyStaffObj);
    }
    @Override
    public void deleteCompanyStaff(Integer companyStaffId) {
        CompanyStaff companyStaff=companyStaffRepository.findById(companyStaffId).orElseThrow(
                ()-> new ResourceNotFoundException("CompanyStaff does not exist")
        );
        companyStaffRepository.deleteById(companyStaffId);
    }
}
