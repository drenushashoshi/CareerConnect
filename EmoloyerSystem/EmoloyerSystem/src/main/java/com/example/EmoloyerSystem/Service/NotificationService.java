package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.dto.NotificationDto;

import java.util.List;

public interface NotificationService {
    void markNotificationAsRead(int notificationId);
    void deleteNotification(int notificationId);
    List<NotificationDto> getNotificationsByCompanyId(int companyId);
}
