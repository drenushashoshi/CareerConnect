package com.example.EmoloyerSystem.Service;

import com.example.EmoloyerSystem.dto.RateDto;
import java.util.List;

public interface RateService {
    RateDto createRate(RateDto rateDto);

    RateDto getRateById(Integer rateDto);

    List<RateDto>getAllRates();

    void deleteRate(Long rateId);



}
