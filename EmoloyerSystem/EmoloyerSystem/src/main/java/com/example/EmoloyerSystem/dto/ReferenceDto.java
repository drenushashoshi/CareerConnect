package com.example.EmoloyerSystem.dto;
import com.example.EmoloyerSystem.Entity.CV;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReferenceDto {

    private int reference_id;
    private String name;
    private String surname;
    private String jobposition;
    private String companyname;
    private String phone_nr;
    private String email;
    private int CV;
}