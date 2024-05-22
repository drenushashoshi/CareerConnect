package com.example.EmoloyerSystem.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Location")
public class Location {
    @Id
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "location")
    private Collection<Job> jobs;

    @OneToMany(mappedBy = "location")
    private Collection<Internship> internship;
}
