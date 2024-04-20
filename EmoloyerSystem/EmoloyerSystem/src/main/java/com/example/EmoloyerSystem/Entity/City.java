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
@Table(name = "City")
public class City {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY) private int id;
    @Column(name="name",nullable = false)
    private String name;
}
