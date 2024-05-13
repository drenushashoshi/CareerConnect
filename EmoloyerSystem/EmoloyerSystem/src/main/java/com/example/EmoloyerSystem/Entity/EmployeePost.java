package com.example.EmoloyerSystem.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="EmployeePost")


public class EmployeePost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="title",nullable = false)
    private String title;

    @Column(name="content",nullable = false)
    private String content;

    @Column(name = "postDate",nullable = false)
    private Date postDate;

    @ElementCollection // Specifies a collection of basic types (in this case, Strings)
    @CollectionTable(name = "post_attachments", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "attachment")
    private List<String> attachments; // Add a List to store attachment paths or URLs


    public EmployeePost(int id, String title, String content, List<String> attachments) {
    }
}
