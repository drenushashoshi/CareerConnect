package com.example.EmoloyerSystem.Service;

import java.util.List;


import com.example.EmoloyerSystem.dto.ReferenceDto;

public interface ReferenceService {

    ReferenceDto createReference(ReferenceDto ReferenceDto,int id);
    ReferenceDto updateReference(int Id,ReferenceDto ReferenceDto);
    ReferenceDto getReferenceById(int id);
    List<ReferenceDto> getReferenceByCvId(int id);
    List<ReferenceDto>getAllReferences();
    void deleteReference(int id);
}