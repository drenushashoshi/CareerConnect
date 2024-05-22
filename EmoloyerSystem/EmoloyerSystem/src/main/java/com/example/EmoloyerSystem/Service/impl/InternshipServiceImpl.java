package com.example.EmoloyerSystem.Service.impl;


import com.example.EmoloyerSystem.Entity.Industria;
import com.example.EmoloyerSystem.Entity.Internship;
import com.example.EmoloyerSystem.Entity.Location;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.InternshipMapper;
import com.example.EmoloyerSystem.Repository.IndustriaRepository;
import com.example.EmoloyerSystem.Repository.InternshipRepository;
import com.example.EmoloyerSystem.Repository.LocationRepository;
import com.example.EmoloyerSystem.Service.InternshipService;
import com.example.EmoloyerSystem.dto.InternshipDto;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class InternshipServiceImpl implements InternshipService {
    private InternshipRepository internshipRepository;
    private final LocationRepository locationRepository;
    private final IndustriaRepository IndustriaRepository;

    @Override
    public InternshipDto createInternship(InternshipDto internshipDto) {
        Location location = locationRepository.findByName(internshipDto.getLocationName())
                .orElseThrow(() -> new ResourceNotFoundException("Location not found with id: " + internshipDto.getLocationName()));

        Industria Industria = IndustriaRepository.findByName(internshipDto.getIndustriaName())
                .orElseThrow(() -> new ResourceNotFoundException("Industria not found with id: " + internshipDto.getIndustriaName()));

        Internship internship = InternshipMapper.mapToInternship(internshipDto, location, Industria);
        Internship savedInternship = internshipRepository.save(internship);
        return InternshipMapper.mapToInternshipDto(savedInternship);
    }

    @Override
    public InternshipDto getInternshipById(Integer internshipId) {
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found with id: " + internshipId));
        return InternshipMapper.mapToInternshipDto(internship);
    }

    @Override
    public List<InternshipDto> getAllInternships() {
        List<Internship> internships = internshipRepository.findAll();
        return internships.stream()
                .map(InternshipMapper::mapToInternshipDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<InternshipDto> getAllCompanyInternships(int companyId) {
        List<Internship> companyInternships = internshipRepository.findByCompanyId(companyId);
        return companyInternships.stream()
                .map(InternshipMapper::mapToInternshipDto)
                .collect(Collectors.toList());
    }

    @Override
    public InternshipDto updateInternship(Integer internshipId, InternshipDto updatedInternship) {
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found with id: " + internshipId));

        internship.setTitle(updatedInternship.getTitle());
        internship.setStart_date(updatedInternship.getStart_date());
        internship.setEnd_date(updatedInternship.getEnd_date());
        internship.setCompany_name(updatedInternship.getCompany_name());
        internship.setDescription(updatedInternship.getDescription());
        internship.setRequirements(updatedInternship.getRequirements());
        internship.setDeadline(updatedInternship.getDeadline());

        Location location = locationRepository.findByName(updatedInternship.getLocationName())
                .orElseThrow(() -> new ResourceNotFoundException("Location not found with name: " + updatedInternship.getLocationName()));

        Industria industria = IndustriaRepository.findByName(updatedInternship.getIndustriaName())
                .orElseThrow(() -> new ResourceNotFoundException("Industria not found with name: " + updatedInternship.getIndustriaName()));

        internship.setLocation(location);
        internship.setIndustria(industria);

        Internship updatedInternshipObj = internshipRepository.save(internship);

        return InternshipMapper.mapToInternshipDto(updatedInternshipObj);
    }


    @Override
    public void deleteInternship(Integer internshipId) {
        if (!internshipRepository.existsById(internshipId)){
            throw new ResourceNotFoundException("Internship not found with id: " + internshipId);
        }
        internshipRepository.deleteById(internshipId);
    }

    @Override
    public List<InternshipDto> searchInternships(String query, String locationName, String industriaName) {
        List<Internship> internships;

        if (query != null && !query.isEmpty() && locationName != null && !locationName.isEmpty() && industriaName != null && !industriaName.isEmpty()) {
            internships = internshipRepository.findByTitleContainingIgnoreCaseAndLocationNameAndIndustriaName(query, locationName, industriaName);
        } else if (query != null && !query.isEmpty() && locationName != null && !locationName.isEmpty()) {
            internships = internshipRepository.findByTitleContainingIgnoreCaseAndLocationName(query, locationName);
        } else if (query != null && !query.isEmpty() && industriaName != null && !industriaName.isEmpty()) {
            internships = internshipRepository.findByTitleContainingIgnoreCaseAndIndustriaName(query, industriaName);
        } else if (query != null && !query.isEmpty()) {
            internships = internshipRepository.findByTitleContainingIgnoreCase(query);
        } else if (locationName != null && !locationName.isEmpty() && industriaName != null && !industriaName.isEmpty()) {
            internships = internshipRepository.findByLocationNameAndIndustriaName(locationName, industriaName);
        } else if (locationName != null && !locationName.isEmpty()) {
            internships = internshipRepository.findByLocationName(locationName);
        } else if (industriaName != null && !industriaName.isEmpty()) {
            internships = internshipRepository.findByIndustriaName(industriaName);
        } else {
            internships = internshipRepository.findAll();
        }

        return internships.stream()
                .map(InternshipMapper::mapToInternshipDto)
                .collect(Collectors.toList());
    }

}
