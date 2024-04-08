package com.example.EmoloyerSystem.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
    private int id;
    private String name;
    private String email;
    private String address;
    private String phone_number;
    private String password;
    private int opening_year;
    private String description;
}
