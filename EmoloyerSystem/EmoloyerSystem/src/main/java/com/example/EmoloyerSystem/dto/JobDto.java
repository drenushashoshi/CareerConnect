package com.example.EmoloyerSystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobDto {
    private long id;
    private String title;
    private String description;
    private String requirements;
    private String location;
    private String salary;
    private String jobType;
    private String deadline;

}