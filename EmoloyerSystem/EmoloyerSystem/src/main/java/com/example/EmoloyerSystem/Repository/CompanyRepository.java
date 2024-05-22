package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.Entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

    Optional<Company> findByEmail(String email);

    Optional<Company> findById(int CompanyId);
}
