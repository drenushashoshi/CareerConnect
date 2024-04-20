package com.example.EmoloyerSystem.Service.impl;

import com.example.EmoloyerSystem.Entity.Rate;
import com.example.EmoloyerSystem.Exception.ResourceNotFoundException;
import com.example.EmoloyerSystem.Mapper.RateMapper;
import com.example.EmoloyerSystem.Repository.RateRepository;
import com.example.EmoloyerSystem.Service.RateService;
import com.example.EmoloyerSystem.dto.RateDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor


public class RateServiceImpl implements RateService{
    private final RateRepository rateRepository;

    @Override
    public RateDto createRate(RateDto rateDto){
        Rate rate =RateMapper.mapToRate(rateDto);
        Rate savedRate=rateRepository.save(rate);
        return RateMapper.mapToRateDto(savedRate);
    }

    @Override
    public RateDto getRateById(Integer rateId) {
        Rate rate=rateRepository.findById(rateId.longValue())
                .orElseThrow(()->
                        new ResourceNotFoundException("Rate is not existing with given id"+rateId));
                return RateMapper.mapToRateDto(rate);
    }

    @Override
    public List<RateDto> getAllRates() {
        List<Rate>rate =rateRepository.findAll();
        return rate.stream().map(RateMapper::mapToRateDto)
                .collect(Collectors.toList());
    }

    @Override
    public RateDto updateRate(Integer rateId, RateDto updatedRate) {

        Rate rate =rateRepository.findById(rateId.longValue())
                .orElseThrow(()-> new ResourceNotFoundException("Rate not found with id:"+rateId));

        rate.setVleresimi(updatedRate.getVleresimi());
        rate.setKomenti(updatedRate.getKomenti());
        rate.setDataKrijimit(updatedRate.getData_krijimit());

        Rate updatedRateObj=rateRepository.save(rate);
        return RateMapper.mapToRateDto(updatedRateObj);
    }

    @Override
    public void deleteRate(Long rateId) {
        Rate rate=rateRepository.findById(rateId).orElseThrow(
                ()->new ResourceNotFoundException("Rate does not exist with given id"+rateId)
        );
        rateRepository.deleteById(rateId);
    }




}
