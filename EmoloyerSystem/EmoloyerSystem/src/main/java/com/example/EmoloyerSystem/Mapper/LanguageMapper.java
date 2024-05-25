package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.Language;
import com.example.EmoloyerSystem.dto.LanguageDto;

public class LanguageMapper {
    public static LanguageDto MapToLanguageDto(Language Language)
    {
        return new LanguageDto(
            Language.getLanguageID(),
            Language.getLanguage(),
            Language.getLevel(),
            Language.getCV().getCvid()
        );
    }
    public static Language MapToLanguage(LanguageDto Language,CV CV)
    {
        Language language = new Language();
            language.setLanguageID(Language.getLanguageID());
            language.setLanguage(Language.getLanguage());
            language.setLevel(Language.getLevel());
            language.setCV(CV);
        return language;
    }
}
