package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.dto.IndustriaDto;


import java.util.List;

public interface IndustriaService {
    IndustriaDto createIndustria(IndustriaDto IndustriaDto);

    IndustriaDto getIndustriaName(String IndustriaName);
    List<IndustriaDto> getAllIndustries();

    IndustriaDto updateIndustria(String IndustriaName, IndustriaDto updatedIndustria);

    void deleteIndustria(String IndustriaName);
}
