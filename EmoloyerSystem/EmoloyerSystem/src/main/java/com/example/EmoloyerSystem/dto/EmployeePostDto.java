package com.example.EmoloyerSystem.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeePostDto {

    private int id;
    private String title;
    private String content;
    private Date postDate;
    private List<String> attachments;

    public EmployeePostDto(int id, String title, String content, List<String> attachments) {
    }
}