package com.example.EmoloyerSystem.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


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

    @Column(name="name", nullable = false)
    private String name;

    @Column(name = "surname", nullable = false)
    private String surname;

    @Column(name="data_krijimit",nullable = false)
    private String dataKrijimit;

    @ManyToOne
    @JoinColumn(name = "employee")
    private Employee employee;





}
