package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.CompanyStaffService;
import com.example.EmoloyerSystem.dto.CompanyStaffDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/CompanyStaff")
public class CompanyStaffController {
    private CompanyStaffService companyStaffService;

    //Add CompanyStaff REST API
    @PostMapping
    public ResponseEntity<CompanyStaffDto> createCompanyStaff(@RequestBody CompanyStaffDto companyStaffDto){
        CompanyStaffDto savedCompanyStaff=companyStaffService.createCompanyStaff(companyStaffDto);
        return new ResponseEntity<>(savedCompanyStaff, HttpStatus.CREATED);
    }

    //Read CompanyStaff by id REST API
    @GetMapping("{id}")
    public ResponseEntity<CompanyStaffDto> getCompanyStaffById(@PathVariable("id") Integer companyStaffId){
        CompanyStaffDto companyStaffDto= companyStaffService.getCompanyStaffId(companyStaffId);
        return ResponseEntity.ok(companyStaffDto);
    }
    //Read All CompanyStaff REST API
    @GetMapping
    public ResponseEntity<List<CompanyStaffDto>> getAllCompanyStaff(@RequestParam(required = false) int companyId) {
        List<CompanyStaffDto> companyStaffs = null;
        if (companyId != 0) {
            companyStaffs = companyStaffService.getAllCompanyStaff(companyId);
        } 
        return ResponseEntity.ok(companyStaffs);
    }

    //Update CompanyStaff REST API
    @PutMapping("{id}")
    public ResponseEntity<CompanyStaffDto>updateCompanyStaff(@PathVariable("id") Integer companyStaffId,
                                                   @RequestBody CompanyStaffDto updatedCompanyStaff){
        CompanyStaffDto companyStaffDto=companyStaffService.updateCompanyStaff(companyStaffId, updatedCompanyStaff);
        return ResponseEntity.ok(companyStaffDto);

    }

    //Delete CompanyStaff REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String>deleteCompanyStaff(@PathVariable("id") Integer companyStaffId){
        companyStaffService.deleteCompanyStaff(companyStaffId);
        return ResponseEntity.ok("CompanyStaff Deleted");
    }
}
