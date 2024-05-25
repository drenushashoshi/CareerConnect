package com.example.EmoloyerSystem.Service;

import java.util.List;

import com.example.EmoloyerSystem.Entity.CV;
import com.example.EmoloyerSystem.Entity.Reference;
import com.example.EmoloyerSystem.dto.ReferenceDto;

public interface ReferenceService {

    ReferenceDto createReference(ReferenceDto ReferenceDto,CV CV);
    ReferenceDto updateReference(int Id,ReferenceDto ReferenceDto);
    ReferenceDto getReferenceById(int id);
    List<Reference> getReferenceByCvId(int id);
    List<ReferenceDto>getAllReferences();
    void deleteReference(int id);
}