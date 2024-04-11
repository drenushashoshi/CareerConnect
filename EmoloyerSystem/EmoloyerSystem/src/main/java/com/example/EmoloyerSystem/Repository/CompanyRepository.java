package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

    Company findByEmail(String email);
}
