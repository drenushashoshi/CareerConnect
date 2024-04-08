package com.example.EmoloyerSystem.Entity;

import jakarta.persistence.*;
import java.util.Date;


@Entity
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private String requirements;
    private String location;
    private Double salary;
    private String jobType;
    private Date deadline;

    public Job(long id, String title, String description, String requirements, String location, double salary, String jobType, Date deadline) {
    }

    public Job(String title, String description, String requirements, String location, Double salary, String jobType, Date deadline) {
        this.title = title;
        this.description = description;
        this.requirements = requirements;
        this.location = location;
        this.salary = salary;
        this.jobType = jobType;
        this.deadline = deadline;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRequirements() {
        return requirements;
    }

    public void setRequirements(String requirements) {
        this.requirements = requirements;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Double getSalary() {
        return salary;
    }

    public void setSalary(Double salary) {
        this.salary = salary;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }
}
