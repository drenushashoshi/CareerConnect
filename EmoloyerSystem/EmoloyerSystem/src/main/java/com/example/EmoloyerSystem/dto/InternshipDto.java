package com.example.EmoloyerSystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class InternshipDto {
    private int id;
    private String title;
    private String description;
    private String start_date;
    private String end_date;
    private String requirements;
    private String LocationName;
    private String IndustriaName;
    private String deadline;
    private int companyId;
}
