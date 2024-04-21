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
@Table(name="Internship")
public class Internship {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    @Column(name="tittle", nullable = false)
    private String tittle;

    @Column(name="company_name", nullable = false)
    private String company_name;

    @Column(name="description", nullable = false, length = 1000)
    private String description;
    @Column(name="start_date", nullable = false)
    private String start_date;
    @Column(name="end_date", nullable = false)
    private String end_date;

    @Column(name="requirements", nullable = false, length = 500)
    private String requirements;

    @Column(name="location", nullable = false)
    private String location;

    @Column(name="type", nullable = false)
    private String type;

    @Column(name="deadline", nullable = false)
    private String deadline;
}
