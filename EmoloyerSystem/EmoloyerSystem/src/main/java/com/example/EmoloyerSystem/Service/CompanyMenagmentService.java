package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.Repository.CompanyRepository;
import com.example.EmoloyerSystem.dto.CompanyDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

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

    public CompanyDto register(CompanyDto registrationRequest){
        CompanyDto companyDto=new CompanyDto();
        try{
            Company company=new Company();
            company.setEmail(registrationRequest.getEmail());
            company.setName(registrationRequest.getName());
            company.setAddress(registrationRequest.getAddress());
            company.setPhone_number(registrationRequest.getPhone_number());
            company.setOpening_year(registrationRequest.getOpening_year());
            company.setDescription(registrationRequest.getDescription());
            company.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            company.setRole(registrationRequest.getRole());
            Company companyResult= companyRepository.save(company);
            if(companyResult.getId()>0){
                companyDto.setCompany((companyResult));
                companyDto.setMessage("Company Saved Successfully");
                companyDto.setStatusCode(200);
            }
        }catch(Exception e){
            companyDto.setStatusCode(500);
            companyDto.setError(e.getMessage());
        }
        return companyDto;
    }

    public CompanyDto login(CompanyDto loginRequest){
        CompanyDto response=new CompanyDto();
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                    loginRequest.getPassword()));
            var company= companyRepository.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt= JWTUtils.generateToken(company);
            var refreshToken = JWTUtils.generateRefreshToken(new HashMap<>(), company);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRole(company.getRole());
            response.setId(company.getId());
            response.setRefreshToken(refreshToken);
            response.setExpirationTime("24Hrs");
            response.setMessage("Successfully logged in");
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }

    public CompanyDto refreshToken(CompanyDto refreshTokenRequest){
        CompanyDto response=new CompanyDto();
        try{
            String email=jwtUtils.extractUsername(refreshTokenRequest.getToken());
            Company company=companyRepository.findByEmail(email).orElseThrow();
            if(jwtUtils.isTokenValid(refreshTokenRequest.getToken(), company)){
                var jwt= JWTUtils.generateToken(company);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully refreshed Token");
            }
            response.setStatusCode(200);
            return response;
        }catch(Exception e){
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public CompanyDto getAllCompanies(){
        CompanyDto companyDto=new CompanyDto();

        try{
            List<Company> result= companyRepository.findAll();
            if(!result.isEmpty()){
                companyDto.setCompanyList(result);
                companyDto.setStatusCode(200);
                companyDto.setMessage("Successful");
            }else{
                companyDto.setStatusCode(404);
                companyDto.setMessage("No companies found");
            }
            return companyDto;
        }catch(Exception e){
            companyDto.setStatusCode(500);
            companyDto.setMessage("Error occurred: "+e.getMessage());
            return companyDto;
        }
    }
    public CompanyDto getCompanyById(Integer id){
        CompanyDto companyDto=new CompanyDto();
        try{
            Company companyById=companyRepository.findById(id).orElseThrow(()->new RuntimeException("Company not found"));
            companyDto.setCompany(companyById);
            companyDto.setStatusCode(200);
            companyDto.setMessage("User with id "+id+" found successfully");

        }catch(Exception e){
            companyDto.setStatusCode(500);
            companyDto.setMessage("Error occurred "+e.getMessage());
        }
        return companyDto;
    }
    public CompanyDto deleteCompany(Integer id){
        CompanyDto companyDto=new CompanyDto();
        try{
            Optional<Company> companyOptional=companyRepository.findById(id);
            if(companyOptional.isPresent()){
                companyRepository.deleteById(id);
                companyDto.setStatusCode(200);
                companyDto.setMessage("Company deleted successfully");
            }else{
                companyDto.setStatusCode(404);
                companyDto.setMessage("Company not found");
            }
        }catch(Exception e){
            companyDto.setStatusCode(500);
            companyDto.setMessage("Error occurred while deleting company "+e.getMessage());
        }
        return companyDto;
    }
    public CompanyDto updateCompany(Integer id, Company updatedCompany){
        CompanyDto companyDto=new CompanyDto();
        try{
            Optional<Company> companyOptional=companyRepository.findById(id);
            if(companyOptional.isPresent()){
                Company existingCompany=companyOptional.get();
                existingCompany.setName(updatedCompany.getName());
                existingCompany.setEmail(updatedCompany.getEmail());
                existingCompany.setAddress(updatedCompany.getAddress());
                existingCompany.setPhone_number(updatedCompany.getPhone_number());
                existingCompany.setOpening_year(updatedCompany.getOpening_year());
                existingCompany.setDescription(updatedCompany.getDescription());
                if(updatedCompany.getPassword() !=null && !updatedCompany.getPassword().isEmpty()){
                    existingCompany.setPassword(passwordEncoder.encode(updatedCompany.getPassword()));
                }
                Company savedCompany=companyRepository.save(existingCompany);
                companyDto.setCompany(savedCompany);
                companyDto.setStatusCode(200);
                companyDto.setMessage("Company updated successfully");

            } else{
                companyDto.setStatusCode(404);
                companyDto.setMessage("Company not found for update");
            }
        }catch(Exception e){
            companyDto.setStatusCode(500);
            companyDto.setMessage("Error occurred while updating company "+e.getMessage());
        }
        return companyDto;
    }

    public CompanyDto getMyInfo(String email){
        CompanyDto companyDto=new CompanyDto();
        try{
            Optional<Company> companyOptional= companyRepository.findByEmail(email);
            if(companyOptional.isPresent()){
                companyDto.setCompany(companyOptional.get());
                companyDto.setStatusCode(200);
                companyDto.setMessage("Successful");
            }else{
                companyDto.setStatusCode(404);
                companyDto.setMessage("Company not found");
            }
        }catch(Exception e){
            companyDto.setStatusCode(500);
            companyDto.setMessage("Error occurred while getting company info "+e.getMessage());
        }
        return companyDto;
    }


}
