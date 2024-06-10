package com.example.EmoloyerSystem.dto;
import com.example.EmoloyerSystem.Entity.Company;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyDto {
    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;


    private int id;
    private String name;
    private String email;
    private String address;
    private String phone_number;
    private String password;
    private int opening_year;
    private String description;
    private String role;

    private Company company;
    private List<CompanyDto> companyList;

    public void setInternships(List<InternshipDto> collect) {
    }
}
