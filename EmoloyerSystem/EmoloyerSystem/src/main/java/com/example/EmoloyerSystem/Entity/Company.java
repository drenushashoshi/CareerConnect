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
@Table(name="Company")
public class Company {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;
    @Column(name="name", nullable = false)
    private String name;
    @Column(name="email", nullable = false)
    private String email;
    @Column(name="address", nullable = false)
    private String address;
    @Column(name="phone_number", nullable = false)
    private long phone_number;
    @Column(name="password", nullable = false)
    private String password;
    @Column(name="opening_year", nullable = false)
    private int opening_year;
    @Column(name="description", nullable = false)
    private String description;

}
