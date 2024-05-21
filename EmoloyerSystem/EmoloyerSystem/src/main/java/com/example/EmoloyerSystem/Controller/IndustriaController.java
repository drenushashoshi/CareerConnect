package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Service.IndustriaService;
import com.example.EmoloyerSystem.dto.IndustriaDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/Industria")
public class IndustriaController {

    private final IndustriaService industriaService;

    public IndustriaController(IndustriaService industriaService) {
        this.industriaService = industriaService;
    }

    // Add Industria REST API
    @PostMapping
    public ResponseEntity<IndustriaDto> createIndustria(@RequestBody IndustriaDto industriaDto){
        IndustriaDto savedIndustria = industriaService.createIndustria(industriaDto);
        return new ResponseEntity<>(savedIndustria, HttpStatus.CREATED);
    }

    // Read Company by Name REST API
    @GetMapping("/{name}")
    public ResponseEntity<IndustriaDto> getIndustriaName(@PathVariable("name") String industriaName){
        IndustriaDto industriaDto = industriaService.getIndustriaName(industriaName);
        if(industriaDto != null) {
            return ResponseEntity.ok(industriaDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Read All Industries REST API
    @GetMapping
    public ResponseEntity<List<IndustriaDto>> getAllIndustries(){
        List<IndustriaDto> industries = industriaService.getAllIndustries();
        return ResponseEntity.ok(industries);
    }

    // Update Industria REST API
    @PutMapping("/{name}")
    public ResponseEntity<IndustriaDto> updateIndustria(@PathVariable("name") String industriaName,
                                                        @RequestBody IndustriaDto updatedIndustria){
        IndustriaDto industriaDto = industriaService.updateIndustria(industriaName, updatedIndustria);
        if(industriaDto != null) {
            return ResponseEntity.ok(industriaDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> deleteIndustria(@PathVariable("name") String industriaName) {
        try {
            industriaService.deleteIndustria(industriaName);
            return ResponseEntity.ok("Industria Deleted");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}