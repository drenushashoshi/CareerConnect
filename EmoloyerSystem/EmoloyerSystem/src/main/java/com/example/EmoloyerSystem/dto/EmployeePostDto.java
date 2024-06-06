package com.example.EmoloyerSystem.dto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmployeePostDto {
    private int id;
    private int employeeId;
    private String title;
    private String content;
    private byte[] image;
    private Date timestamp;
}
