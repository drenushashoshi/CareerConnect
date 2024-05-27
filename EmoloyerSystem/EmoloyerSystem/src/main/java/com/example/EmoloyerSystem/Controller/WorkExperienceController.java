package com.example.EmoloyerSystem.Controller;
import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.WorkExperience;
import com.example.EmoloyerSystem.Service.WorkExperienceService;
import com.example.EmoloyerSystem.dto.WorkExperienceDto;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class WorkExperienceController {

   private final WorkExperienceService WorkExperienceService;

   @PostMapping("/employee/createWorkExperience/{id}")
   public ResponseEntity<WorkExperienceDto> createWorkExperience(@RequestBody WorkExperienceDto WorkExperience,@PathVariable int id)
   {
       WorkExperienceDto savedWorkExperience = WorkExperienceService.createWorkExperience(WorkExperience,id);
       return new ResponseEntity<WorkExperienceDto>(savedWorkExperience, HttpStatus.CREATED);
   }

   @GetMapping("/employee/getall/WorkExperiences")
   public ResponseEntity<List<WorkExperienceDto>> getAllWorkExperiences()
   {
       List<WorkExperienceDto>WorkExperiences=WorkExperienceService.getAllWorkExperiences();
       return ResponseEntity.ok(WorkExperiences);
   }

   @GetMapping("/employee/WorkExperience/{id}")
   public ResponseEntity<WorkExperienceDto> getWorkExperienceById(@PathVariable(value = "ID") Integer ID)
   {
       WorkExperienceDto WorkExperience= WorkExperienceService.getWorkExperienceById(ID);
       return ResponseEntity.ok(WorkExperience);
   }
   @PutMapping("/employee/updateWorkExperience/{id}")
   public ResponseEntity<WorkExperienceDto> updateWorkExperience(@PathVariable("id") Integer WorkExperienceID,
                                                  @RequestBody WorkExperienceDto updatedWorkExperience){
       WorkExperienceDto WorkExperience=WorkExperienceService.updateWorkExperience(WorkExperienceID, updatedWorkExperience);
       return ResponseEntity.ok(WorkExperience);

   }
   @DeleteMapping("/employee/deleteWorkExperience/{id}")
   public ResponseEntity<String> deleteWorkExperience(@PathVariable("id") Integer WorkExperienceID){
       WorkExperienceService.deleteWorkExperience(WorkExperienceID);
       return ResponseEntity.ok("Work Experience Deleted");
   }
   @GetMapping("/employee/WorkExperiences/cv/{id}")
   public ResponseEntity<List<WorkExperienceDto>> getWorkExperienceByCvId(@PathVariable int id)
   {
       List<WorkExperienceDto> Reference =WorkExperienceService.getWorkExperienceByCvId(id);
       return ResponseEntity.ok(Reference);
   }
}