package com.example.EmoloyerSystem.Service.impl;


import com.example.EmoloyerSystem.Entity.Internship;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.InternshipMapper;
import com.example.EmoloyerSystem.Repository.InternshipRepository;
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

    @Override
    public InternshipDto createInternship(InternshipDto internshipDto) {
        Internship internship = InternshipMapper.mapToInternship(internshipDto);
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
    public InternshipDto updateInternship(Integer internshipId, InternshipDto updatedInternship) {
        Internship internship = internshipRepository.findById(internshipId)
                .orElseThrow(() -> new ResourceNotFoundException("Internship not found with id: " + internshipId));

        internship.setTittle(updatedInternship.getTittle());
        internship.setCompany_name(updatedInternship.getCompany_name());
        internship.setDescription(updatedInternship.getDescription());
        internship.setStart_date(updatedInternship.getStart_date());
        internship.setEnd_date(updatedInternship.getEnd_date());
        internship.setRequirements(updatedInternship.getRequirements());
        internship.setLocation(updatedInternship.getLocation());
        internship.setType(updatedInternship.getType());
        internship.setDeadline(updatedInternship.getDeadline());

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
}
