package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository <Employee,Long>{
    Employee findByEmail(String email);
}
