package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.EmployeePost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface  EmployeePostRepository extends JpaRepository<EmployeePost ,Integer>{
    List<EmployeePost> findEmployeePostId(int EmployeePostId);
}
