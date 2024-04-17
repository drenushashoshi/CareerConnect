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

    @Column(name="Name")
    private String Name;

    @Column(name="Email")
    private String Email;

    @Column(name="phone_nr")
    private String phone_nr;

    @Column(name="Age")
    private int age;

    @Column(name="City")
    private String City;

    @Column(name="Description")
    private String Description;

    @Column(name="Gender")
    private String Gender;

    @Column(name="file",nullable = true)
    private String file;
}
