package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.Entity.Rate;
import com.example.EmoloyerSystem.dto.RateDto;
import java.util.List;

public interface RateService {
    RateDto createRate(RateDto rateDto);

    RateDto getRateById(Integer rateDto);

    List<RateDto>getAllRates(int rateId);

    RateDto updateRate(Integer rateId,RateDto updatedRate);

    void deleteRate(Integer rateId);



}
