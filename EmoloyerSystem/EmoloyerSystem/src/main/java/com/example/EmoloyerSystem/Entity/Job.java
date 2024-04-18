package com.example.EmoloyerSystem.Entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

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

    @Column(name="location", nullable = false)
    private String location;

    @Column(name="salary")
    private String salary;

    @Column(name="jobType", nullable = false)
    private String jobType;

    @Column(name="deadline", nullable = false)
    private String deadline;

}
