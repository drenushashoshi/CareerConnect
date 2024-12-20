package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository <Employee, Integer>{
    Optional <Employee> findByEmail(String email);
}
