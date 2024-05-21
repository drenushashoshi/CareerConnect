package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.dto.IndustriaDto;
import com.example.EmoloyerSystem.Entity.Industria;

public class IndustriaMapper {
    public static IndustriaDto mapToIndustriaDto(Industria Industria){
        return new IndustriaDto(
                Industria.getName()
        );
    }
    public static Industria mapToIndustria(IndustriaDto IndustriaDto){
        Industria industria = new Industria();
        industria.setName(IndustriaDto.getName());
        return industria;
    }
}
