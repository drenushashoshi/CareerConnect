package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.CompanyService;
import com.example.EmoloyerSystem.dto.CompanyDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/Company")
public class CompanyController {
    private CompanyService companyService;

    //Add Company REST API
    @PostMapping
    public ResponseEntity<CompanyDto> createCompany(@RequestBody CompanyDto companyDto){
        CompanyDto savedCompany=companyService.createCompany(companyDto);
        return new ResponseEntity<>(savedCompany, HttpStatus.CREATED);
    }

    //Read Company by id REST API
    @GetMapping("{id}")
    public ResponseEntity<CompanyDto> getCompanyById(@PathVariable("id") Integer companyId){
        CompanyDto companyDto= companyService.getCompanyId(companyId);
        return ResponseEntity.ok(companyDto);
    }
    //Read All Companies REST API
    @GetMapping
    public ResponseEntity<List<CompanyDto>>getAllCompanies(){
        List<CompanyDto>companies=companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }

    //Update Company REST API
    @PutMapping("{id}")
    public ResponseEntity<CompanyDto>updateCompany(@PathVariable("id") Integer companyId,
                                                   @RequestBody CompanyDto updatedCompany){
        CompanyDto companyDto=companyService.updateCompany(companyId, updatedCompany);
        return ResponseEntity.ok(companyDto);

    }

    //Delete Company REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String>deleteCompany(@PathVariable("id") Integer companyId){
        companyService.deleteCompany(companyId);
        return ResponseEntity.ok("Company Deleted");
    }


}
