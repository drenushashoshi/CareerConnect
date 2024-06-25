package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Company;
import com.example.EmoloyerSystem.Entity.Notification;
import com.example.EmoloyerSystem.dto.NotificationDto;

public class NotificationMapper {

    public static NotificationDto mapToNotificationDto(Notification notification) {
        NotificationDto dto = new NotificationDto();
        dto.setId(notification.getId());
        dto.setCompanyId(notification.getCompany().getId());
        dto.setMessage(notification.getMessage());
        dto.setRead(notification.isRead());
        return dto;
    }

    public static Notification mapToNotification(NotificationDto notificationDto, Company company) {
        Notification notification = new Notification();
        notification.setId(notificationDto.getId());
        notification.setCompany(company);
        notification.setMessage(notificationDto.getMessage());
        notification.setRead(notificationDto.isRead());
        return notification;
    }
}
