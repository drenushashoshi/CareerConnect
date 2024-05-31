package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.dto.InternshipDto;


import java.util.List;

public interface InternshipService {
    InternshipDto createInternship(InternshipDto internshipDto);

    InternshipDto getInternshipById(Integer internshipId);

    List<InternshipDto> getAllInternships();


    List<InternshipDto> getAllCompanyInternships(int companyId);

    InternshipDto updateInternship(Integer internshipId, InternshipDto updatedInternship);

    void deleteInternship(Integer internshipId);

    List<InternshipDto> searchInternships(String query, String locationName, String IndustriaName);
}
