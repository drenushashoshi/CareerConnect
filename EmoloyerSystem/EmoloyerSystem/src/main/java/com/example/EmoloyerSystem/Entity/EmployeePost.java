/*
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
@Table(name="employee_post")


public class EmployeePost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="title",nullable = false)
    private String title;

    @Column(name="content",nullable = false)
    private String content;

    @Column(name = "post_date",nullable = false)
    private Date postDate;

    @Column(name = "employee")
    private Employee employee;
   // @ElementCollection // Specifies a collection of basic types (in this case, Strings)
    //@CollectionTable(name = "post_attachments", joinColumns = @JoinColumn(name = "post_id"))
    //@Column(name = "attachment")
    //private List<String> attachments; // Add a List to store attachment paths or URLs

}
*/
