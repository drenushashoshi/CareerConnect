package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.dto.LocationDto;


import java.util.List;

public interface LocationService {
    LocationDto createLocation(LocationDto locationDto);

    LocationDto getLocationName(String locationName);
    List<LocationDto> getAllLocations();

    LocationDto updateLocation(String locationName, LocationDto updatedLocation);

    void deleteLocation(String locationName);

}
