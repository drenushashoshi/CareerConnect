package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.LocationService;
import com.example.EmoloyerSystem.dto.LocationDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping
public class LocationController {

    private final LocationService LocationService;

    // Add Location REST API
    @PostMapping("/admin/location")
    public ResponseEntity<LocationDto> createLocation(@RequestBody LocationDto locationDto) {
        LocationDto savedLocation = LocationService.createLocation(locationDto);
        return new ResponseEntity<>(savedLocation, HttpStatus.CREATED);
    }

    // Read Location by name REST API
    @GetMapping("/public/location/{name}")
    public ResponseEntity<LocationDto> getLocationByName(@PathVariable("name") String locationName) {
        LocationDto LocationDto = LocationService.getLocationName(locationName);
        return ResponseEntity.ok(LocationDto);
    }

    // Read All Cities REST API
    @GetMapping("/public/location")
    public ResponseEntity<List<LocationDto>> getAllCities() {
        List<LocationDto> cities = LocationService.getAllLocations();
        return ResponseEntity.ok(cities);
    }

    // Update Location REST API
    @PutMapping("/public/updateLocation/{name}")
    public ResponseEntity<LocationDto> updateLocation(@PathVariable("name") String currentName,
                                                      @RequestBody LocationDto updatedLocationDto) {
        // Check if the provided name matches the current name in the URL
        if (!currentName.equals(updatedLocationDto.getName())) {
            return ResponseEntity.badRequest().body(null); // Return a bad request response if the name in the URL doesn't match the name in the request body
        }

        // Call the service method to update the location
        LocationDto updatedLocation = LocationService.updateLocation(currentName, updatedLocationDto);

        // Return the updated location in the response
        return ResponseEntity.ok(updatedLocation);
    }

    // Delete Location REST API
    @DeleteMapping("/admin/deleteLocation/{name}")
    public ResponseEntity<String> deleteLocation(@PathVariable("name") String LocationName) {
        LocationService.deleteLocation(LocationName);
        return ResponseEntity.ok("Location Deleted");
    }
}
