package com.example.EmoloyerSystem.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name ="Employee")

public class Employee {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(name="Name")
    private String Name;

    @Column(name = "SurName")
    private String Surname;

    @Column(name = "Age")
    private String Age;

    @Column(name = "Address")
    private String Address;

    @Column(name = "Email")
    private String Email;

    @Column(name = "password")
    private String password;

    @Column(name = "Photo")
    private String Photo;

    @Column(name = "Phone")
    private String Phone;

    @Column(name = "JobPreferences")
    private String JobPreferences;

    @Column(name = "Skills")
    private String Skills;

}
