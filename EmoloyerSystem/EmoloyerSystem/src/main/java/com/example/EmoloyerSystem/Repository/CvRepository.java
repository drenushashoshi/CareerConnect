package com.example.EmoloyerSystem.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.EmoloyerSystem.Entity.CV;

public interface CvRepository extends JpaRepository<CV,Integer>{
   Optional<CV> findById(int id);
   Optional<CV> findByEmployeeId(int id);
   Optional<CV> findByEmail(String email);
   
   @Query("SELECT c FROM CV c WHERE c.phone_nr = ?1")
   Optional<CV> findByPhonenr(String phonenr);

}
