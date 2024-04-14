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
@Table(name = "Applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ApplicationID",unique = true,updatable = false)
    private int ID;

    @Column(name="Name", nullable = false)
    private String Name;

    @Column(name="Email", nullable = false, unique = true)
    private String Email;

    @Column(name="PhoneNr", nullable = false, unique = true)
    private String PhoneNr;

    @Column(name="Age", nullable = false)
    private int age;

    @Column(name="City", nullable = false)
    private String City;

    @Column(name="Description", nullable = false)
    private String Description;

    @Column(name="Gender", nullable = false)
    private String Gender;

    @Column(name="CV",nullable = true)
    private String CV;
}
