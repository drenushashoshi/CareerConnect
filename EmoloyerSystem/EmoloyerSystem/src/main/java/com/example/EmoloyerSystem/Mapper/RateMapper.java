package com.example.EmoloyerSystem.Mapper;

import com.example.EmoloyerSystem.Entity.Employee;
import com.example.EmoloyerSystem.Entity.Rate;
import com.example.EmoloyerSystem.dto.RateDto;

public class RateMapper {
    public static RateDto mapToRateDto(Rate rate){
        return new RateDto(
                rate.getId(),
                rate.getVleresimi(),
                rate.getKomenti(),
                rate.getName(),
                rate.getSurname(),
                rate.getDataKrijimit(),
                rate.getEmployee().getId()
        );
    }
    public static Rate mapToRate(RateDto rateDto, Employee employee){
        Rate rate=new Rate();

        rate.setId(rateDto.getId());
        rate.setVleresimi(rateDto.getVleresimi());
        rate.setKomenti(rateDto.getKomenti());
        rate.setName(rateDto.getName());
        rate.setSurname(rateDto.getSurname());
        rate.setDataKrijimit(rateDto.getData_krijimit());
        rate.setEmployee(employee);

        return rate;
    }
}
