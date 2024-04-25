package com.example.EmoloyerSystem.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmoloyerSystem.Entity.CV;

public interface CvRepository extends JpaRepository<CV,Integer>{
    Optional<CV> findById(int id);
    Optional<CV> findByexperience_id(int experience_id);
    Optional<CV> findByreference_id(int reference_id);

}
