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
import org.springframework.web.bind.annotation.RestController;

import com.example.EmoloyerSystem.Service.LanguageService;
import com.example.EmoloyerSystem.dto.LanguageDto;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
public class LanguageController {
    
    private final LanguageService LanguageService;

    @PostMapping("/employee/createlanguage/{id}")
    public ResponseEntity<LanguageDto> createLanguage(@RequestBody LanguageDto language, @PathVariable int id) {
        LanguageDto savedLanguage = LanguageService.createLanguage(language, id);
        return new ResponseEntity<>(savedLanguage, HttpStatus.CREATED);
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
    public ResponseEntity<LanguageDto> updateLanguage(@PathVariable("id") Integer id,
                                                        @RequestBody LanguageDto updatedLanguage){
        LanguageDto Language=LanguageService.updateLanguage(id, updatedLanguage);
        return ResponseEntity.ok(Language);

    }
    @DeleteMapping("/employee/deleteLanguage/{id}")
    public ResponseEntity<String> deleteLanguage(@PathVariable("id") Integer ID){
        LanguageService.deleteLanguage(ID);
        return ResponseEntity.ok("Language Deleted");
    }
    @GetMapping("/employee/languages/cv/{id}")
    public ResponseEntity<List<LanguageDto>> getLanguageByCvId(@PathVariable int id)
    {
        List<LanguageDto> Languages =LanguageService.getLanguagesByCvid(id);
        return ResponseEntity.ok(Languages);
    }
}
