package com.example.EmoloyerSystem.Service;

import java.util.List;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.Language;
import com.example.EmoloyerSystem.dto.LanguageDto;

public interface LanguageService {

    LanguageDto createLanguage(LanguageDto Language,CV CV);
    LanguageDto updateLanguage(int id,LanguageDto Language);
    void deleteLanguage(int id);
    LanguageDto getLanguageById(int id);
    List<LanguageDto> getLanguages();
    List<Language> getLanguagesByCvId(int id);
    
}
