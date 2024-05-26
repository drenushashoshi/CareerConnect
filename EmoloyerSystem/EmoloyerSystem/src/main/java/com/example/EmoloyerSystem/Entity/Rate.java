package com.example.EmoloyerSystem.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Rate")
public class Rate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="vleresimi",nullable = false)
    private String vleresimi;

    @Column(name="komenti",nullable = false)
    private String komenti;

    @Column(name="data_krijimit",nullable = false)
    private String dataKrijimit;

    @ManyToOne
    @JoinColumn(name = "employee")
    private Employee employee;





}
