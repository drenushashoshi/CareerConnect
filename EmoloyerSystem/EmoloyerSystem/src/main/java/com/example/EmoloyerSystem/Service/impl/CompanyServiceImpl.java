package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.Repository.CompanyRepository;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.CompanyMapper;
import com.example.EmoloyerSystem.Service.CompanyService;
import com.example.EmoloyerSystem.dto.CompanyDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private CompanyRepository companyRepository;
    @Override
    public CompanyDto createCompany(CompanyDto companyDto) {
        Company company= CompanyMapper.mapToCompany(companyDto);
        Company savedCompany=companyRepository.save(company);

        return CompanyMapper.mapToCompanyDto(savedCompany);
    }

    @Override
    public CompanyDto getCompanyId(Integer companyId) {
        Company company=companyRepository.findById(companyId)
                .orElseThrow(()->
                        new ResourceNotFoundException("Company does not exist"));

        return CompanyMapper.mapToCompanyDto(company);
    }

    @Override
    public List<CompanyDto> getAllCompanies() {
        List<Company> companies=companyRepository.findAll();
        return companies.stream().map(CompanyMapper::mapToCompanyDto)
                .collect(Collectors.toList());
    }

    @Override
    public CompanyDto updateCompany(Integer companyId, CompanyDto updatedCompany) {
        Company company=companyRepository.findById(companyId).orElseThrow(
                ()-> new ResourceNotFoundException("Company does not exist")
        );
        company.setName(updatedCompany.getName());
        company.setEmail(updatedCompany.getEmail());
        company.setAddress(updatedCompany.getAddress());
        company.setPhone_number(updatedCompany.getPhone_number());
        company.setPassword(updatedCompany.getPassword());
        company.setOpening_year(updatedCompany.getOpening_year());
        company.setDescription(updatedCompany.getDescription());

        Company updatedCompanyObj=companyRepository.save(company);

        return CompanyMapper.mapToCompanyDto(updatedCompanyObj);
    }

    @Override
    public void deleteCompany(Integer companyId) {
        Company company=companyRepository.findById(companyId).orElseThrow(
                ()-> new ResourceNotFoundException("Company does not exist")
        );
        companyRepository.deleteById(companyId);
    }

    @Override
    public Integer authenticateCompany(String email, String password) {
        Company company = companyRepository.findByEmail(email);
        if (company != null && company.getPassword().equals(password)) {
            return company.getId();
        }
        return null; // Authentication failed
    }
}
