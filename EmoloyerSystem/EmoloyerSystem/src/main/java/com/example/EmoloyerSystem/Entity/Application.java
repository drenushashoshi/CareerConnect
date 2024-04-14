package com.example.EmoloyerSystem.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;

import java.util.Set;

import org.hibernate.annotations.NaturalId;

import com.fasterxml.jackson.annotation.JsonInclude;


@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Applications")
@JsonInclude(NON_DEFAULT)
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ApplicationID",unique = true,updatable = false)
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
    @Column(name="City", nullable = false)
    private String City;
    @Column(name="Description", nullable = false)
    private String Description;
    @Column(name="Gender", nullable = false)
    private String Gender;
    private String Document;
}
