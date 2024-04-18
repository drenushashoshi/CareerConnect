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
@Table(name = "cv")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cvid",unique = true,updatable = false)
    private int cvid;

    @Column(name="profilepic", nullable = false)
    private String profilepic;

    @Column(name="name",nullable = false)
    private String name;

    @Column(name="email", unique = true)
    private String Email;

    @Column(name="phone_nr",unique = true)
    private String phone_nr;

    @Column(name="street",nullable = false)
    private int street;

    @Column(name="city",nullable = false)
    private String city;

    @Column(name="description",nullable = false,length = 1000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="experience",nullable = false)
    private WorkExperience experience;

    @Column(name="college", nullable = false)
    private String college;

    @Column(name="highschool",nullable false)
    private String highschool;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="reference_id",nullable = false)
    private Reference reference;
}
