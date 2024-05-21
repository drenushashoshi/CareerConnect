package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.dto.LocationDto;
import com.example.EmoloyerSystem.Entity.Location;

public class LocationMapper {
    public static LocationDto mapLocationToDto(Location location) {
        return new LocationDto(
                location.getName()
        );
    }

    public static Location mapDtoToLocation(LocationDto locationDto) {
        Location location = new Location();
        location.setName(locationDto.getName());
        return location;
    }
}
