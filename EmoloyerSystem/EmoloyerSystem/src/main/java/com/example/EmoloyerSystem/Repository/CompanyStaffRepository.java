package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.CompanyStaff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanyStaffRepository extends JpaRepository<CompanyStaff, Integer> {
    List<CompanyStaff> findByCompanyId(int companyId);
}
