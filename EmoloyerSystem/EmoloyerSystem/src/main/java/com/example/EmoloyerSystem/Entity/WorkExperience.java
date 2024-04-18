package com.example.EmoloyerSystem.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "work_experience")
public class WorkExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "experience_id",unique = true,updatable = false)
    private int experience_id;

    @Column(name="startingyear", nullable = false)
    private int startingyear;

    @Column(name="lastyear", nullable = false)
    private int lastyear;

    @Column(name="companyname", nullable = false)
    private String companyname;

    @Column(name="street",nullable = false)
    private String street;

    @Column(name="city",nullable = false)
    private String city;

    @Column(name="jobposition", nullable = false)
    private String jobposition;

    @Column(name="description",nullable = false, length 1000)
    private String description;
}