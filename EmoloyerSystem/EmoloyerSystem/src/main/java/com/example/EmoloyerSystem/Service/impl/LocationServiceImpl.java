package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.*;
import com.example.EmoloyerSystem.Mapper.NotificationMapper;
import com.example.EmoloyerSystem.Repository.InternshipRepository;
import com.example.EmoloyerSystem.Repository.JobRepository;
import com.example.EmoloyerSystem.Repository.LocationRepository;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.LocationMapper;
import com.example.EmoloyerSystem.Repository.NotificationRepository;
import com.example.EmoloyerSystem.Service.LocationService;
import com.example.EmoloyerSystem.dto.LocationDto;
import com.example.EmoloyerSystem.dto.NotificationDto;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class LocationServiceImpl implements LocationService {

    private static final Logger logger = LoggerFactory.getLogger(IndustriaServiceImpl.class);

    private final LocationRepository LocationRepository;
    private final JobRepository jobRepository;
    private final InternshipRepository internshipRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public LocationDto createLocation(LocationDto locationDto) {
        Location location = LocationMapper.mapDtoToLocation(locationDto);
        Location savedLocation = LocationRepository.save(location);
        return LocationMapper.mapLocationToDto(savedLocation);
    }

    @Override
    public LocationDto getLocationName(String LocationName) {
        Location Location = LocationRepository.findByName(LocationName)
                .orElseThrow(() -> new ResourceNotFoundException("Location not found with name: " + LocationName));
        return LocationMapper.mapLocationToDto(Location);
    }

    @Override
    public List<LocationDto> getAllLocations() {
        List<Location> locations = LocationRepository.findAll();
        return locations.stream()
                .map(LocationMapper::mapLocationToDto)
                .collect(Collectors.toList());
    }

    @Override
    public LocationDto updateLocation(String LocationName, LocationDto updatedLocation) {
        Location Location = LocationRepository.findByName(LocationName)
                .orElseThrow(() -> new ResourceNotFoundException("Location not found with name: " + LocationName));
        Location.setName(updatedLocation.getName());
        Location updatedLocationEntity = LocationRepository.save(Location);
        return LocationMapper.mapLocationToDto(updatedLocationEntity);
    }

    @Override
    public void deleteLocation(String LocationName) {
        Location Location = LocationRepository.findByName( LocationName)
                .orElseThrow(() -> new ResourceNotFoundException("Location not found with name: " + LocationName));

        List<Job> jobs = jobRepository.findByLocation(Location);
        for (Job job : jobs) {
            Company company = job.getCompany();
            String message = "Puna juaj " + job.getTitle() + " është fshirë, pasi që ne nuk do vazhdojmë bashkëpunimin me qytetin: " + Location.getName();
            NotificationDto notificationDto = new NotificationDto();
            notificationDto.setCompanyId(company.getId());
            notificationDto.setMessage(message);
            Notification notification = NotificationMapper.mapToNotification(notificationDto, company);
            notificationRepository.save(notification);
            jobRepository.delete(job);
            logger.info("Deleted job: {} and notified company: {}", job.getTitle(), company.getName());
        }

        List<Internship> internships = internshipRepository.findByLocation(Location);
        for (Internship internship : internships) {
            Company company = internship.getCompany();
            String message = "Praktika juaj" + internship.getTitle() + " është fshirë, pasi që ne nuk do vazhdojmë bashkëpunimin me qytetin: " + Location.getName();
            NotificationDto notificationDto = new NotificationDto();
            notificationDto.setCompanyId(company.getId());
            notificationDto.setMessage(message);
            Notification notification = NotificationMapper.mapToNotification(notificationDto, company);
            notificationRepository.save(notification);
            internshipRepository.delete(internship);
            logger.info("Deleted internship: {} and notified company: {}", internship.getTitle(), company.getName());
        }

        // Delete associated jobs
        jobRepository.deleteByLocation(Location);

        internshipRepository.deleteByLocation(Location);

        LocationRepository.delete(Location);

        logger.info("Deleted industry: {}", LocationName);
    }
}
