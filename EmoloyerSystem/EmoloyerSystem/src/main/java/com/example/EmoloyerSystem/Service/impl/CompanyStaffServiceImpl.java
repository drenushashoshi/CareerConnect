package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.Entity.CompanyStaff;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.CompanyStaffMapper;
import com.example.EmoloyerSystem.Repository.CompanyRepository;
import com.example.EmoloyerSystem.Repository.CompanyStaffRepository;
import com.example.EmoloyerSystem.Service.CompanyStaffService;
import com.example.EmoloyerSystem.Service.ImageUtils;
import com.example.EmoloyerSystem.dto.CompanyStaffDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CompanyStaffServiceImpl implements CompanyStaffService {
    private final CompanyStaffRepository companyStaffRepository;
    private final CompanyRepository companyRepository;


    @Override
    public CompanyStaffDto createCompanyStaff(CompanyStaffDto companyStaffDto, MultipartFile file) throws IOException {
        Company company = companyRepository.findById(companyStaffDto.getCompanyId())
                .orElseThrow(() -> new ResourceNotFoundException("Company not found with id: " + companyStaffDto.getCompanyId()));

        CompanyStaff companyStaff = CompanyStaffMapper.mapToCompanyStaff(companyStaffDto, company);
        if (file != null && !file.isEmpty()) {
            companyStaff.setImage(ImageUtils.compressImage(file.getBytes()));
        }
        CompanyStaff savedCompanyStaff = companyStaffRepository.save(companyStaff);

        return CompanyStaffMapper.mapToCompanyStaffDto(savedCompanyStaff);
    }

    @Override
    public CompanyStaffDto getCompanyStaffId(Integer companyStaffId) {
        CompanyStaff companyStaff = companyStaffRepository.findById(companyStaffId)
                .orElseThrow(() -> new ResourceNotFoundException("CompanyStaff does not exist"));
        return CompanyStaffMapper.mapToCompanyStaffDto(companyStaff);
    }

    @Override
    public List<CompanyStaffDto> getAllCompanyStaff(int companyId) {
        List<CompanyStaff> companyStaffs = companyStaffRepository.findByCompanyId(companyId);
        return companyStaffs.stream()
                .map(CompanyStaffMapper::mapToCompanyStaffDto)
                .collect(Collectors.toList());
    }

    @Override
    public CompanyStaffDto updateCompanyStaff(Integer companyStaffId, CompanyStaffDto updatedCompanyStaff, MultipartFile file) throws IOException {
        CompanyStaff companyStaff = companyStaffRepository.findById(companyStaffId).orElseThrow(
                () -> new ResourceNotFoundException("Company Staff does not exist")
        );
        companyStaff.setName(updatedCompanyStaff.getName());
        companyStaff.setSurname(updatedCompanyStaff.getSurname());
        companyStaff.setRole(updatedCompanyStaff.getRole());
        if (file != null && !file.isEmpty()) {
            companyStaff.setImage(ImageUtils.compressImage(file.getBytes()));
        }

        CompanyStaff updatedCompanyStaffObj = companyStaffRepository.save(companyStaff);
        return CompanyStaffMapper.mapToCompanyStaffDto(updatedCompanyStaffObj);
    }
    @Override
    public void deleteCompanyStaff(Integer companyStaffId) {
        CompanyStaff companyStaff = companyStaffRepository.findById(companyStaffId).orElseThrow(
                () -> new ResourceNotFoundException("CompanyStaff does not exist")
        );
        companyStaffRepository.deleteById(companyStaffId);
    }

    @Override
    public byte[] downloadImage(Integer companyStaffId) {
        CompanyStaff companyStaff = companyStaffRepository.findById(companyStaffId)
                .orElseThrow(() -> new ResourceNotFoundException("CompanyStaff does not exist"));
        return ImageUtils.decompressImage(companyStaff.getImage());
    }

}
