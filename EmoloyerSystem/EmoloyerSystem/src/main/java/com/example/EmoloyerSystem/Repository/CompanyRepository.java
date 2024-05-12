package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

    Optional<Company> findByEmail(String email);
}
