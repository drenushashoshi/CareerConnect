package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.Repository.CompanyRepository;
import com.example.EmoloyerSystem.dto.CompanyDto;
import com.example.EmoloyerSystem.Mapper.CompanyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CompanyMenagmentService {
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public CompanyDto register(CompanyDto registrationRequest) {
        CompanyDto response = new CompanyDto();
        try {
            Company company = CompanyMapper.mapDtoToCompany(registrationRequest);
            company.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));

            Company savedCompany = companyRepository.save(company);

            if (savedCompany.getId() > 0) {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        registrationRequest.getEmail(), registrationRequest.getPassword()));

                String jwt = JWTUtils.generateToken(savedCompany);
                String refreshToken = JWTUtils.generateRefreshToken(new HashMap<>(), savedCompany);

                response = CompanyMapper.mapCompanyToDto(savedCompany);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshToken);
                response.setExpirationTime("24Hrs");
                response.setMessage("Company registered and logged in successfully");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public CompanyDto login(CompanyDto loginRequest) {
        CompanyDto response = new CompanyDto();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), loginRequest.getPassword()));
            Company company = companyRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            String jwt = JWTUtils.generateToken(company);
            String refreshToken = JWTUtils.generateRefreshToken(new HashMap<>(), company);

            response = CompanyMapper.mapCompanyToDto(company);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully logged in");
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public CompanyDto refreshToken(CompanyDto refreshTokenRequest) {
        CompanyDto response = new CompanyDto();
        try {
            String email = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            Company company = companyRepository.findByEmail(email).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), company)) {
                String jwt = JWTUtils.generateToken(company);
                response = CompanyMapper.mapCompanyToDto(company);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully refreshed Token");
            }
            response.setStatusCode(200);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public CompanyDto getAllCompanies() {
        CompanyDto companyDto = new CompanyDto();
        try {
            List<Company> result = companyRepository.findAll();
            if (!result.isEmpty()) {
                List<CompanyDto> companyDtos = result.stream()
                        .map(CompanyMapper::mapCompanyToDto)
                        .collect(Collectors.toList());
                companyDto.setCompanyList(companyDtos);
                companyDto.setStatusCode(200);
                companyDto.setMessage("Successful");
            } else {
                companyDto.setStatusCode(404);
                companyDto.setMessage("No companies found");
            }
        } catch (Exception e) {
            companyDto.setStatusCode(500);
            companyDto.setMessage("Error occurred: " + e.getMessage());
        }
        return companyDto;
    }

    public CompanyDto getCompanyById(Integer id) {
        CompanyDto companyDto = new CompanyDto();
        try {
            Company company = companyRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Company not found"));
            companyDto = CompanyMapper.mapCompanyToDto(company);
            companyDto.setStatusCode(200);
            companyDto.setMessage("User with id " + id + " found successfully");
        } catch (Exception e) {
            companyDto.setStatusCode(500);
            companyDto.setMessage("Error occurred: " + e.getMessage());
        }
        return companyDto;
    }

    public CompanyDto deleteCompany(Integer id) {
        CompanyDto companyDto = new CompanyDto();
        try {
            Optional<Company> companyOptional = companyRepository.findById(id);
            if (companyOptional.isPresent()) {
                companyRepository.deleteById(id);
                companyDto.setStatusCode(200);
                companyDto.setMessage("Company deleted successfully");
            } else {
                companyDto.setStatusCode(404);
                companyDto.setMessage("Company not found");
            }
        } catch (Exception e) {
            companyDto.setStatusCode(500);
            companyDto.setMessage("Error occurred while deleting company: " + e.getMessage());
        }
        return companyDto;
    }

    public CompanyDto updateCompany(Integer id, CompanyDto updatedCompanyDto) {
        CompanyDto companyDto = new CompanyDto();
        try {
            Optional<Company> companyOptional = companyRepository.findById(id);
            if (companyOptional.isPresent()) {
                Company existingCompany = companyOptional.get();
                existingCompany.setName(updatedCompanyDto.getName());
                existingCompany.setEmail(updatedCompanyDto.getEmail());
                existingCompany.setAddress(updatedCompanyDto.getAddress());
                existingCompany.setPhone_number(updatedCompanyDto.getPhone_number());
                existingCompany.setOpening_year(updatedCompanyDto.getOpening_year());
                existingCompany.setDescription(updatedCompanyDto.getDescription());
                if (updatedCompanyDto.getPassword() != null && !updatedCompanyDto.getPassword().isEmpty()) {
                    existingCompany.setPassword(passwordEncoder.encode(updatedCompanyDto.getPassword()));
                }
                Company savedCompany = companyRepository.save(existingCompany);
                companyDto = CompanyMapper.mapCompanyToDto(savedCompany);
                companyDto.setStatusCode(200);
                companyDto.setMessage("Company updated successfully");
            } else {
                companyDto.setStatusCode(404);
                companyDto.setMessage("Company not found for update");
            }
        } catch (Exception e) {
            companyDto.setStatusCode(500);
            companyDto.setMessage("Error occurred while updating company: " + e.getMessage());
        }
        return companyDto;
    }

    public CompanyDto getMyInfo(String email) {
        CompanyDto companyDto = new CompanyDto();
        try {
            Optional<Company> companyOptional = companyRepository.findByEmail(email);
            if (companyOptional.isPresent()) {
                companyDto = CompanyMapper.mapCompanyToDto(companyOptional.get());
                companyDto.setStatusCode(200);
                companyDto.setMessage("Successful");
            } else {
                companyDto.setStatusCode(404);
                companyDto.setMessage("Company not found");
            }
        } catch (Exception e) {
            companyDto.setStatusCode(500);
            companyDto.setMessage("Error occurred while getting company info: " + e.getMessage());
        }
        return companyDto;
    }
}
