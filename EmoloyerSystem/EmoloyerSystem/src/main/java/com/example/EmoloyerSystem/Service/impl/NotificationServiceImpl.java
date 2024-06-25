package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.Notification;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Repository.NotificationRepository;
import com.example.EmoloyerSystem.Service.NotificationService;
import com.example.EmoloyerSystem.dto.NotificationDto;
import com.example.EmoloyerSystem.Mapper.NotificationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NotificationServiceImpl implements NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationServiceImpl.class);

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void markNotificationAsRead(int notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + notificationId));
        notification.setRead(true);
        notificationRepository.save(notification);
        logger.info("Marked notification as read: {}", notificationId);
    }

    @Override
    public void deleteNotification(int notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + notificationId));
        notificationRepository.delete(notification);
        logger.info("Deleted notification: {}", notificationId);
    }

    @Override
    public List<NotificationDto> getNotificationsByCompanyId(int companyId) {
        List<Notification> notifications = notificationRepository.findByCompanyId(companyId);
        List<NotificationDto> notificationDtos = notifications.stream()
                .map(NotificationMapper::mapToNotificationDto)
                .collect(Collectors.toList());
        logger.info("Fetched notifications for company id: {}", companyId);
        return notificationDtos;
    }
}
