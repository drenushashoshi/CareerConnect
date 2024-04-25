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
@Table(name = "reference")
public class Reference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reference_id",unique = true,updatable = false)
    private int reference_id;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="surname",nullable = false)
    private String surname;

    @Column(name="jobposition", nullable = false)
    private String jobposition;

    @Column(name="companyname",nullable = false)
    private String companyname;

    @Column(name="phone_nr",unique = true)
    private String phone_nr;

    @Column(name="email", unique = true)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cv_id")
    private int cv_id;
}