package com.example.EmoloyerSystem.Repository;

import com.example.EmoloyerSystem.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    List<Notification> findByCompanyId(int companyId);
}
