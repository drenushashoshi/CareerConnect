package com.example.EmoloyerSystem.Service;

import java.util.List;

import com.example.EmoloyerSystem.dto.LanguageDto;

public interface LanguageService {

    LanguageDto createLanguage(LanguageDto Language,int id);
    LanguageDto updateLanguage(int id,LanguageDto Language);
    void deleteLanguage(int id);
    LanguageDto getLanguageById(int id);
    List<LanguageDto> getLanguages();
    List<LanguageDto> getLanguagesByCvid(int id);
    
}
