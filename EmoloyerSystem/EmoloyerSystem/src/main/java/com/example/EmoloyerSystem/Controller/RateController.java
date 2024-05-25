package com.example.EmoloyerSystem.Controller;

import com.example.EmoloyerSystem.Service.RateService;
import com.example.EmoloyerSystem.dto.RateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
public class RateController {
    @Autowired
    private RateService rateService;

    
    @PostMapping("/rate/registerRate")
    public ResponseEntity<RateDto>createRate(@RequestBody RateDto rateDto){
        return  ResponseEntity.ok(rateService.createRate(rateDto));
    }

    
    @GetMapping("rate/getRate/{id}")
    public ResponseEntity<RateDto>getRateById(@PathVariable("id") Integer rateId){
        RateDto rateDto=rateService.getRateById(rateId);
        return ResponseEntity.ok(rateDto);
    }

    
    @GetMapping("/rate/Rate")
    public ResponseEntity<List<RateDto>>getAllRates(@RequestParam(required=false)int rateId){
        List<RateDto>rates=null;
        if(rateId !=0){
            rates=rateService.getAllRates(rateId);
        }
        return ResponseEntity.ok(rates);
    }

    //Update Rate REST API
    @PutMapping("/rate/updateRate/{id}")
    public ResponseEntity<RateDto>updateRate(@PathVariable("id")Integer rateId,
                                            @RequestBody RateDto updatedRate){
        RateDto rateDto=rateService.updateRate(rateId,updatedRate);
        return ResponseEntity.ok(rateDto);
    }

    //Delete Rate REST API
    @DeleteMapping("/rate/deleteRate{id}")
    public ResponseEntity<String>deleteRate(@PathVariable("id") Long rateId){
        rateService.deleteRate(Math.toIntExact(rateId));
        return ResponseEntity.ok("Rate Deleted");
    }

}
