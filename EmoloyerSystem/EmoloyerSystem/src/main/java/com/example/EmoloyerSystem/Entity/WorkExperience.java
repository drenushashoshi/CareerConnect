<<<<<<< Updated upstream
//package com.example.EmoloyerSystem.Entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(name = "work_experience")
//public class WorkExperience {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "experience_id",unique = true,updatable = false)
//    private int experience_id;
//
//    @Column(name="startingyear", nullable = false)
//    private int startingyear;
//
//    @Column(name="lastyear", nullable = false)
//    private int lastyear;
//
//    @Column(name="companyname", nullable = false)
//    private String companyname;
//
//    @Column(name="street",nullable = false)
//    private String street;
//
//    @Column(name="city",nullable = false)
//    private String city;
//
//    @Column(name="jobposition", nullable = false)
//    private String jobposition;
//
//    @Column(name="description",nullable = false)
//    private String description;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "cv_id")
//    private int cv_id;
//}
=======
package com.example.EmoloyerSystem.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "work_experience")
public class WorkExperience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "experience_id",unique = true,updatable = false)
    private int experience_id;

    @Column(name="startingyear", nullable = false)
    private int startingyear;

    @Column(name="lastyear", nullable = false)
    private int lastyear;

    @Column(name="companyname", nullable = false)
    private String companyname;

    @Column(name="street",nullable = false)
    private String street;

    @Column(name="city",nullable = false)
    private String city;

    @Column(name="jobposition", nullable = false)
    private String jobposition;

    @Column(name="description",nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "cv_id")
    private CV cv_id;
}
>>>>>>> Stashed changes
