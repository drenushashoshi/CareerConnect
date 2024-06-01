package com.example.EmoloyerSystem.Entity;

import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "industria")
    private Industria industria;

    @ManyToOne
    @JoinColumn(name = "location")
    private Location location;

    @ManyToOne
    @JoinColumn(name = "company")
    private Company company;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true,mappedBy = "internshipid")
    private List<Application> applicationid;
}
