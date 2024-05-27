package com.example.EmoloyerSystem.Controller;
import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.Reference;
import com.example.EmoloyerSystem.Service.ReferenceService;
import com.example.EmoloyerSystem.dto.ReferenceDto;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class ReferenceController {

    private final ReferenceService ReferenceService;

    @PostMapping("/employee/createReference/{id}")
    public ResponseEntity<ReferenceDto> createReference(@RequestBody ReferenceDto Reference, @PathVariable int id)
    {
        ReferenceDto savedReference = ReferenceService.createReference(Reference,id);
        return new ResponseEntity<ReferenceDto>(savedReference, HttpStatus.CREATED);
    }

    @GetMapping("/employee/getall/References")
    public ResponseEntity<List<ReferenceDto>> getAllReferences()
    {
        List<ReferenceDto>References=ReferenceService.getAllReferences();
        return ResponseEntity.ok(References);
    }

    @GetMapping("/employee/Reference/{id}")
    public ResponseEntity<ReferenceDto> getReferenceById(@PathVariable int id)
    {
        ReferenceDto Reference= ReferenceService.getReferenceById(id);
        return ResponseEntity.ok(Reference);
    }
    @PutMapping("/employee/updateReference/{id}")
    public ResponseEntity<ReferenceDto> updateReference(@PathVariable("id") Integer ReferenceID,
                                                        @RequestBody ReferenceDto updatedReference){
        ReferenceDto Reference=ReferenceService.updateReference(ReferenceID, updatedReference);
        return ResponseEntity.ok(Reference);

    }
    @DeleteMapping("/employee/deleteReference/{id}")
    public ResponseEntity<String> deleteReference(@PathVariable("id") Integer ReferenceID){
        ReferenceService.deleteReference(ReferenceID);
        return ResponseEntity.ok("Reference Deleted");
    }
    @GetMapping("/employee/References/cv/{id}")
   public ResponseEntity<List<ReferenceDto>> getReferenceByCvId(@PathVariable int id)
   {
       List<ReferenceDto> Reference =ReferenceService.getReferenceByCvId(id);
       return ResponseEntity.ok(Reference);
   }
}