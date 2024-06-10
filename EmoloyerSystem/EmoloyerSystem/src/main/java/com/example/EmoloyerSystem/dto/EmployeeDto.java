package com.example.EmoloyerSystem.dto;

import com.example.EmoloyerSystem.Entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class EmployeeDto {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;

    private int id;
    private String name;
    private String surname;
    private String age;
    private String address;
    private String email;
    private String password;
    private String phone;
    private String jobPreferences;
    private String skills;

    private String role;

    private Employee employee;
    private List<EmployeeDto> employeeList;
}
