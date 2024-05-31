package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application,Integer> {

    Optional<Application>findById(int ID);
    Optional<List<Application>>findByJobidId(long id);
    Optional<List<Application>>findByEmployeeidId(int id);
    Optional<List<Application>>findByInternshipidId(int id);
}
