package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Rate;
import com.example.EmoloyerSystem.dto.RateDto;

public class RateMapper {
    public static RateDto mapToRateDto(Rate rate){
        return new RateDto(
                rate.getId(),
                rate.getVleresimi(),
                rate.getKomenti(),
                rate.getDataKrijimit()
        );
    }
    public static Rate mapToRate(RateDto rateDto){
        return new Rate(
                rateDto.getId(),
                rateDto.getVleresimi(),
                rateDto.getKomenti(),
                rateDto.getData_krijimit()

        );
    }
}
