//package com.example.EmoloyerSystem.Controller;
//import com.example.EmoloyerSystem.Service.WorkExperienceService;
//import com.example.EmoloyerSystem.dto.WorkExperienceDto;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@CrossOrigin("*")
//@RequestMapping("/api/WorkExperiences")
//@RequiredArgsConstructor
//public class WorkExperienceController {
//
//    private final WorkExperienceService WorkExperienceService;
//
//    @PostMapping()
//    public ResponseEntity<WorkExperienceDto> createWorkExperience(@RequestBody WorkExperienceDto WorkExperience)
//    {
//        WorkExperienceDto savedWorkExperience = WorkExperienceService.createWorkExperience(WorkExperience);
//        return new ResponseEntity<WorkExperienceDto>(savedWorkExperience, HttpStatus.CREATED);
//    }
//
//    @GetMapping
//    public ResponseEntity<List<WorkExperienceDto>> getAllWorkExperiences()
//    {
//        List<WorkExperienceDto>WorkExperiences=WorkExperienceService.getAllWorkExperiences();
//        return ResponseEntity.ok(WorkExperiences);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<WorkExperienceDto> getWorkExperienceById(@PathVariable(value = "ID") Integer ID)
//    {
//        WorkExperienceDto WorkExperience= WorkExperienceService.getWorkExperienceById(ID);
//        return ResponseEntity.ok(WorkExperience);
//    }
//    @PutMapping("/{id}")
//    public ResponseEntity<WorkExperienceDto> updateWorkExperience(@PathVariable("id") Integer WorkExperienceID,
//                                                   @RequestBody WorkExperienceDto updatedWorkExperience){
//        WorkExperienceDto WorkExperience=WorkExperienceService.updateWorkExperience(WorkExperienceID, updatedWorkExperience);
//        return ResponseEntity.ok(WorkExperience);
//
//    }
//    @DeleteMapping("/{id}")
//    public ResponseEntity<String> deleteWorkExperience(@PathVariable("id") Integer WorkExperienceID){
//        WorkExperienceService.deleteWorkExperience(WorkExperienceID);
//        return ResponseEntity.ok("Work Experience Deleted");
//    }
//    @GetMapping()
//    public ResponseEntity<List<WorkExperienceDto>> getReferenceByCvId(@PathVariable(value = "ID") Integer ID)
//    {
//        List<WorkExperienceDto> Reference =WorkExperienceService.getWorkExperienceByCvId(ID);
//        return ResponseEntity.ok(Reference);
//    }
//}
