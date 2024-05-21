package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Industria;
import com.example.EmoloyerSystem.Entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LocationRepository extends JpaRepository<Location, Integer>{
    Optional<Location> findByName(String LocationName);
}
