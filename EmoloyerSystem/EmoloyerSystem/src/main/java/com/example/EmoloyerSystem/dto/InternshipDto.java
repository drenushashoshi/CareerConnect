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
    private String tittle;
    private String company_name;
    private String description;
    private String start_date;
    private String end_date;
    private String requirements;
    private String location;
    private String type;
    private String deadline;
    private int companyId;
}
