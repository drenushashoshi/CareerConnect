package com.example.EmoloyerSystem.dto;
import com.example.EmoloyerSystem.Entity.CV;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class WorkExperienceDto {

    private int experience_id;
    private int startingyear;
    private int lastyear;
    private String companyname;
    private String street;
    private String city;
    private String jobposition;
    private String description;
    private CV cv_id;
}