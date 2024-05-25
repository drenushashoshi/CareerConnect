package com.example.EmoloyerSystem.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.Language;
import com.example.EmoloyerSystem.Service.LanguageService;
import com.example.EmoloyerSystem.Service.ReferenceService;
import com.example.EmoloyerSystem.dto.LanguageDto;
import com.example.EmoloyerSystem.dto.ReferenceDto;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class LanguageController {
    
    private final LanguageService LanguageService;

    @PostMapping("/employee/createlanguage")
    public ResponseEntity<LanguageDto> createLanguage(@RequestBody LanguageDto Language,@RequestBody CV CV)
    {
        LanguageDto savedLanguage = LanguageService.createLanguage(Language,CV);
        return new ResponseEntity<LanguageDto>(savedLanguage, HttpStatus.CREATED);
    }
    @GetMapping("/employee/getall/languages")
    public ResponseEntity<List<LanguageDto>> getLanguages()
    {
        List<LanguageDto>Languages=LanguageService.getLanguages();
        return ResponseEntity.ok(Languages);
    }
    @GetMapping("/employee/language/{id}")
    public ResponseEntity<LanguageDto> getLanguageById(@PathVariable(value = "ID") Integer ID)
    {
        LanguageDto Language= LanguageService.getLanguageById(ID);
        return ResponseEntity.ok(Language);
    }
    @PutMapping("/employee/updateLanguage/{id}")
    public ResponseEntity<LanguageDto> updateLanguage(@PathVariable("id") Integer ID,
                                                        @RequestBody LanguageDto updatedLanguage){
        LanguageDto Language=LanguageService.updateLanguage(ID, updatedLanguage);
        return ResponseEntity.ok(Language);

    }
    @DeleteMapping("/employee/deleteLanguage/{id}")
    public ResponseEntity<String> deleteLanguage(@PathVariable("id") Integer ID){
        LanguageService.deleteLanguage(ID);
        return ResponseEntity.ok("Language Deleted");
    }
    @GetMapping("/employee/languages/cv/{id}")
    public ResponseEntity<List<Language>> getLanguageByCvId(@RequestBody Integer id)
    {
        List<Language> Languages =LanguageService.getLanguagesByCvId(id);
        return ResponseEntity.ok(Languages);
    }
}
