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
    private String Name;
    private String Surname;
    private String Age;
    private String Address;
    private String Email;
    private String password;
    private String Photo;
    private String Phone;
    private String JobPreferences;
    private String Skills;
}
