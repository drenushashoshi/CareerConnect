package com.example.EmoloyerSystem.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.example.EmoloyerSystem.Entity.Reference;
import com.example.EmoloyerSystem.Entity.WorkExperience;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cv")
public class CV{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cvid",unique = true,updatable = false)
    private int cv_id;

    @Column(name="profilepic", nullable = false)
    private String profilepic;

    @Column(name="name",nullable = false)
    private String name;

    @Column(name="surname",nullable = false)
    private String surname;

    @Column(name="email", unique = true,nullable = false)
    private String email;

    @Column(name="phone_nr",unique = true,nullable = false)
    private String phone_nr;

    @Column(name="street",nullable = false)
    private String street;

    @Column(name="city",nullable = false)
    private String city;

    @Column(name="description",nullable = false,length = 1000)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="experience_id",nullable = true)
    private WorkExperience experience_id;

    @Column(name="college", nullable = true)
    private String college;

    @Column(name="highschool",nullable true)
    private String highschool;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="reference_id",nullable = true)
    private Reference reference_id;
}
