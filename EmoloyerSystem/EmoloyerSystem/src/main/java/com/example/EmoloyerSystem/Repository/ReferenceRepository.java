package com.example.EmoloyerSystem.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.Reference;

public interface ReferenceRepository extends JpaRepository<Reference,Integer>{

    Optional<Reference> findById(int id);
    Optional<List<Reference>> findByCV(CV CV);
}