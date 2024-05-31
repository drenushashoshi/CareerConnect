package com.example.EmoloyerSystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDto {
    private int applicationid;
    private String name;
    private String email;
    private String phone_nr;
    private int age;
    private String city;
    private String description;
    private String gender;
    private long jobid;
    private int internshipid;
    private int employeeid;
}