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

    
    @PostMapping("/public/createRate")
    public ResponseEntity<RateDto>createRate(@RequestBody RateDto rateDto){
        return  ResponseEntity.ok(rateService.createRate(rateDto));
    }

    
    @GetMapping("/admin/getRate/{id}")
    public ResponseEntity<RateDto>getRateById(@PathVariable("id") Integer rateId){
        RateDto rateDto=rateService.getRateById(rateId);
        return ResponseEntity.ok(rateDto);
    }

    
    @GetMapping("/public/getAllRates")
    public ResponseEntity<List<RateDto>>getAllRates(){
        List<RateDto>rates=null;
            rates=rateService.getAllRates();

        return ResponseEntity.ok(rates);
    }

    //Update Rate REST API
    @PutMapping("/admin/updateRate/{id}")
    public ResponseEntity<RateDto>updateRate(@PathVariable("id")Integer rateId,
                                            @RequestBody RateDto updatedRate){
        RateDto rateDto=rateService.updateRate(rateId,updatedRate);
        return ResponseEntity.ok(rateDto);
    }

    //Delete Rate REST API
    @DeleteMapping("/public/deleteRate/{id}")
    public ResponseEntity<String>deleteRate(@PathVariable("id") Long rateId){
        rateService.deleteRate((long) Math.toIntExact(rateId));
        return ResponseEntity.ok("Rate Deleted");
    }

}
