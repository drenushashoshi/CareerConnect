package com.example.EmoloyerSystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class EmployeeDto {
    private int id;
    private String name;
    private String surname;
    private String age;
    private String address;
    private String email;
    private String password;
    private String photo;
    private String phone;
    private String jobPreferences;
    private String skills;
}
