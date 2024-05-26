package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.CompanyStaffService;
import com.example.EmoloyerSystem.dto.CompanyStaffDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class CompanyStaffController {
    @Autowired
    private CompanyStaffService companyStaffService;

    @PostMapping("/company/registerStaff")
    public ResponseEntity<CompanyStaffDto> createCompanyStaff(@RequestBody CompanyStaffDto companyStaffDto){
        return ResponseEntity.ok(companyStaffService.createCompanyStaff(companyStaffDto));
    }


    @GetMapping("/company/getStaff/{id}")
    public ResponseEntity<CompanyStaffDto> getCompanyStaffById(@PathVariable("id") Integer companyStaffId){
        CompanyStaffDto companyStaffDto= companyStaffService.getCompanyStaffId(companyStaffId);
        return ResponseEntity.ok(companyStaffDto);
    }

    @GetMapping("/public/CompanyStaff")
    public ResponseEntity<List<CompanyStaffDto>> getAllCompanyStaff(@RequestParam(required = false) int companyId) {
        List<CompanyStaffDto> companyStaffs = null;
        if (companyId != 0) {
            companyStaffs = companyStaffService.getAllCompanyStaff(companyId);
        } 
        return ResponseEntity.ok(companyStaffs);
    }

    //Update CompanyStaff REST API
    @PutMapping("/company/updateStaff/{id}")
    public ResponseEntity<CompanyStaffDto>updateCompanyStaff(@PathVariable("id") Integer companyStaffId,
                                                   @RequestBody CompanyStaffDto updatedCompanyStaff){
        CompanyStaffDto companyStaffDto=companyStaffService.updateCompanyStaff(companyStaffId, updatedCompanyStaff);
        return ResponseEntity.ok(companyStaffDto);

    }

    //Delete CompanyStaff REST API
    @DeleteMapping("/company/deleteStaff/{id}")
    public ResponseEntity<String>deleteCompanyStaff(@PathVariable("id") Integer companyStaffId){
        companyStaffService.deleteCompanyStaff(companyStaffId);
        return ResponseEntity.ok("CompanyStaff Deleted");
    }
}
