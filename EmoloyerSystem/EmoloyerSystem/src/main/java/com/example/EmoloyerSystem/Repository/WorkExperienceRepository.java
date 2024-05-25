package com.example.EmoloyerSystem.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.WorkExperience;
import com.example.EmoloyerSystem.dto.WorkExperienceDto;

public interface WorkExperienceRepository extends JpaRepository<WorkExperience,Integer>{
    Optional<WorkExperience> findById(int id);
    Optional<List<WorkExperience>> findByCV(CV CV);
}