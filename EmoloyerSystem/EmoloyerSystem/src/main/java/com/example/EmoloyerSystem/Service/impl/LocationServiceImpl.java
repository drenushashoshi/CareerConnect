package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.Location;
import com.example.EmoloyerSystem.Repository.JobRepository;
import com.example.EmoloyerSystem.Repository.LocationRepository;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.LocationMapper;
import com.example.EmoloyerSystem.Service.LocationService;
import com.example.EmoloyerSystem.dto.LocationDto;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
public class LocationServiceImpl implements LocationService {

    private final LocationRepository LocationRepository;
    private final JobRepository jobRepository;

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

        // Delete associated jobs
        jobRepository.deleteByLocation(Location);

        LocationRepository.delete(Location);
    }
}
