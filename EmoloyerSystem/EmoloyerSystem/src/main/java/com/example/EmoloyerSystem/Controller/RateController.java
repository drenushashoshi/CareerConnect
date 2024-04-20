package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.RateService;
import com.example.EmoloyerSystem.dto.RateDto;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/Rate")

public class RateController {
    private RateService rateService;

    //Add Rate REST API
    @PostMapping
    public ResponseEntity<RateDto>createRate(@RequestBody RateDto rateDto){
        RateDto savedRate=rateService.createRate(rateDto);
        return new ResponseEntity<>(savedRate,HttpStatus.CREATED);
    }

    //Read Rate by id REST API
    @GetMapping("{id}")
    public ResponseEntity<RateDto>getRateById(@PathVariable("id") Integer rateId){
        RateDto rateDto=rateService.getRateById(rateId);
        return ResponseEntity.ok(rateDto);
    }

    //Read all Rates REST API
    @GetMapping
    public ResponseEntity<List<RateDto>>getAllRates(){
        List<RateDto>rates=rateService.getAllRates();
        return ResponseEntity.ok(rates);
    }

    //Update Rate REST API
    @PutMapping("{id}")
    public ResponseEntity<RateDto>updateRate(@PathVariable("id")Integer rateId,
                                            @RequestBody RateDto updatedRate){
        RateDto rateDto=rateService.updateRate(rateId,updatedRate);
        return ResponseEntity.ok(rateDto);
    }

    //Delete Rate REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String>deleteRate(@PathVariable("id") Long rateId){
        rateService.deleteRate(rateId);
        return ResponseEntity.ok("Rate Deleted");
    }

}
