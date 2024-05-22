package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InternshipRepository extends JpaRepository<Internship, Integer> {
    List<Internship> findByCompanyId(int companyId);

    List<Internship> findByTitleContainingIgnoreCaseAndLocationNameAndIndustriaName(String title, String locationName, String industriaName);
    List<Internship> findByTitleContainingIgnoreCaseAndLocationName(String title, String locationName);
    List<Internship> findByTitleContainingIgnoreCaseAndIndustriaName(String title, String industriaName);
    List<Internship> findByTitleContainingIgnoreCase(String title);
    List<Internship> findByLocationNameAndIndustriaName(String locationName, String industriaName);
    List<Internship> findByLocationName(String locationName);
    List<Internship> findByIndustriaName(String industriaName);
    void deleteByIndustria(Industria industria);
    void deleteByLocation(Location location);

    void deleteByCompany(Company company);

}
