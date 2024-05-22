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

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="company_name", nullable = true)
    private String company_name;

    @Column(name="description", nullable = false, length = 1000)
    private String description;
    @Column(name="start_date", nullable = false)
    private String start_date;
    @Column(name="end_date", nullable = false)
    private String end_date;

    @Column(name="requirements", nullable = false, length = 500)
    private String requirements;

    @Column(name="deadline", nullable = false)
    private String deadline;

    @Column(name="companyId", nullable=false)
    private int companyId;

    @ManyToOne
    @JoinColumn(name = "industria")
    private Industria industria;

    @ManyToOne
    @JoinColumn(name = "location")
    private Location location;
}
