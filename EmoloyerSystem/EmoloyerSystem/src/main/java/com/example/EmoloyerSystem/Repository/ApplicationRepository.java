package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application,Long> {

    Optional<Application>findByID(Long ID);

    List<Application> findByCompanyID(int id);

    List<Application> findByWorkerID(int id);
}
