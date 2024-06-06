package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.EmployeePost;
import com.example.EmoloyerSystem.dto.EmployeePostDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface  EmployeePostRepository extends JpaRepository<EmployeePost ,Integer>{
    List<EmployeePost> findByEmployeeId(int EmployeePostId);
}
