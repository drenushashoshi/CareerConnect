package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application,Long> {

    Optional<Application>findByID(Long ID);
}
