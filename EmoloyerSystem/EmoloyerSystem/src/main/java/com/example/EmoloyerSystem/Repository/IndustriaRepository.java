package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Industria;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IndustriaRepository extends JpaRepository<Industria, Integer>{

    Optional<Industria> findByName(String IndustriaName);

}
