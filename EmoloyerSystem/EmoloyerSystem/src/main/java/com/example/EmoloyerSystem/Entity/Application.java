package com.example.EmoloyerSystem.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

import org.hibernate.annotations.NaturalId;


@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ID;
    @Column(name="Name", nullable = false)
    private String Name;
    @Column(name="Email", nullable = false, unique = true)
    @NaturalId(mutable = true)
    private String Email;
    @Column(name="PhoneNr", nullable = false, unique = true)
    @NaturalId(mutable = true)
    private String PhoneNr;
    @Column(name="Age", nullable = false)
    private int age;
    private String Document;
}
