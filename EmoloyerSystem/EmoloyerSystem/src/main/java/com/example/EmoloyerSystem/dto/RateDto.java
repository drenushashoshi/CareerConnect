package com.example.EmoloyerSystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class RateDto {

    private int id;
    private String vleresimi;
    private String komenti;
    private String data_krijimit;
}
