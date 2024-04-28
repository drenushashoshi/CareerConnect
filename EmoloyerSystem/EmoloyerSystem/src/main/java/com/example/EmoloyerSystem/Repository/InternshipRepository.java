package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.CompanyStaff;
import com.example.EmoloyerSystem.Entity.Internship;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Integer> {
    List<Internship> findByCompanyId(int companyId);
}
