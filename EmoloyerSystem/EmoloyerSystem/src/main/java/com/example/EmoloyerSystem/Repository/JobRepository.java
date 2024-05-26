package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Industria;
import com.example.EmoloyerSystem.Entity.Job;
import com.example.EmoloyerSystem.Entity.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByTitleContainingIgnoreCaseAndLocationNameAndIndustriaName(String title, String LocationName, String IndustriaName);
    List<Job> findByTitleContainingIgnoreCaseAndLocationName(String title, String LocationName);
    List<Job> findByTitleContainingIgnoreCaseAndIndustriaName(String title, String IndustriaName);
    List<Job> findByTitleContainingIgnoreCase(String title);
    List<Job> findByLocationNameAndIndustriaName(String LocationName, String IndustriaName);
    List<Job> findByLocationName(String LocationName);
    List<Job> findByIndustriaName(String IndustriaName);
    void deleteByIndustria(Industria industria);
    void deleteByLocation(Location location);
    List<Job> findByCompanyId(int companyId);
}
