package com.example.EmoloyerSystem.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name="Job")
public class Job {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="title", nullable = false)
    private String title;

    @Column(name="description", nullable = false, length = 1000)
    private String description;

    @Column(name="requirements", nullable = false, length = 500)
    private String requirements;

    @Column(name="salary")
    private String salary;

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
    @JsonBackReference
    private Company company;

    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true,mappedBy = "jobid")
    @JsonIgnore
    private List<Application> applicationid;
}
