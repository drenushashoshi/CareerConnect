package com.example.EmoloyerSystem.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmoloyerSystem.Entity.Language;

public interface LanguageRepository extends JpaRepository<Language,Integer> {
    Optional<Language> findById(int id);
    Optional<List<Language>> findByCvidCvid(int id);
}
