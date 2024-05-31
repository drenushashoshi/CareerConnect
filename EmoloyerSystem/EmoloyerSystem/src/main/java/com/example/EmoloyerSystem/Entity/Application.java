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
@Table(name = "application")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "applicationid",unique = true,updatable = false)
    private int applicationid;

    @Column(name="name" )
    private String name;

    @Column(name="email")
    private String email;

    @Column(name="phone_nr")
    private String phone_nr;

    @Column(name="age" )
    private int age;

    @Column(name="city" )
    private String city;

    @Column(name="description" ,length = 1000)
    private String description;

    @Column(name="gender" )
    private String gender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "jobid",nullable = true)
    private Job jobid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "internshipid",nullable = true)
    private Internship internshipid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employeeid" )
    private Employee employeeid;
}
