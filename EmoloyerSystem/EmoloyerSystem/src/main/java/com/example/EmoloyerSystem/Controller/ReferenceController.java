package com.example.EmoloyerSystem.Controller;
import com.example.EmoloyerSystem.Service.ReferenceService;
import com.example.EmoloyerSystem.dto.ReferenceDto;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/References")
@RequiredArgsConstructor
public class ReferenceController {

    private final ReferenceService ReferenceService;

    @PostMapping()
    public ResponseEntity<ReferenceDto> createReference(@RequestBody ReferenceDto Reference)
    {
        ReferenceDto savedReference = ReferenceService.createReference(Reference);
        return new ResponseEntity<ReferenceDto>(savedReference, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<ReferenceDto>> getAllReferences()
    {
        List<ReferenceDto>References=ReferenceService.getAllReferences();
        return ResponseEntity.ok(References);    
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReferenceDto> getReferenceById(@PathVariable(value = "ID") Integer ID)
    {
        ReferenceDto Reference= ReferenceService.getReferenceById(ID);
        return ResponseEntity.ok(Reference);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ReferenceDto> updateReference(@PathVariable("id") Integer ReferenceID,
                                                   @RequestBody ReferenceDto updatedReference){
        ReferenceDto Reference=ReferenceService.updateReference(ReferenceID, updatedReference);
        return ResponseEntity.ok(Reference);

    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReference(@PathVariable("id") Integer ReferenceID){
        ReferenceService.deleteReference(ReferenceID);
        return ResponseEntity.ok("Reference Deleted");
    }
    @GetMapping()
    public ResponseEntity<List<ReferenceDto>> getReferenceByCvId(@PathVariable(value = "ID") Integer ID)
    {
        List<ReferenceDto> Reference =ReferenceService.getReferenceByCvId(ID);
        return ResponseEntity.ok(Reference);
    }
}
