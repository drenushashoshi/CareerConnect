package com.example.EmoloyerSystem.Service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.Language;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.LanguageMapper;
import com.example.EmoloyerSystem.Repository.CvRepository;
import com.example.EmoloyerSystem.Repository.LanguageRepository;
import com.example.EmoloyerSystem.Service.LanguageService;
import com.example.EmoloyerSystem.dto.LanguageDto;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class LanguageServiceImpl implements LanguageService {
    private LanguageRepository LanguageRepository;
    private CvRepository CvRepository;
    
    @Override
   public LanguageDto createLanguage(LanguageDto LanguageDto,int id) {
       CV Cv = CvRepository.findById(id).orElseThrow(()->
       new ResourceNotFoundException("Cv does not exist"));
       Language Language= LanguageMapper.MapToLanguage(LanguageDto,Cv);
       Language savedLanguage=LanguageRepository.save(Language);
       return LanguageMapper.MapToLanguageDto(savedLanguage);
   }

   @Override
   public LanguageDto getLanguageById(int id) {
       Language Language=LanguageRepository.findById(id)
               .orElseThrow(()->
                       new ResourceNotFoundException("Language does not exist"));

       return LanguageMapper.MapToLanguageDto(Language);
   }
   @Override
   public List<LanguageDto> getLanguages() {
       List<Language> Languages=LanguageRepository.findAll();
       return Languages.stream().map(LanguageMapper::MapToLanguageDto)
               .collect(Collectors.toList());
   }
   @Override
   public LanguageDto updateLanguage(int id, LanguageDto updatedLanguage) {
       Language Language=LanguageRepository.findById(id).orElseThrow(
               ()-> new ResourceNotFoundException("Language does not exist")
       );
       Language.setLanguageID(updatedLanguage.getLanguageID());
       Language.setLanguage(updatedLanguage.getLanguage());
       Language.setLevel(updatedLanguage.getLevel());
       Language.getCvid().setCvid((updatedLanguage.getCvid()));

       return LanguageMapper.MapToLanguageDto(Language);
   }
   @Override
   public void deleteLanguage(int id)
   {
    Language language = LanguageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Language not found"));
        LanguageRepository.delete(language);
   }
   @Override
   public List<LanguageDto> getLanguagesByCvid(int id)
   {
       List<Language> languages = LanguageRepository.findByCvidCvid(id).orElseThrow(
               ()-> new ResourceNotFoundException("Language does not exist")
       );
       return languages.stream()
                .map(LanguageMapper::MapToLanguageDto)
                .collect(Collectors.toList());
   }
}
