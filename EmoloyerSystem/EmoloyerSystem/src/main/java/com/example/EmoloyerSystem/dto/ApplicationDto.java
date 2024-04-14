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
    private int ID;
    private String name;
    private String email;
    private String phoneNr;
    private int age;
    private String City;
    private String Description;
    private String Gender;
    private String CV;
}